(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Drawer = require('./modules/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Field = require('./modules/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Axis = require('./modules/Axis');

var _Axis2 = _interopRequireDefault(_Axis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var mainEl = document.getElementById('background'),
      ctx = mainEl.getContext('2d'),
      funcEl = document.getElementById('func'),
      funcCtx = funcEl.getContext('2d'),
      interval = 20,
      width = 1000,
      height = 800,
      field = new _Field2.default({
    interval: interval,
    width: width,
    height: height,
    ctx: ctx,
    color: '#eee'
  }),
      axis = new _Axis2.default({
    interval: interval,
    width: width,
    height: height,
    ctx: ctx,
    font: '10px Arial',
    color: '#000000'
  }),
      drawer = new _Drawer2.default({
    color: "#3E2723",
    interval: interval,
    width: width,
    height: height,
    ctx: funcCtx,
    a: 5,
    tBegin: -5,
    filled: false,
    tFinish: 10,
    step: 2 * 3.14 / 360
  });

  field.drawGrid();
  axis.drawCoord();
  drawer.drawFunction(false);

  addListeners({
    mainEl: mainEl,
    funcEl: funcEl,
    field: field,
    axis: axis,
    drawer: drawer
  });
});

var addListeners = function addListeners(_ref) {
  var mainEl = _ref.mainEl;
  var field = _ref.field;
  var axis = _ref.axis;
  var drawer = _ref.drawer;

  var bcolor = document.getElementById('backgroundColor'),
      gridColor = document.getElementById('gridColor'),
      axisColor = document.getElementById('axisColor'),
      labelsColor = document.getElementById('axisTitleColor'),
      chartColor = document.getElementById('chartColor'),
      chartTBalue = document.getElementById('chartValue'),
      chartAValue = document.getElementById('chartAValue'),
      isChartFilled = document.getElementById('isChartFilled'),
      map = new Map();

  map.set(bcolor, function (color) {
    return changeBgColor(mainEl, color);
  }).set(gridColor, function (color) {
    return field.gridColor = color;
  }).set(axisColor, function (color) {
    return axis.axisColor = color;
  }).set(chartColor, function (color) {
    return drawer.chartColor = color;
  }).set(chartAValue, function (value) {
    return drawer.Avalue = +value;
  }).set(chartTBalue, function (value) {
    return drawer.beginValue = +value;
  }).set(labelsColor, function (color) {
    return axis.labelsColor = color;
  });

  map.forEach(function (value, key) {
    key.addEventListener('change', function (e) {
      e.preventDefault();
      value(e.target.value);
    });
  });

  isChartFilled.addEventListener('change', function (e) {
    e.preventDefault();
    drawer.clear();
    drawer.isFilled = e.target.checked;
  });
};

var changeBgColor = function changeBgColor(el, color) {
  el.style.backgroundColor = color;
};


},{"./modules/Axis":2,"./modules/Drawer":5,"./modules/Field":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Coord = function (_Base) {
    _inherits(Coord, _Base);

    function Coord(options) {
        _classCallCheck(this, Coord);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Coord).call(this, options));

        _this.font = options.font;
        _this.labelColor = options.labelColor;
        return _this;
    }

    _createClass(Coord, [{
        key: 'drawCoord',
        value: function drawCoord() {
            this.drawXCoord();
            this.drawYCoord();
            this.drawLabels();
        }
    }, {
        key: 'drawXCoord',
        value: function drawXCoord() {
            var x = this.begin,
                y = this.height / 2,
                end = this.width,
                title = -(this.width / 2 / this.interval) + 1;

            this.ctx.beginPath();
            this.ctx.fillStyle = this.labelColor;

            while (x < end) {
                this.ctx.moveTo(x, y);
                x += this.interval;

                this.ctx.lineTo(x, y);
                this.ctx.fillText(title++, x, y - this.interval / 2);
                this.ctx.lineTo(x, y - this.interval / 2);
                this.ctx.lineTo(x, y + this.interval / 2);
            }

            this.ctx.moveTo(x, y);
            x += this.inteval;
            this.ctx.lineTo(x, y);

            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }, {
        key: 'drawYCoord',
        value: function drawYCoord() {
            var y = this.begin,
                x = this.width / 2,
                end = this.height,
                title = this.height / 2 / this.interval - 1;

            this.ctx.beginPath();
            this.ctx.fillStyle = this.labelColor;

            while (y < end) {
                this.ctx.moveTo(x, y);
                y += this.interval;
                this.ctx.lineTo(x, y);

                if (title) {
                    this.ctx.fillText(title--, x - this.interval, y);
                } else {
                    title--;
                }

                this.ctx.lineTo(x - this.interval / 2, y);
                this.ctx.lineTo(x + this.interval / 2, y);
            }

            this.ctx.moveTo(x, y);
            y += this.interval;
            this.ctx.lineTo(x, y);

            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }, {
        key: 'drawLabels',
        value: function drawLabels() {
            this.ctx.fillText('Y', this.width / 2 + this.interval, this.begin + this.interval);
            this.ctx.fillText('X', this.width - this.interval, this.height / 2 + this.interval);
        }
    }, {
        key: 'axisColor',
        set: function set(color) {
            this.color = color;
            this.drawCoord();
        },
        get: function get() {
            return this.color;
        }
    }, {
        key: 'labelsColor',
        set: function set(color) {
            this.labelColor = color;
            this.drawCoord();
        },
        get: function get() {
            return this.labelColor;
        }
    }]);

    return Coord;
}(_Base3.default);

exports.default = Coord;


},{"./Base":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function Base() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        color: '#eee',
        width: 500,
        height: 500,
        interval: 20
    } : arguments[0];

    _classCallCheck(this, Base);

    this.ctx = options.ctx;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.interval = options.interval;
    this.begin = 0.5;
};

