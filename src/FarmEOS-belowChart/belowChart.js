Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      for (var i = 0; i < chart.config.data.datasets[multipleIndex].data.length; i++){
        if(chart.config.data.datasets[multipleIndex].data[i] > multipleAxisEnd){
          tempVal.push(chart.config.data.datasets[multipleIndex].data[i]);
          tempIndex.push(i);
          chart.config.data.datasets[multipleIndex].data[i] = multipleAxisEnd;
          chart.update();
        }
      }
    }
    
  }
});
// beforeDraw 플러그인을 이용하여 10이 넘는 데이터를 핸들링 한다

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

var tempVal = [],
    tempIndex = [];
const multipleAxisEnd = 10.00,
      multipleIndex = 1;

var nxAxisDataSet = [
  "13:39",
  "13:40",
  "13:40",
  "13:41",
  "13:41",
  "13:41",
  "13:42",
  "13:42",
  "13:42",
  "13:43",
  "13:43",
  "13:43",
  "13:44",
  "13:44",
  "13:44",
  "13:45",
  "13:45",
  "13:46",
  "13:46",
  "13:47",
  "13:48",
  "13:48",
  "13:48",
  "13:49",
  "13:49",
  "13:50"
],
  ncoinsDataSet = [
    60.00,
    81.30,
    98.70,
    82.20,
    64.50,
    103.30,
    47.63,
    33.80,
    45.60,
    33.40,
    22.90,
    88.90,
    33.20,
    20.20,
    55.80,
    17.00,
    97.10,
    123.20,
    117.60,
    132.10,
    60.60,
    100.50,
    103.80,
    53.80,
    105.90,
    49.10
  ],
  nmultipleDataSet = [
    2.89,
    1.22,
    1.17,
    4.59,
    49.78,
    4.06,
    8.22,
    2.33,
    1.31,
    1,
    1.86,
    1.25,
    1.84,
    5.66,
    1.11,
    1.09,
    2.9,
    3.43,
    1.3,
    2.74,
    40.58,
    2.07,
    8.37,
    3,
    4.23,
    42.14
  ];

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
      data: ncoinsDataSet,
      type: 'bar',
      backgroundColor: "rgba(0,152,239,.75)",
      yAxisID: 'y-axis-1'
    }, {
      label: 'multiple',
      data: nmultipleDataSet,
      type: 'line',
      backgroundColor: "transparent",
      borderColor: "#7C8792",
      borderWidth: 2,
      yAxisID: 'y-axis-2'
    }],
  labels: nxAxisDataSet
  },

  options: {
    // 마우스 hover했을 때 coins값과 multiple값을 동시에 보여주기 위해 작성
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function(tooltipItem, data){
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          if(tooltipItem.datasetIndex == 1 && tooltipItem.yLabel == 10){
            console.log(chartFrame.data.datasets[1].data[tooltipItem.index]);
            for(var i = 0; i < tempIndex.length; i++){
              if(tooltipItem.index == tempIndex[i]){
                label += ': ' + tempVal[i];
              }
            }
            console.log('tempIndex : ' + tempIndex);
            console.log('tempVal : ' + tempVal);
          } else {
            label += ': ' + tooltipItem.yLabel;
          }
          console.log(tooltipItem);
          return label;
        }
      }
    },
    scales: {
      yAxes: [{
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
          stepSize: 2,
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
      }],
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
// chartFrame.update();

// API call 하는 함수를 호출해 기본 값을 채워 넣음
// updateData(chartFrame);
// 1초에 한번씩 반복해 정보가 업데이트 될 때 마다 차트를 갱신해줌
// setInterval(() => {
//   updateData(chartFrame);
// }, 1000);