var data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],

  series: [
    [5, 2, 4, 2, 0]
  ]
};

new Chartist.Line('#chartistJsChart0', data);

new Chartist.Line('#chartistJsChart1', {
  labels: [1, 2, 3, 4],
  series: [[100, 120, 180, 200]]
});

new Chartist.Bar('#chartistJsChart2', {
  labels: [1, 2, 3, 4],
  series: [[5, 2, 8, 3]]
});

new Chartist.Line('#chartistJsChart3', {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8'],

  series:[{
    name: 'series-1',
    data: [5, 2, -4, 2, 0, -2, 5, -3]
  }, {
    name: 'series-2',
    data: [4, 3, 5, 3, 1, 3, 6, 4]
  }, {
    name: 'series-3',
    data: [2, 4, 3, 1, 4, 5, 3, 2]
  }]
}, {
  fullWidth: true,

  series: {
    'series-1': {
      lineSmooth: Chartist.Interpolation.step()
    },
    'series-2:': {
      lineSmooth: Chartist.Interpolation.simple(),
      showArea: true
    },
    'series-3': {
      showPoint: false
    }
  }
}, [
  ['screen and (max-width: 320px)', {
    series: {
      'series-1': {
        lineSmooth: Chartist.Interpolation.none()
      },
      'series-2': {
        lineSmooth: Chartist.Interpolation.none(),
        showArea: false
      },
      'series-3': {
        lineSmooth: Chartist.Interpolation.none(),
        showPoint: true
      }
    }
  }]
]);