exports.default = Base;


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Coord = function (_Base) {
    _inherits(Coord, _Base);

    function Coord(options) {
        _classCallCheck(this, Coord);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Coord).call(this, options));

        _this.font = options.font;
        return _this;
    }

    _createClass(Coord, [{
        key: 'drawCoord',
        value: function drawCoord() {
            this.drawXCoord();
            this.drawYCoord();
            this.drawTitles();
        }
    }, {
        key: 'drawXCoord',
        value: function drawXCoord() {
            var x = this.begin,
                y = this.height / 2,
                end = this.width,
                title = -(this.width / 2 / this.interval) + 1;

            this.ctx.beginPath();

            while (x < end) {
                this.ctx.moveTo(x, y);
                x += this.interval;

                this.ctx.lineTo(x, y);
                this.ctx.fillText(title++, x, y - this.interval / 2);
                this.ctx.lineTo(x, y - this.interval / 2);
                this.ctx.lineTo(x, y + this.interval / 2);
            }

            this.ctx.font = this.font;
            this.ctx.fillText('X', x - this.interval, y + this.interval);
            this.ctx.moveTo(x, y);
            x += this.inteval;
            this.ctx.lineTo(x, y);

            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }, {
        key: 'drawYCoord',
        value: function drawYCoord() {
            var y = this.begin,
                x = this.width / 2,
                end = this.height,
                title = this.height / 2 / this.interval - 1;

            this.ctx.beginPath();

            while (y < end) {
                this.ctx.moveTo(x, y);
                y += this.interval;
                this.ctx.lineTo(x, y);

                if (title) {
                    this.ctx.fillText(title--, x - this.interval, y);
                } else {
                    title--;
                }

                this.ctx.lineTo(x - this.interval / 2, y);
                this.ctx.lineTo(x + this.interval / 2, y);
            }

            this.ctx.font = this.font;
            this.ctx.fillText('Y', x + this.interval, this.begin + this.interval);

            this.ctx.moveTo(x, y);
            y += this.interval;
            this.ctx.lineTo(x, y);

            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }, {
        key: 'drawTitles',
        value: function drawTitles() {}
    }]);

    return Coord;
}(_Base3.default);

exports.default = Coord;


},{"./Base":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = function (_Base) {
  _inherits(Drawer, _Base);

  function Drawer() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
      a: 10,
      tBegin: -4,
      filled: false
    } : arguments[0];

    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).call(this, options));

    _this.a = options.a;
    _this.tBegin = options.tBegin;
    _this.tFinish = options.tFinish;
    _this.filled = options.filled;
    _this.step = options.step;
    _this.points = {
      x: [],
      y: []
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: 'drawFunction',
    value: function drawFunction() {
      this.calcPoints();

      var _getScaledPoints = this.getScaledPoints();

      var x = _getScaledPoints.x;
      var y = _getScaledPoints.y;
      var i = 1;

      this.ctx.beginPath();

      this.ctx.moveTo(x[0], y[0]);

      while (x[i]) {
        this.ctx.lineTo(x[i], y[i]);
        i++;
      }

      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: 'calcPoints',
    value: function calcPoints() {
      var t = this.tBegin;

      this.cleanPoints();

      while (t < this.tFinish) {
        var _countXY = this.countXY(t);

        var x = _countXY.x;
        var y = _countXY.y;

        this.points.x.push(x);
        this.points.y.push(y);
        t += this.step;
      }
    }
  }, {
    key: 'getScaledPoints',
    value: function getScaledPoints() {
      var _this2 = this;

      var xCenter = (this.width - this.begin) / 2,
          yCenter = (this.height - this.begin) / 2,
          x0Value = xCenter / this.interval,
          y0Value = yCenter / this.interval,
          scaledPoints = {
        x: [],
        y: []
      };

      this.points.x.forEach(function (xValue, index) {
        scaledPoints.x.push((xValue + x0Value) * _this2.interval);
        scaledPoints.y.push(_this2.interval * (y0Value - _this2.points.y[index]));
      });

      return scaledPoints;
    }
  }, {
    key: 'cleanPoints',
    value: function cleanPoints() {
      this.points = {
        x: [],
        y: []
      };
    }
  }, {
    key: 'countXY',
    value: function countXY(t) {
      return {
        x: this.a * (t * t - 1) / (t * t + 1),
        y: this.a * t * (t * t - 1) / (t * t + 1)
      };
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: 'chartColor',
    set: function set(color) {
      this.color = color;
      this.drawFunction();
    },
    get: function get() {
      return this.color;
    }
  }, {
    key: 'Avalue',
    set: function set(value) {
      this.a = value;
      this.clear();
      this.drawFunction();
    },
    get: function get() {
      return this.a;
    }
  }, {
    key: 'beginValue',
    set: function set(value) {
      this.tBegin = value;
      this.clear();
      this.drawFunction();
    },
    get: function get() {
      return this.tBegin;
    }
  }, {
    key: 'isFilled',
    set: function set(value) {
      this.filled = value;
      this.clear();
      this.drawFunction();
    },
    get: function get() {
      return this.filled;
    }
  }, {
    key: 'extremymX',
    get: function get() {
      var result = null;

      if (this.points.x.length) {
        var _Math, _Math2;

        result = {
          min: (_Math = Math).min.apply(_Math, _toConsumableArray(this.points.x)),
          max: (_Math2 = Math).max.apply(_Math2, _toConsumableArray(this.points.x))
        };
      }

      return result;
    }
  }, {
    key: 'extremymY',
    get: function get() {
      var result = null;

      if (this.points.y.length) {
        var _Math3, _Math4;

        result = {
          min: (_Math3 = Math).min.apply(_Math3, _toConsumableArray(this.points.y)),
          max: (_Math4 = Math).max.apply(_Math4, _toConsumableArray(this.points.y))
        };
      }

      return result;
    }
  }]);

  return Drawer;
}(_Base3.default);

