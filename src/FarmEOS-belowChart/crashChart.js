"use strict";

var chartFrame = {
  BASE: 7e-5,

  /**
   * @description 상승하고 있는 현재 점수
   */
  point: 0,

  /**
   * @description x축 넓이(?), 크기(?)
   */
  xScale: 1,

  /**
   * @description x축 길이 최솟값
   */
  xAxisMin: 1e4,

  /**
   * @description y축 넓이(?), 크기(?)
   */
  yScale: 100,

  /**
   * @description y축 길이 최솟값
   */
  yAxisMin: 200,

  /**
   * @description y축 시작 지점
   */
  yAxisBase: 100,

  /**
   * @description 상승 곡선이 향하는 지점의 좌표
   */
  line_axis_point: [],

  /**
   * @description canvas dom
   */
  canvas: document.getElementById('crashChart'),

  /**
   * @description canvas Context
   */
  ctx: document.getElementById('crashChart').getContext("2d"),

  /**
   * @description 차트 기본 스타일
   */
  axisStyle: {
    lineWidth: 1,
    font: "10px Verdana",
    font2: "10px Verdana",
    textAlign: "center",
    strokeStyle: "#C8C8C8",
    fillStyle: "#627389"
  },

  /**
   * @description 상승 곡선 상승 폭
   */
  STEP: 15,

  /**
   * @description 상승 속도 | 1000 = 1s
   * @default 10
   */
  STEP_TIME: 10,

  /**
   * @description 나올 수 있는 최소 배수
   * @default 1
   */
  beginingPoint: 1,

  /**
   * @description 나올 수 있는 최대 배수
   */
  maxPoint: 10,

  /**
   * @description stop선 색
   */
  stopLineColor: '#ff0000',

  /**
   * @description start선 색
   */
  startLineColor: '#000000',

  /**
   * @description 상승 곡선 두께
   */
  lineWidth: 8,

  // initialize
  status: '', // running & stop
  rendering: '', // 초기에 rendering 값을 !1로 설정하여 false 값을 준 후에 start()의 rendering 함수 실행


  /**
   * @description 초기화
   * @param {number} initDuration / 지속 시간
   */
  init: function init(initDuration) {
    void 0 === initDuration && (initDuration = 0), this.duration = initDuration, this.start(this.duration);
  },


  /**
   * @description 실제 차트의 크기를 계산함
   */
  calcScale: function calcScale() {
    this.xScale = this.canvas.width / Math.max(this.duration, this.xAxisMin);
    this.yScale = this.canvas.height / (Math.max(this.yAxisMin, 100 * this.point) - this.yAxisBase);
  },


  /**
   * @description 거리에 대한 지점
   * @param {number} duration 
   */
  getPointByDuration: function getPointByDuration(duration) {
    return Math.pow(Math.E, duration * this.BASE);
  },


  /**
   * @description 지점에 대한 거리
   * @param {number} point 
   */
  getDurationByPoint: function getDurationByPoint(point) {
    return Math.floor(Math.log(point) / Math.log(Math.E) / this.BASE);
  },


  /**
   * @description 차트를 그리기 전에 기본 값 설정 및 계산
   * 상승 곡선의 좌표를 drawLine() 에서 이용할 수 있도록 기록
   */
  calcAxis: function calcAxis() {
    var
    // 상승 곡선이 닿는 x축 끝부분의 x좌표
    xEdge,
    // 상승 곡선이 닿는 y축 끝부분의 y좌표
    yEdge;

    // 상승 곡선
    this.line_axis_point = [];
    for (var a = 0; a < this.duration; a += this.STEP_TIME) {
      xEdge = this.xScale * a;
      yEdge = this.yScale * (100 * this.getPointByDuration(a) - this.yAxisBase);
      // drawLine()에 상승 곡선을 그려주기 위해 xEdge, yEdge를 line_axis_point[]에 저장한다.
      this.line_axis_point.push([xEdge, this.canvas.height - yEdge]);
    }
  },


  /**
   * @description 상승 곡선의 동작 구현 및 스타일 적용
   * @param {string} lineColor 상승 곡선의 색
   */
  drawLine: function drawLine(lineColor) {
    var t = this;
    // linecolor 값이 없으면 기본 값 지정
    lineColor || (lineColor = this.startLineColor), Object.assign(this.ctx, this.axisStyle, {
      strokeStyle: lineColor,
      lineWidth: this.lineWidth
    }), this.ctx.beginPath(), this.ctx.moveTo(0, this.canvas.height), this.line_axis_point.forEach(function (i) {
      t.ctx.lineTo(i[0], i[1]);
    }), this.ctx.fillText(this.maxPoint, 400, 40), this.ctx.stroke();
  },


  /**
   * @description 차트 테두리를 그려준다
   */
  drawMarkLine: function drawMarkLine() {
    this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(0, 0), this.ctx.stroke();
  },


  /**
   * @description 차트를 그려주는 함수
   * @param {string} lineColor drawLine()에 인자값으로 넘겨줄 상승 곡선의 색
   */
  drawChart: function drawChart(lineColor) {
    this.point = Math.pow(Math.E, this.duration * this.BASE), this.calcScale(), this.calcAxis(), this.clear(), this.drawMarkLine(), this.drawLine(lineColor);
  },


  /**
   * @description 차트를 계속 렌더링 해준다.
   * point가 maxPoint보다 높거나 같아지면 stop() 함수 실행
   */
  render: function render() {
    this.rAFId = requestAnimationFrame(this.render.bind(this)), this.drawChart();
    if (this.point >= this.maxPoint) this.stop(this.maxPoint);
  },
  start: function start() {
    var i = this;
    if (this.rendering == false) {
      this.rAFId = requestAnimationFrame(this.render.bind(this)), this.status = "running", this.timerId = setInterval(function () {
        i.duration += i.STEP;
      }, this.STEP_TIME), this.rendering = true, this.maxPoint = this.generateRandom(this.beginingPoint, this.maxPoint);
    }
  },
  stop: function stop(maxPoint) {
    void 0 === maxPoint && (maxPoint = 0), cancelAnimationFrame(this.rAFId), clearInterval(this.timerId), this.init(this.getDurationByPoint(maxPoint || this.point)), this.status = "stop", this.drawChart(this.stopLineColor), this.rendering = false;
  },


  /**
   * @description 투명한 사각형을 현재 canvas의 width, height의 맞게 생성하여 다시 그릴 수 있게 해준다.
   */
  clear: function clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },


  /**
   * @description maxPoint의 값을 랜덤으로 정하기 위함
   * @param {number} min 최솟값
   * @param {number} max 최댓값
   */
  generateRandom: function generateRandom(min, max) {
    min = typeof min !== 'undefined' ? min : 0;
    var maxPointVal = Math.random() * max + min;
    return maxPointVal > max ? maxPointVal - 1 : maxPointVal;
  }
};

chartFrame.init(0);