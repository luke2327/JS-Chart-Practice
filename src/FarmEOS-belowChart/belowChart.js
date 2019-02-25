Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      var ctx = chart.chart.ctx;
      var chartArea = chart.chartArea;

      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  }
});

async function updateData(chart){
  var reqHeader = new Headers();
  reqHeader = {
    'authority': 'www.farmeos.io',
    'scheme': 'https',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ko;q=0.7,th;q=0.6',
    'Content-Encoding': 'gzip, deflate, br',
    'cache-control': 'no-cache'
  };

  var data = (await fetch('https://www.farmeos.io/api/v1/crash/query_report', reqHeader)).json();
  data.then(res => {
    chart.data.datasets[0].data = res.data.series[0].data;
    chart.data.datasets[1].data = res.data.series[1].data;
    chart.data.labels = res.data.xAxis[0].data;
  });

  chart.update();
}

var config = {

  xAxisDataSet: [],
  coinsDataSet: [],
  multipleDataSet: [],

  type: 'bar',
  data: {
    datasets: [{
      label: 'coins',
      data: this.coinsDataSet,
      type: 'bar',
      backgroundColor: "rgba(0,152,239,.75)",
    }, {
      label: 'multiple',
      data: this.multipleDataSet,
      type: 'line',
      backgroundColor: "transparent",
      borderColor: "#7C8792",
      borderWidth: 1,
    }],
  labels: this.xAxisDataSet
  },
  options: {
    scales: {
      yAxes: [{
       ticks:{
          min : 0,
          stepSize : 50,
          fontColor : "#5a697e",
          fontSize : 14
        },
      gridLines:{
          color: "#28394a",
          lineWidth:1,
          // zeroLineColor :"#fff",
          // zeroLineWidth : 1
        },
        stacked: true,
      }],
		xAxes: [{
      maxBarThickness: 10,
        ticks:{
          fontColor : "#5a697e",
          fontSize : 14
        },
        gridLines:{
          color: "#28394a",
          lineWidth:1
        },
        stacked: true,
      }]
    },
    chartArea: {
      backgroundColor: '#1f222d'
    },
    responsive: false,
  }
};


var ctx = document.getElementById('FEbCArea').getContext('2d');
var chartFrame = new Chart(ctx, config);

updateData(chartFrame);
setInterval(() => {
  updateData(chartFrame);
}, 1000);