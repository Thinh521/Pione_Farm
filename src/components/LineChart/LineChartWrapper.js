import React from 'react';
import {View, Animated} from 'react-native';

const LineChartWrapper = ({
  data,
  mode = 'basic',
  height = 200,
  width,
  lineColor = '#4CAF50',
  gradientColor = '#4CAF50',
  strokeWidth = 2,
  showGradient = true,
}) => {
  if (!data || data.length === 0) return <View style={{height}} />;

  if (mode === 'basic') {
    const chartData = data.map(value => ({value}));
    const {LineChart} = require('react-native-gifted-charts');
    return (
      <LineChart
        data={chartData}
        color={lineColor}
        thickness={strokeWidth}
        hideDataPoints={false}
        xAxisLabelTextStyle={{color: '#aaa'}}
        height={height}
      />
    );
  }

  if (mode === 'advanced') {
    const {LineChart, Grid} = require('react-native-svg-charts');
    return (
      <LineChart
        style={{height}}
        data={data}
        svg={{stroke: lineColor, strokeWidth}}
        contentInset={{top: 20, bottom: 20}}>
        <Grid />
      </LineChart>
    );
  }

  if (mode === 'animated') {
    const {Svg, Path, Defs, LinearGradient, Stop} = require('react-native-svg');
    const d3 = require('d3-shape');
    const {scaleLinear} = require('d3-scale');

    const padding = 4;
    const chartWidth = width || data.length * 10;

    // X/Y Scales
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([padding, chartWidth - padding]);

    const yScale = scaleLinear()
      .domain([Math.min(...data), Math.max(...data)])
      .range([height - padding, padding]);

    // Generators
    const line = d3
      .line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const area = d3
      .area()
      .x((_, i) => xScale(i))
      .y0(height - padding)
      .y1(d => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const linePath = line(data) || '';
    const areaPath = area(data) || '';

    return (
      <Svg height={height} width={chartWidth}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={gradientColor} stopOpacity="0.4" />
            <Stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>

        {showGradient && <Path d={areaPath} fill="url(#gradient)" />}
        <Path
          d={linePath}
          stroke={lineColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    );
  }

  return <View style={{height}} />;
};

const AnimatedPath = Animated.createAnimatedComponent(
  require('react-native-svg').Path,
);

export default LineChartWrapper;
