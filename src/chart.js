var ctx = document.getElementById("chartJsChart0");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    scales: {
      yAxis: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


var randomScalingFactor = function() {
  return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
};

var config1 = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      fill: false,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ],
    }, {
      label: 'My Second dataset',
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      fill: false,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ],
    }]
  },
  options: {
    responsive: false,
    title: {
      display: true,
      text: 'Chart.js Line Chart - Logarithmic'
    },
    scales: {
      xAxes: [{
        display: true,
      }],
      yAxes: [{
        display: true,
        type: 'logarithmic',
      }]
    }
  }
};

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var chartColors = window.chartColors;
var color = Chart.helpers.color;
var config = {
  data: {
    datasets: [{
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
      backgroundColor: [
        color(chartColors.red).alpha(0.5).rgbString(),
        color(chartColors.orange).alpha(0.5).rgbString(),
        color(chartColors.yellow).alpha(0.5).rgbString(),
        color(chartColors.green).alpha(0.5).rgbString(),
        color(chartColors.blue).alpha(0.5).rgbString(),
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue'
    ]
  },
  options: {
    responsive: false,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Polar Area Chart'
    },
    scale: {
      ticks: {
        beginAtZero: true
      },
      reverse: false
    },
    animation: {
      animateRotate: false,
      animateScale: true
    }
  }
};

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var color = Chart.helpers.color;
var horizontalBarChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Dataset 1',
    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
    borderColor: window.chartColors.red,
    borderWidth: 1,
    data: [
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor()
    ]
  }, {
    label: 'Dataset 2',
    backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
    borderColor: window.chartColors.blue,
    data: [
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor()
    ]
  }]

};

window.onload = function() {
  var ctx1 = document.getElementById('chartJsChart1').getContext('2d');
  var ctx2 = document.getElementById('chartJsChart2').getContext('2d');
  var ctx3 = document.getElementById('chartJsChart3').getContext('2d');
  window.myLine = new Chart(ctx1, config1);
  window.myPolarArea = Chart.PolarArea(ctx2, config);
  window.myHorizontalBar = new Chart(ctx3, {
    type: 'horizontalBar',
    data: horizontalBarChartData,
    options: {
      responsive: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    }
  });
};