//TODO: axis scales depends on graphic
//TODO: markers in points
//TODO: max(t), steps


exports.default = Drawer;


},{"./Base":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_Base) {
    _inherits(Field, _Base);

    function Field() {
        _classCallCheck(this, Field);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));
    }

    _createClass(Field, [{
        key: 'drawGrid',
        value: function drawGrid() {
            var x, y;

            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);

            for (x = this.begin; x < this.width; x += this.interval) {
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, this.height);
            }

            for (y = this.begin; y < this.height; y += this.interval) {
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.width, y);
            }

            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }, {
        key: 'gridColor',
        set: function set(color) {
            this.color = color;

            this.drawGrid();
        },
        get: function get() {
            return this.color;
        }
    }]);

    return Field;
}(_Base3.default);

exports.default = Field;


},{"./Base":3}]},{},[1,2,3,4,5,6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZW1wL21haW4uanMiLCJ0ZW1wL21vZHVsZXMvQXhpcy5qcyIsInRlbXAvbW9kdWxlcy9CYXNlLmpzIiwidGVtcC9tb2R1bGVzL0Nvb3JkLmpzIiwidGVtcC9tb2R1bGVzL0RyYXdlci5qcyIsInRlbXAvbW9kdWxlcy9GaWVsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX0RyYXdlciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9EcmF3ZXInKTtcblxudmFyIF9EcmF3ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhd2VyKTtcblxudmFyIF9GaWVsZCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9GaWVsZCcpO1xuXG52YXIgX0ZpZWxkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZpZWxkKTtcblxudmFyIF9BeGlzID0gcmVxdWlyZSgnLi9tb2R1bGVzL0F4aXMnKTtcblxudmFyIF9BeGlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0F4aXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBtYWluRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2dyb3VuZCcpLFxuICAgICAgY3R4ID0gbWFpbkVsLmdldENvbnRleHQoJzJkJyksXG4gICAgICBmdW5jRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVuYycpLFxuICAgICAgZnVuY0N0eCA9IGZ1bmNFbC5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgaW50ZXJ2YWwgPSAyMCxcbiAgICAgIHdpZHRoID0gMTAwMCxcbiAgICAgIGhlaWdodCA9IDgwMCxcbiAgICAgIGZpZWxkID0gbmV3IF9GaWVsZDIuZGVmYXVsdCh7XG4gICAgaW50ZXJ2YWw6IGludGVydmFsLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBjdHg6IGN0eCxcbiAgICBjb2xvcjogJyNlZWUnXG4gIH0pLFxuICAgICAgYXhpcyA9IG5ldyBfQXhpczIuZGVmYXVsdCh7XG4gICAgaW50ZXJ2YWw6IGludGVydmFsLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBjdHg6IGN0eCxcbiAgICBmb250OiAnMTBweCBBcmlhbCcsXG4gICAgY29sb3I6ICcjMDAwMDAwJ1xuICB9KSxcbiAgICAgIGRyYXdlciA9IG5ldyBfRHJhd2VyMi5kZWZhdWx0KHtcbiAgICBjb2xvcjogXCIjM0UyNzIzXCIsXG4gICAgaW50ZXJ2YWw6IGludGVydmFsLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBjdHg6IGZ1bmNDdHgsXG4gICAgYTogNSxcbiAgICB0QmVnaW46IC01LFxuICAgIGZpbGxlZDogZmFsc2UsXG4gICAgdEZpbmlzaDogMTAsXG4gICAgc3RlcDogMiAqIDMuMTQgLyAzNjBcbiAgfSk7XG5cbiAgZmllbGQuZHJhd0dyaWQoKTtcbiAgYXhpcy5kcmF3Q29vcmQoKTtcbiAgZHJhd2VyLmRyYXdGdW5jdGlvbihmYWxzZSk7XG5cbiAgYWRkTGlzdGVuZXJzKHtcbiAgICBtYWluRWw6IG1haW5FbCxcbiAgICBmdW5jRWw6IGZ1bmNFbCxcbiAgICBmaWVsZDogZmllbGQsXG4gICAgYXhpczogYXhpcyxcbiAgICBkcmF3ZXI6IGRyYXdlclxuICB9KTtcbn0pO1xuXG52YXIgYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKF9yZWYpIHtcbiAgdmFyIG1haW5FbCA9IF9yZWYubWFpbkVsO1xuICB2YXIgZmllbGQgPSBfcmVmLmZpZWxkO1xuICB2YXIgYXhpcyA9IF9yZWYuYXhpcztcbiAgdmFyIGRyYXdlciA9IF9yZWYuZHJhd2VyO1xuXG4gIHZhciBiY29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2dyb3VuZENvbG9yJyksXG4gICAgICBncmlkQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZENvbG9yJyksXG4gICAgICBheGlzQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXhpc0NvbG9yJyksXG4gICAgICBsYWJlbHNDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdheGlzVGl0bGVDb2xvcicpLFxuICAgICAgY2hhcnRDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydENvbG9yJyksXG4gICAgICBjaGFydFRCYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydFZhbHVlJyksXG4gICAgICBjaGFydEFWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydEFWYWx1ZScpLFxuICAgICAgaXNDaGFydEZpbGxlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpc0NoYXJ0RmlsbGVkJyksXG4gICAgICBtYXAgPSBuZXcgTWFwKCk7XG5cbiAgbWFwLnNldChiY29sb3IsIGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiBjaGFuZ2VCZ0NvbG9yKG1haW5FbCwgY29sb3IpO1xuICB9KS5zZXQoZ3JpZENvbG9yLCBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gZmllbGQuZ3JpZENvbG9yID0gY29sb3I7XG4gIH0pLnNldChheGlzQ29sb3IsIGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiBheGlzLmF4aXNDb2xvciA9IGNvbG9yO1xuICB9KS5zZXQoY2hhcnRDb2xvciwgZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIGRyYXdlci5jaGFydENvbG9yID0gY29sb3I7XG4gIH0pLnNldChjaGFydEFWYWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGRyYXdlci5BdmFsdWUgPSArdmFsdWU7XG4gIH0pLnNldChjaGFydFRCYWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGRyYXdlci5iZWdpblZhbHVlID0gK3ZhbHVlO1xuICB9KS5zZXQobGFiZWxzQ29sb3IsIGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiBheGlzLmxhYmVsc0NvbG9yID0gY29sb3I7XG4gIH0pO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAga2V5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YWx1ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGlzQ2hhcnRGaWxsZWQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZHJhd2VyLmNsZWFyKCk7XG4gICAgZHJhd2VyLmlzRmlsbGVkID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgfSk7XG59O1xuXG52YXIgY2hhbmdlQmdDb2xvciA9IGZ1bmN0aW9uIGNoYW5nZUJnQ29sb3IoZWwsIGNvbG9yKSB7XG4gIGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9CYXNlMiA9IHJlcXVpcmUoJy4vQmFzZScpO1xuXG52YXIgX0Jhc2UzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmFzZTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBDb29yZCA9IGZ1bmN0aW9uIChfQmFzZSkge1xuICAgIF9pbmhlcml0cyhDb29yZCwgX0Jhc2UpO1xuXG4gICAgZnVuY3Rpb24gQ29vcmQob3B0aW9ucykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29vcmQpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb29yZCkuY2FsbCh0aGlzLCBvcHRpb25zKSk7XG5cbiAgICAgICAgX3RoaXMuZm9udCA9IG9wdGlvbnMuZm9udDtcbiAgICAgICAgX3RoaXMubGFiZWxDb2xvciA9IG9wdGlvbnMubGFiZWxDb2xvcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDb29yZCwgW3tcbiAgICAgICAga2V5OiAnZHJhd0Nvb3JkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdDb29yZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1hDb29yZCgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3WUNvb3JkKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdMYWJlbHMoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd1hDb29yZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3WENvb3JkKCkge1xuICAgICAgICAgICAgdmFyIHggPSB0aGlzLmJlZ2luLFxuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgZW5kID0gdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0aXRsZSA9IC0odGhpcy53aWR0aCAvIDIgLyB0aGlzLmludGVydmFsKSArIDE7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5sYWJlbENvbG9yO1xuXG4gICAgICAgICAgICB3aGlsZSAoeCA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICB4ICs9IHRoaXMuaW50ZXJ2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGl0bGUrKywgeCwgeSAtIHRoaXMuaW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSAtIHRoaXMuaW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSArIHRoaXMuaW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgeCArPSB0aGlzLmludGV2YWw7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RyYXdZQ29vcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd1lDb29yZCgpIHtcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5iZWdpbixcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgZW5kID0gdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0aGlzLmhlaWdodCAvIDIgLyB0aGlzLmludGVydmFsIC0gMTtcblxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmxhYmVsQ29sb3I7XG5cbiAgICAgICAgICAgIHdoaWxlICh5IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIHkgKz0gdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGl0bGUtLSwgeCAtIHRoaXMuaW50ZXJ2YWwsIHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggLSB0aGlzLmludGVydmFsIC8gMiwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggKyB0aGlzLmludGVydmFsIC8gMiwgeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgIHkgKz0gdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd0xhYmVscycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3TGFiZWxzKCkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ1knLCB0aGlzLndpZHRoIC8gMiArIHRoaXMuaW50ZXJ2YWwsIHRoaXMuYmVnaW4gKyB0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdYJywgdGhpcy53aWR0aCAtIHRoaXMuaW50ZXJ2YWwsIHRoaXMuaGVpZ2h0IC8gMiArIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdheGlzQ29sb3InLFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5kcmF3Q29vcmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbGFiZWxzQ29sb3InLFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5sYWJlbENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLmRyYXdDb29yZCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsQ29sb3I7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29vcmQ7XG59KF9CYXNlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29vcmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BeGlzLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBCYXNlID0gZnVuY3Rpb24gQmFzZSgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHtcbiAgICAgICAgY29sb3I6ICcjZWVlJyxcbiAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgaGVpZ2h0OiA1MDAsXG4gICAgICAgIGludGVydmFsOiAyMFxuICAgIH0gOiBhcmd1bWVudHNbMF07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzZSk7XG5cbiAgICB0aGlzLmN0eCA9IG9wdGlvbnMuY3R4O1xuICAgIHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgdGhpcy5jb2xvciA9IG9wdGlvbnMuY29sb3I7XG4gICAgdGhpcy5pbnRlcnZhbCA9IG9wdGlvbnMuaW50ZXJ2YWw7XG4gICAgdGhpcy5iZWdpbiA9IDAuNTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJhc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXNlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfQmFzZTIgPSByZXF1aXJlKCcuL0Jhc2UnKTtcblxudmFyIF9CYXNlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jhc2UyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQ29vcmQgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHMoQ29vcmQsIF9CYXNlKTtcblxuICAgIGZ1bmN0aW9uIENvb3JkKG9wdGlvbnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvb3JkKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29vcmQpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG4gICAgICAgIF90aGlzLmZvbnQgPSBvcHRpb25zLmZvbnQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29vcmQsIFt7XG4gICAgICAgIGtleTogJ2RyYXdDb29yZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3Q29vcmQoKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdYQ29vcmQoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1lDb29yZCgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VGl0bGVzKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RyYXdYQ29vcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd1hDb29yZCgpIHtcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5iZWdpbixcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGVuZCA9IHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGl0bGUgPSAtKHRoaXMud2lkdGggLyAyIC8gdGhpcy5pbnRlcnZhbCkgKyAxO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICAgICAgd2hpbGUgKHggPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgeCArPSB0aGlzLmludGVydmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRpdGxlKyssIHgsIHkgLSB0aGlzLmludGVydmFsIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkgLSB0aGlzLmludGVydmFsIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkgKyB0aGlzLmludGVydmFsIC8gMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnWCcsIHggLSB0aGlzLmludGVydmFsLCB5ICsgdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICB4ICs9IHRoaXMuaW50ZXZhbDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd1lDb29yZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3WUNvb3JkKCkge1xuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLmJlZ2luLFxuICAgICAgICAgICAgICAgIHggPSB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHRoaXMuaGVpZ2h0IC8gMiAvIHRoaXMuaW50ZXJ2YWwgLSAxO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgICAgICAgd2hpbGUgKHkgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgeSArPSB0aGlzLmludGVydmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aXRsZS0tLCB4IC0gdGhpcy5pbnRlcnZhbCwgeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUtLTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCAtIHRoaXMuaW50ZXJ2YWwgLyAyLCB5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCArIHRoaXMuaW50ZXJ2YWwgLyAyLCB5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdZJywgeCArIHRoaXMuaW50ZXJ2YWwsIHRoaXMuYmVnaW4gKyB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgeSArPSB0aGlzLmludGVydmFsO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3VGl0bGVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdUaXRsZXMoKSB7fVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb29yZDtcbn0oX0Jhc2UzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb29yZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvb3JkLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0Jhc2UyID0gcmVxdWlyZSgnLi9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBEcmF3ZXIgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgX2luaGVyaXRzKERyYXdlciwgX0Jhc2UpO1xuXG4gIGZ1bmN0aW9uIERyYXdlcigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHtcbiAgICAgIGE6IDEwLFxuICAgICAgdEJlZ2luOiAtNCxcbiAgICAgIGZpbGxlZDogZmFsc2VcbiAgICB9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyYXdlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhd2VyKS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmEgPSBvcHRpb25zLmE7XG4gICAgX3RoaXMudEJlZ2luID0gb3B0aW9ucy50QmVnaW47XG4gICAgX3RoaXMudEZpbmlzaCA9IG9wdGlvbnMudEZpbmlzaDtcbiAgICBfdGhpcy5maWxsZWQgPSBvcHRpb25zLmZpbGxlZDtcbiAgICBfdGhpcy5zdGVwID0gb3B0aW9ucy5zdGVwO1xuICAgIF90aGlzLnBvaW50cyA9IHtcbiAgICAgIHg6IFtdLFxuICAgICAgeTogW11cbiAgICB9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEcmF3ZXIsIFt7XG4gICAga2V5OiAnZHJhd0Z1bmN0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd0Z1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jYWxjUG9pbnRzKCk7XG5cbiAgICAgIHZhciBfZ2V0U2NhbGVkUG9pbnRzID0gdGhpcy5nZXRTY2FsZWRQb2ludHMoKTtcblxuICAgICAgdmFyIHggPSBfZ2V0U2NhbGVkUG9pbnRzLng7XG4gICAgICB2YXIgeSA9IF9nZXRTY2FsZWRQb2ludHMueTtcbiAgICAgIHZhciBpID0gMTtcblxuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4WzBdLCB5WzBdKTtcblxuICAgICAgd2hpbGUgKHhbaV0pIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKHhbaV0sIHlbaV0pO1xuICAgICAgICBpKys7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2FsY1BvaW50cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbGNQb2ludHMoKSB7XG4gICAgICB2YXIgdCA9IHRoaXMudEJlZ2luO1xuXG4gICAgICB0aGlzLmNsZWFuUG9pbnRzKCk7XG5cbiAgICAgIHdoaWxlICh0IDwgdGhpcy50RmluaXNoKSB7XG4gICAgICAgIHZhciBfY291bnRYWSA9IHRoaXMuY291bnRYWSh0KTtcblxuICAgICAgICB2YXIgeCA9IF9jb3VudFhZLng7XG4gICAgICAgIHZhciB5ID0gX2NvdW50WFkueTtcblxuICAgICAgICB0aGlzLnBvaW50cy54LnB1c2goeCk7XG4gICAgICAgIHRoaXMucG9pbnRzLnkucHVzaCh5KTtcbiAgICAgICAgdCArPSB0aGlzLnN0ZXA7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2NhbGVkUG9pbnRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2NhbGVkUG9pbnRzKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciB4Q2VudGVyID0gKHRoaXMud2lkdGggLSB0aGlzLmJlZ2luKSAvIDIsXG4gICAgICAgICAgeUNlbnRlciA9ICh0aGlzLmhlaWdodCAtIHRoaXMuYmVnaW4pIC8gMixcbiAgICAgICAgICB4MFZhbHVlID0geENlbnRlciAvIHRoaXMuaW50ZXJ2YWwsXG4gICAgICAgICAgeTBWYWx1ZSA9IHlDZW50ZXIgLyB0aGlzLmludGVydmFsLFxuICAgICAgICAgIHNjYWxlZFBvaW50cyA9IHtcbiAgICAgICAgeDogW10sXG4gICAgICAgIHk6IFtdXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnBvaW50cy54LmZvckVhY2goZnVuY3Rpb24gKHhWYWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgc2NhbGVkUG9pbnRzLngucHVzaCgoeFZhbHVlICsgeDBWYWx1ZSkgKiBfdGhpczIuaW50ZXJ2YWwpO1xuICAgICAgICBzY2FsZWRQb2ludHMueS5wdXNoKF90aGlzMi5pbnRlcnZhbCAqICh5MFZhbHVlIC0gX3RoaXMyLnBvaW50cy55W2luZGV4XSkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzY2FsZWRQb2ludHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2xlYW5Qb2ludHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhblBvaW50cygpIHtcbiAgICAgIHRoaXMucG9pbnRzID0ge1xuICAgICAgICB4OiBbXSxcbiAgICAgICAgeTogW11cbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY291bnRYWScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvdW50WFkodCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy5hICogKHQgKiB0IC0gMSkgLyAodCAqIHQgKyAxKSxcbiAgICAgICAgeTogdGhpcy5hICogdCAqICh0ICogdCAtIDEpIC8gKHQgKiB0ICsgMSlcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2xlYXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2hhcnRDb2xvcicsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoY29sb3IpIHtcbiAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgIHRoaXMuZHJhd0Z1bmN0aW9uKCk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ0F2YWx1ZScsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuYSA9IHZhbHVlO1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5kcmF3RnVuY3Rpb24oKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuYTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdiZWdpblZhbHVlJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy50QmVnaW4gPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuZHJhd0Z1bmN0aW9uKCk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRCZWdpbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc0ZpbGxlZCcsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuZmlsbGVkID0gdmFsdWU7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmRyYXdGdW5jdGlvbigpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxsZWQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZXh0cmVteW1YJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5wb2ludHMueC5sZW5ndGgpIHtcbiAgICAgICAgdmFyIF9NYXRoLCBfTWF0aDI7XG5cbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgIG1pbjogKF9NYXRoID0gTWF0aCkubWluLmFwcGx5KF9NYXRoLCBfdG9Db25zdW1hYmxlQXJyYXkodGhpcy5wb2ludHMueCkpLFxuICAgICAgICAgIG1heDogKF9NYXRoMiA9IE1hdGgpLm1heC5hcHBseShfTWF0aDIsIF90b0NvbnN1bWFibGVBcnJheSh0aGlzLnBvaW50cy54KSlcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdleHRyZW15bVknLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnBvaW50cy55Lmxlbmd0aCkge1xuICAgICAgICB2YXIgX01hdGgzLCBfTWF0aDQ7XG5cbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgIG1pbjogKF9NYXRoMyA9IE1hdGgpLm1pbi5hcHBseShfTWF0aDMsIF90b0NvbnN1bWFibGVBcnJheSh0aGlzLnBvaW50cy55KSksXG4gICAgICAgICAgbWF4OiAoX01hdGg0ID0gTWF0aCkubWF4LmFwcGx5KF9NYXRoNCwgX3RvQ29uc3VtYWJsZUFycmF5KHRoaXMucG9pbnRzLnkpKVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEcmF3ZXI7XG59KF9CYXNlMy5kZWZhdWx0KTtcblxuLy9UT0RPOiBheGlzIHNjYWxlcyBkZXBlbmRzIG9uIGdyYXBoaWNcbi8vVE9ETzogbWFya2VycyBpbiBwb2ludHNcbi8vVE9ETzogbWF4KHQpLCBzdGVwc1xuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYXdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURyYXdlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0Jhc2UyID0gcmVxdWlyZSgnLi9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEZpZWxkID0gZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgX2luaGVyaXRzKEZpZWxkLCBfQmFzZSk7XG5cbiAgICBmdW5jdGlvbiBGaWVsZCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpZWxkKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZpZWxkKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRmllbGQsIFt7XG4gICAgICAgIGtleTogJ2RyYXdHcmlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdHcmlkKCkge1xuICAgICAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIDApO1xuXG4gICAgICAgICAgICBmb3IgKHggPSB0aGlzLmJlZ2luOyB4IDwgdGhpcy53aWR0aDsgeCArPSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoeSA9IHRoaXMuYmVnaW47IHkgPCB0aGlzLmhlaWdodDsgeSArPSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLndpZHRoLCB5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ3JpZENvbG9yJyxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgICAgICAgICAgdGhpcy5kcmF3R3JpZCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZpZWxkO1xufShfQmFzZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZpZWxkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmllbGQuanMubWFwXG4iXX0=
