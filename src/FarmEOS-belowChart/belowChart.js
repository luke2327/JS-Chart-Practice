"use-strict";
var chartFrame = {
  ctx: document.getElementById('FEbCArea').getContext('2d'),
  n_xAxisDataSet: [],
  n_coinsDataSet: [],
  n_multipleDataSet: [],

async fetchApi(url) {
  var reqHeader = new Headers();
  reqHeader = {
    'authority': 'www.farmeos.io',
    'scheme': 'https',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ko;q=0.7,th;q=0.6',
    'Content-Encoding': 'gzip, deflate, br',
    'cache-control': 'no-cache'
  };
  let data = await (await fetch(url, reqHeader)).json();
  return data;
},

// // var FARM_EOS = 1;

async report() {
  var res = await this.fetchApi('https://www.farmeos.io/api/v1/crash/query_report');
  console.log('res', res.data);
  res.data.series[0].data.forEach((yAxisData) => {
    this.n_coinsDataSet.push(yAxisData);
  });
  res.data.xAxis[0].data.forEach((xAxisData) => {
    this.n_xAxisDataSet.push(xAxisData);
  });
  res.data.series[1].data.forEach((multipleData) => {
    this.n_multipleDataSet.push(multipleData);
  });

  this.draw();
},

async draw() {
  var FARM_EOS = await new Chart(this.ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Bar',
        data: this.n_coinsDataSet
      }, {
        label: 'set',
        data: this.n_multipleDataSet,
        type: 'line'
      }],
    labels: this.n_xAxisDataSet
    },
  });

  // setInterval(this.draw().FARM_EOS.clear(), 1000);
},


gaming: async () => {
  const res = await fetchApi('https://www.farmeos.io/api/v1/crash/query_gaming');
  console.log('res', res);
}

};

chartFrame.report();
// var ctx = document.getElementById('FEbCArea').getContext('2d');
// var n_xAxisDataSet = [];
// var n_coinsDataSet = [];
// var n_multipleDataSet = [];

// const fetchApi = async (url) => {
//   var reqHeader = new Headers();
//   reqHeader = {
//     'authority': 'www.farmeos.io',
//     'scheme': 'https',
//     'accept': 'application/json, text/plain, */*',
//     'accept-language': 'en-US,en;q=0.9,vi;q=0.8,ko;q=0.7,th;q=0.6',
//     'Content-Encoding': 'gzip, deflate, br',
//     'cache-control': 'no-cache'
//   };
//   let data = await (await fetch(url, reqHeader)).json();
//   return data;
// };

// var FARM_EOS = 1;

// var report = async () => {
//   var res = await fetchApi('https://www.farmeos.io/api/v1/crash/query_report');
//   console.log('res', res.data);
//   res.data.series[0].data.forEach((yAxisData) => {
//     n_coinsDataSet.push(yAxisData);
//   });
//   res.data.xAxis[0].data.forEach((xAxisData) => {
//     n_xAxisDataSet.push(xAxisData);
//   });
//   res.data.series[1].data.forEach((multipleData) => {
//     n_multipleDataSet.push(multipleData);
//   });

//   this.FARM_EOS = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       datasets: [{
//         label: 'Bar',
//         data: n_coinsDataSet
//       }, {
//         label: 'set',
//         data: n_multipleDataSet,
//         type: 'line'
//       }],
//     labels: n_xAxisDataSet
//     },
//   });
// };

// console.log(FARM_EOS);

// const gaming = async () => {
//   const res = await fetchApi('https://www.farmeos.io/api/v1/crash/query_gaming');
//   console.log('res', res);
// };

// report();