new Dygraph(
  document.getElementById('dygraphsJsChart0'),
  "Date,Temperature\n" +
  "2008-05-07,75\n" +
  "2008-05-08,70\n" +
  "2008-05-09,80\n"
);

new Dygraph(
  document.getElementById("dygraphsJsChart1"),
  "static/temperatures.csv"
);

new Dygraph(
  document.getElementById("dygraphsJsChart2"),
  "static/temperatures.csv",
  {
    rollPeriod: 7,
    showRoller: true
  }
);

new Dygraph(
  document.getElementById("dygraphsJsChart3"),
  "static/twonormals.csv",
  {
    rollPeriod: 7,
    showRoller: true,
    errorBars: true,
    valueRange: [50,125]
  }
);