export const Option = {
  dayLabel: {
    nameMap: 'cn'
  },
  tooltip: {},
  visualMap: {
    min: 0,
    max: 1,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    show: false
  },
  calendar: {
    top: 20,
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