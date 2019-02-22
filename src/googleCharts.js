google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart0);
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);

function drawChart0() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Element');
  data.addColumn('number', 'Percentage');
  data.addRows([
    ['Nitrogen', 0.78],
    ['Oxygen', 0.21],
    ['Other', 0.01]
  ]);

  var chart = new google.visualization.PieChart(document.getElementById('googleChartsJsChart0'));
  chart.draw(data, null);
}

function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('googleChartsJsChart1'));

  chart.draw(data, options);
}

function drawChart2() {
var data = google.visualization.arrayToDataTable([
['Mon', 20, 28, 38, 45],
['Tue', 31, 38, 55, 66],
['Wed', 50, 55, 77, 80],
['Thu', 77, 77, 66, 50],
['Fri', 68, 66, 22, 15]
// Treat first row as data as well.
], true);

var options = {
legend:'none'
};

var chart = new google.visualization.CandlestickChart(document.getElementById('googleChartsJsChart2'));

chart.draw(data, options);
}

function drawChart3() {
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
    ['2004/05',  165,      938,         522,             998,           450,      614.6],
    ['2005/06',  135,      1120,        599,             1268,          288,      682],
    ['2006/07',  157,      1167,        587,             807,           397,      623],
    ['2007/08',  139,      1110,        615,             968,           215,      609.4],
    ['2008/09',  136,      691,         629,             1026,          366,      569.6]
  ]);

  var options = {
    title : 'Monthly Coffee Production by Country',
    vAxis: {title: 'Cups'},
    hAxis: {title: 'Month'},
    seriesType: 'bars',
    series: {5: {type: 'line'}}
  };

  var chart = new google.visualization.ComboChart(document.getElementById('googleChartsJsChart3'));
  chart.draw(data, options);
}