export const Option = {
  tooltip: {},
  visualMap: {
    min: 0,
    max: 1000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    bottom: 50,
  },
  calendar: {
    top: 90,
    left: 30,
    right: 30,
    cellSize: ['auto', 13],
    range: 2023,
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: []
  }
}