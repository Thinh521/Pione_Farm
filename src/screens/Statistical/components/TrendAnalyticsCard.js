import React from 'react';
import * as shape from 'd3-shape';
import {Rect, Circle, Text as SvgText} from 'react-native-svg';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import ErrorView from '~/components/ErrorView/ErrorView';

const TrendAnalyticsCard = ({
  selectedOrderType,
  data,
  isLoading,
  isError,
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

  const maxValue = Math.max(...onlineData, ...offlineData, 1);

  const scaledOnlineData = onlineData.map(v => (v / maxValue) * 100);
  const scaledOfflineData = offlineData.map(v => (v / maxValue) * 100);

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
    const scaledValue = scaledOnlineData[pointIndex];
    const actualValue = onlineData[pointIndex];
    if (!scaledValue || !actualValue) return null;

    return (
      <>
        <Circle
          cx={x(pointIndex)}
          cy={y(scaledValue)}
          r={4}
          fill="#f59e0b"
          stroke="#fff"
          strokeWidth={2}
        />
        <SvgText
          x={x(pointIndex)}
          y={y(scaledValue) - 15}
          fontSize="12"
          fill="#374151"
          textAnchor="middle"
          fontWeight="600">
          {actualValue?.toLocaleString('vi-VN')} VND
        </SvgText>
        <SvgText
          x={x(pointIndex)}
          y={y(scaledValue) - 30}
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
      <View style={{height: scale(348), marginBottom: scale(30)}}>
        <ErrorView />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Thống kê giá {selectedProductType?.name}</Text>

      <View style={styles.chartContainer}>
        <YAxis
          data={[0, 2, 4, 6, 8, 10]}
          style={styles.yAxis}
          contentInset={contentInset}
          numberOfTicks={6}
          svg={{fill: '#9ca3af', fontSize: 12}}
          formatLabel={value => value.toString()}
        />

        <View style={styles.chartWrapper}>
          {(selectedOrderType === 'online' || selectedOrderType === null) && (
            <LineChart
              style={StyleSheet.absoluteFill}
              data={scaledOnlineData}
              svg={{
                stroke: '#f59e0b',
                strokeWidth: 2.5,
              }}
              contentInset={contentInset}
              curve={shape.curveCardinal.tension(0.3)}>
              <HighlightArea />
              <DataPoint />
            </LineChart>
          )}

          {(selectedOrderType === 'offline' || selectedOrderType === null) && (
            <LineChart
              style={StyleSheet.absoluteFill}
              data={scaledOfflineData}
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
    width: scale(24),
  },
  chartWrapper: {
    flex: 1,
  },
  xAxis: {
    marginTop: scale(10),
  },
});

export default TrendAnalyticsCard;
