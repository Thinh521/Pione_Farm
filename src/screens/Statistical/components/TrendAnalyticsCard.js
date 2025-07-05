import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {Rect, Circle, Text as SvgText} from 'react-native-svg';
import {Shadows} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const TrendAnalyticsCard = () => {
  const orangeData = [
    5, 12, 8, 18, 25, 40, 38, 45, 52, 67, 62, 58, 55, 60, 45, 42,
  ];
  const blueData = [
    2, 8, 12, 15, 22, 28, 35, 50, 42, 38, 35, 32, 30, 35, 28, 58,
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  // Component để tạo vùng highlight xanh nhạt
  const HighlightArea = ({x, y, width, height}) => (
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
    const pointValue = orangeData[pointIndex];

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
          $59,492.10
        </SvgText>
        <SvgText
          x={x(pointIndex)}
          y={y(pointValue) - 30}
          fontSize="10"
          fill="#9ca3af"
          textAnchor="middle">
          15 Aug 2022
        </SvgText>
      </>
    );
  };

  const contentInset = {top: 40, bottom: 20, left: 20, right: 20};

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mango</Text>

      <View style={styles.chartContainer}>
        <YAxis
          data={orangeData}
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
          <LineChart
            style={StyleSheet.absoluteFill}
            data={orangeData}
            svg={{
              stroke: '#f59e0b',
              strokeWidth: 2.5,
            }}
            contentInset={contentInset}
            curve={shape.curveCardinal.tension(0.3)}>
            <HighlightArea />
            <DataPoint />
          </LineChart>

          <LineChart
            style={StyleSheet.absoluteFill}
            data={blueData}
            svg={{
              stroke: '#3b82f6',
              strokeWidth: 2.5,
            }}
            contentInset={contentInset}
            curve={shape.curveCardinal.tension(0.3)}
          />
        </View>
      </View>

      <XAxis
        style={styles.xAxis}
        data={months}
        formatLabel={(value, index) => months[index]}
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    ...Shadows.medium,
    marginBottom: scale(20),
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  chartContainer: {
    height: 250,
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
  },
  chartWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  xAxis: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 30,
  },
});

export default TrendAnalyticsCard;
