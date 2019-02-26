// Chart.pluginService.register({
//   beforeDraw: function (chart) {
//     if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
//       var ctx = chart.chart.ctx;
//       var chartArea = chart.chartArea;

//       ctx.save();
//       ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
//       ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
//       ctx.restore();
//     }
//   }
// });
// 위는 플러그인인데 필요없어서 쓰지 않음
// 원래 차트 배경색 지정하려고 사용했던 것 인데 <div>태그 안에 <canvas>태그를 만들고 <div>에 배경색을 입히니 간단하게 해결 가능

/**
 * 
 * @param {string} chart 
 * @description fetch로 API Call을 해서 FARM EOS의 정보를 받아옴
 */
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
    // 데이터가 바뀌었을 때만 업데이트 하기위해 조건문 사용
    if (chart.data.datasets[0].data[0] != res.data.series[0].data[0] && 
        chart.data.datasets[1].data[0] != res.data.series[1].data[0]){
      chart.data.datasets[0].data = res.data.series[0].data;
      chart.data.datasets[1].data = res.data.series[1].data;
      chart.data.labels = res.data.xAxis[0].data;
      
      // multiple의 데이터를 한번씩 순찰하면서 10이 넘으면 10.00으로 만듦
      for(var i = 0; i <= 25; i++ ){
        if(chart.data.datasets[1].data[i] >= 10)
          chart.data.datasets[1].data[i] = 10.00;
      }

      chart.update();
    }
  });
}

/**
 * @description 차트 기본 설정
 */
var config = {
  /**
   * @description x축 데이터
   */
  xAxisDataSet: [],
  /**
   * @description y축 coins 데이터
   */
  coinsDataSet: [],
  /**
   * @description y축 multiple 데이터
   */
  multipleDataSet: [],
  
  // 차트 타입
  type: 'bar',
  data: {
    datasets: [{
      label: 'coins',
      data: this.coinsDataSet,
      type: 'bar',
      backgroundColor: "rgba(0,152,239,.75)",
      yAxisID: 'y-axis-1'
    }, {
      label: 'multiple',
      data: this.multipleDataSet,
      type: 'line',
      backgroundColor: "transparent",
      borderColor: "#7C8792",
      borderWidth: 2,
      yAxisID: 'y-axis-2'
    }],
  labels: this.xAxisDataSet
  },

  options: {
    // 마우스 hover했을 때 coins값과 multiple값을 동시에 보여주기 위해 작성
    tooltips: {
      mode: 'label'
    },
    scales: {
      yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          min: 0,
          // 눈금 간격
          stepSize: 30,
          fontColor: "#5a697a",
          fontSize: 14
        },
        labels: {
          show: true
        }
      }, {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        ticks: {
          // 눈금 최대값 지정
          max: 10,
          // 눈금 뒤에 'x'를 붙이기 위해 작성
          callback: function(label) {
            return label+'x';
          }
        },
        labels: {
          show: true
        },
        // multiple에 대한 grid line 그림
        gridLines: {
          drawOnChartArea: true,
          color: '#28394a'
        }
      }
    ],
		xAxes: [{
      maxBarThickness: 10,
        ticks:{
          fontColor : "#5a697e",
          fontSize : 14,
          maxTicksLimit: 12,
          maxRotation: 0
        },
        // x축에 대한 grid line은 그리지 않음 따라서 가로줄 만 있음
        gridLines:{
          display: false
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

// canvas DOM
var ctx = document.getElementById('FEbCArea').getContext('2d');
// Chart Object 생성
var chartFrame = new Chart(ctx, config);

// API call 하는 함수를 호출해 기본 값을 채워 넣음
updateData(chartFrame);
// 1초에 한번씩 반복해 정보가 업데이트 될 때 마다 차트를 갱신해줌
setInterval(() => {
  updateData(chartFrame);
}, 1000);