import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {Rect, Circle, Text as SvgText} from 'react-native-svg';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const TrendAnalyticsCard = ({
  selectedOrderType,
  data,
  isLoading,
  isError,
  error,
  selectedProductType,
}) => {
  const onlineData = data?.onlineOrders || [];
  const offlineData = data?.offlineOrders || [];
  const rawLabels = data?.labels || [];

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const seenMonths = new Set();
  const months = rawLabels.map(dateStr => {
    const date = new Date(dateStr);
    const monthName = monthNames[date.getMonth()];
    if (seenMonths.has(monthName)) {
      return '';
    } else {
      seenMonths.add(monthName);
      return monthName;
    }
  });

  const contentInset = {top: 40, bottom: 20, left: 20, right: 20};

  const HighlightArea = ({x, height}) => (
    <Rect
      x={x(6)}
      y={0}
      width={x(10) - x(6)}
      height={height}
      fill={'rgba(59, 130, 246, 0.1)'}
    />
  );

  const DataPoint = ({x, y}) => {
    const pointIndex = 9;
    const pointValue = onlineData[pointIndex];

    if (!pointValue) return null;

    return (
      <>
        <Circle
          cx={x(pointIndex)}
          cy={y(pointValue)}
          r={4}
          fill="#f59e0b"
          stroke="#fff"
          strokeWidth={2}
        />
        <SvgText
          x={x(pointIndex)}
          y={y(pointValue) - 15}
          fontSize="12"
          fill="#374151"
          textAnchor="middle"
          fontWeight="600">
          {pointValue?.toLocaleString('vi-VN')} VND
        </SvgText>
        <SvgText
          x={x(pointIndex)}
          y={y(pointValue) - 30}
          fontSize="10"
          fill="#9ca3af"
          textAnchor="middle">
          {rawLabels[pointIndex] || ''}
        </SvgText>
      </>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.cardSkelenton}>
        <ActivityIndicator size="large" color={Colors.greenText} />
        <Text style={{marginTop: scale(10)}}>Đang tải biểu đồ...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.cardSkelenton}>
        <Text style={{color: 'red'}}>Lỗi tải dữ liệu</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Thống kê giá {selectedProductType?.name}</Text>

      <View style={styles.chartContainer}>
        <YAxis
          data={[0, 20, 40, 60, 80, 100]}
          style={styles.yAxis}
          contentInset={contentInset}
          svg={{
            fill: '#9ca3af',
            fontSize: 12,
          }}
          numberOfTicks={6}
          formatLabel={value => value.toString()}
        />

        <View style={styles.chartWrapper}>
          {(selectedOrderType === 'online' || selectedOrderType === null) && (
            <LineChart
              style={StyleSheet.absoluteFill}
              data={onlineData}
              svg={{
                stroke: '#f59e0b',
                strokeWidth: 2.5,
              }}
              contentInset={contentInset}
              curve={shape.curveCardinal.tension(0.3)}>
              {selectedOrderType !== 'offline' && <HighlightArea />}
              {selectedOrderType !== 'offline' && <DataPoint />}
            </LineChart>
          )}

          {(selectedOrderType === 'offline' || selectedOrderType === null) && (
            <LineChart
              style={StyleSheet.absoluteFill}
              data={offlineData}
              svg={{
                stroke: '#3b82f6',
                strokeWidth: 2.5,
              }}
              contentInset={contentInset}
              curve={shape.curveCardinal.tension(0.3)}
            />
          )}
        </View>
      </View>

      <XAxis
        style={styles.xAxis}
        data={months.map((_, index) => index)}
        formatLabel={(value, index) => months[index] || ''}
        contentInset={{left: 40, right: 20}}
        svg={{
          fontSize: 12,
          fill: '#9ca3af',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardSkelenton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(348),
    borderRadius: scale(10),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border_3,
    marginBottom: scale(30),
  },
  card: {
    borderRadius: scale(10),
    backgroundColor: Colors.white,
    padding: scale(16),
    marginBottom: scale(30),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(20),
  },
  chartContainer: {
    height: scale(250),
    flexDirection: 'row',
  },
  yAxis: {
    width: scale(20),
  },
  chartWrapper: {
    flex: 1,
  },
  xAxis: {
    marginTop: scale(10),
  },
});

export default TrendAnalyticsCard;
