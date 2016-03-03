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
    filled: false
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

            this.ctx.strokeStyle = '#000000';
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
    _this.filled = options.filled;
    return _this;
  }

  _createClass(Drawer, [{
    key: 'drawFunction',
    value: function drawFunction() {
      var steps = 10,
          t = this.tBegin,
          x0Value = (this.width - 0.5) / 2 / this.interval,
          y0Value = (this.height - 0.5) / 2 / this.interval,
          x = this.a * (t * t - 1) / (t * t + 1),
          y = this.a * t * (t * t - 1) / (t * t + 1),
          realX = (x + x0Value) * this.interval,
          realY = (y0Value - y) * this.interval,
          grade = 2 * 3.14 / 360;

      this.ctx.beginPath();

      this.ctx.moveTo(realX, realY);
      while (t < steps) {
        x = this.a * (t * t - 1) / (t * t + 1);
        y = this.a * t * (t * t - 1) / (t * t + 1);
        console.log('x:' + x + ' + y:' + y);
        realX = (x + x0Value) * this.interval;
        realY = this.interval * (y0Value - y);
        this.ctx.lineTo(realX, realY);
        t += grade;
      }

      if (this.filled) {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }

      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
      this.ctx.closePath();
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
      this.drawFunction(false);
    },
    get: function get() {
      return this.a;
    }
  }, {
    key: 'beginValue',
    set: function set(value) {
      this.tBegin = value;
      this.clear();
      this.drawFunction(false);
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
  }]);

  return Drawer;
}(_Base3.default);

//TODO: axis scales depands on graphic
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZW1wL21haW4uanMiLCJ0ZW1wL21vZHVsZXMvQXhpcy5qcyIsInRlbXAvbW9kdWxlcy9CYXNlLmpzIiwidGVtcC9tb2R1bGVzL0Nvb3JkLmpzIiwidGVtcC9tb2R1bGVzL0RyYXdlci5qcyIsInRlbXAvbW9kdWxlcy9GaWVsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfRHJhd2VyID0gcmVxdWlyZSgnLi9tb2R1bGVzL0RyYXdlcicpO1xuXG52YXIgX0RyYXdlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmF3ZXIpO1xuXG52YXIgX0ZpZWxkID0gcmVxdWlyZSgnLi9tb2R1bGVzL0ZpZWxkJyk7XG5cbnZhciBfRmllbGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmllbGQpO1xuXG52YXIgX0F4aXMgPSByZXF1aXJlKCcuL21vZHVsZXMvQXhpcycpO1xuXG52YXIgX0F4aXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXhpcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1haW5FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZ3JvdW5kJyksXG4gICAgICBjdHggPSBtYWluRWwuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgIGZ1bmNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdW5jJyksXG4gICAgICBmdW5jQ3R4ID0gZnVuY0VsLmdldENvbnRleHQoJzJkJyksXG4gICAgICBpbnRlcnZhbCA9IDIwLFxuICAgICAgd2lkdGggPSAxMDAwLFxuICAgICAgaGVpZ2h0ID0gODAwLFxuICAgICAgZmllbGQgPSBuZXcgX0ZpZWxkMi5kZWZhdWx0KHtcbiAgICBpbnRlcnZhbDogaW50ZXJ2YWwsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIGN0eDogY3R4LFxuICAgIGNvbG9yOiAnI2VlZSdcbiAgfSksXG4gICAgICBheGlzID0gbmV3IF9BeGlzMi5kZWZhdWx0KHtcbiAgICBpbnRlcnZhbDogaW50ZXJ2YWwsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIGN0eDogY3R4LFxuICAgIGZvbnQ6ICcxMHB4IEFyaWFsJyxcbiAgICBjb2xvcjogJyMwMDAwMDAnXG4gIH0pLFxuICAgICAgZHJhd2VyID0gbmV3IF9EcmF3ZXIyLmRlZmF1bHQoe1xuICAgIGNvbG9yOiBcIiMzRTI3MjNcIixcbiAgICBpbnRlcnZhbDogaW50ZXJ2YWwsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIGN0eDogZnVuY0N0eCxcbiAgICBhOiA1LFxuICAgIHRCZWdpbjogLTUsXG4gICAgZmlsbGVkOiBmYWxzZVxuICB9KTtcblxuICBmaWVsZC5kcmF3R3JpZCgpO1xuICBheGlzLmRyYXdDb29yZCgpO1xuICBkcmF3ZXIuZHJhd0Z1bmN0aW9uKGZhbHNlKTtcblxuICBhZGRMaXN0ZW5lcnMoe1xuICAgIG1haW5FbDogbWFpbkVsLFxuICAgIGZ1bmNFbDogZnVuY0VsLFxuICAgIGZpZWxkOiBmaWVsZCxcbiAgICBheGlzOiBheGlzLFxuICAgIGRyYXdlcjogZHJhd2VyXG4gIH0pO1xufSk7XG5cbnZhciBhZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoX3JlZikge1xuICB2YXIgbWFpbkVsID0gX3JlZi5tYWluRWw7XG4gIHZhciBmaWVsZCA9IF9yZWYuZmllbGQ7XG4gIHZhciBheGlzID0gX3JlZi5heGlzO1xuICB2YXIgZHJhd2VyID0gX3JlZi5kcmF3ZXI7XG5cbiAgdmFyIGJjb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZ3JvdW5kQ29sb3InKSxcbiAgICAgIGdyaWRDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkQ29sb3InKSxcbiAgICAgIGF4aXNDb2xvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdheGlzQ29sb3InKSxcbiAgICAgIGxhYmVsc0NvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXNUaXRsZUNvbG9yJyksXG4gICAgICBjaGFydENvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0Q29sb3InKSxcbiAgICAgIGNoYXJ0VEJhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0VmFsdWUnKSxcbiAgICAgIGNoYXJ0QVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0QVZhbHVlJyksXG4gICAgICBpc0NoYXJ0RmlsbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lzQ2hhcnRGaWxsZWQnKSxcbiAgICAgIG1hcCA9IG5ldyBNYXAoKTtcblxuICBtYXAuc2V0KGJjb2xvciwgZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIGNoYW5nZUJnQ29sb3IobWFpbkVsLCBjb2xvcik7XG4gIH0pLnNldChncmlkQ29sb3IsIGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiBmaWVsZC5ncmlkQ29sb3IgPSBjb2xvcjtcbiAgfSkuc2V0KGF4aXNDb2xvciwgZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIGF4aXMuYXhpc0NvbG9yID0gY29sb3I7XG4gIH0pLnNldChjaGFydENvbG9yLCBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gZHJhd2VyLmNoYXJ0Q29sb3IgPSBjb2xvcjtcbiAgfSkuc2V0KGNoYXJ0QVZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZHJhd2VyLkF2YWx1ZSA9ICt2YWx1ZTtcbiAgfSkuc2V0KGNoYXJ0VEJhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZHJhd2VyLmJlZ2luVmFsdWUgPSArdmFsdWU7XG4gIH0pLnNldChsYWJlbHNDb2xvciwgZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIGF4aXMubGFiZWxzQ29sb3IgPSBjb2xvcjtcbiAgfSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBrZXkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhbHVlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXNDaGFydEZpbGxlZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkcmF3ZXIuY2xlYXIoKTtcbiAgICBkcmF3ZXIuaXNGaWxsZWQgPSBlLnRhcmdldC5jaGVja2VkO1xuICB9KTtcbn07XG5cbnZhciBjaGFuZ2VCZ0NvbG9yID0gZnVuY3Rpb24gY2hhbmdlQmdDb2xvcihlbCwgY29sb3IpIHtcbiAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0Jhc2UyID0gcmVxdWlyZSgnLi9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIENvb3JkID0gZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgX2luaGVyaXRzKENvb3JkLCBfQmFzZSk7XG5cbiAgICBmdW5jdGlvbiBDb29yZChvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb29yZCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvb3JkKS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuICAgICAgICBfdGhpcy5mb250ID0gb3B0aW9ucy5mb250O1xuICAgICAgICBfdGhpcy5sYWJlbENvbG9yID0gb3B0aW9ucy5sYWJlbENvbG9yO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKENvb3JkLCBbe1xuICAgICAgICBrZXk6ICdkcmF3Q29vcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd0Nvb3JkKCkge1xuICAgICAgICAgICAgdGhpcy5kcmF3WENvb3JkKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdZQ29vcmQoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0xhYmVscygpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3WENvb3JkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdYQ29vcmQoKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuYmVnaW4sXG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLndpZHRoLFxuICAgICAgICAgICAgICAgIHRpdGxlID0gLSh0aGlzLndpZHRoIC8gMiAvIHRoaXMuaW50ZXJ2YWwpICsgMTtcblxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmxhYmVsQ29sb3I7XG5cbiAgICAgICAgICAgIHdoaWxlICh4IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIHggKz0gdGhpcy5pbnRlcnZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aXRsZSsrLCB4LCB5IC0gdGhpcy5pbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5IC0gdGhpcy5pbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5ICsgdGhpcy5pbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICB4ICs9IHRoaXMuaW50ZXZhbDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd1lDb29yZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3WUNvb3JkKCkge1xuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLmJlZ2luLFxuICAgICAgICAgICAgICAgIHggPSB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHRoaXMuaGVpZ2h0IC8gMiAvIHRoaXMuaW50ZXJ2YWwgLSAxO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMubGFiZWxDb2xvcjtcblxuICAgICAgICAgICAgd2hpbGUgKHkgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgeSArPSB0aGlzLmludGVydmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aXRsZS0tLCB4IC0gdGhpcy5pbnRlcnZhbCwgeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUtLTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCAtIHRoaXMuaW50ZXJ2YWwgLyAyLCB5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCArIHRoaXMuaW50ZXJ2YWwgLyAyLCB5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgeSArPSB0aGlzLmludGVydmFsO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3TGFiZWxzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdMYWJlbHMoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnWScsIHRoaXMud2lkdGggLyAyICsgdGhpcy5pbnRlcnZhbCwgdGhpcy5iZWdpbiArIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ1gnLCB0aGlzLndpZHRoIC0gdGhpcy5pbnRlcnZhbCwgdGhpcy5oZWlnaHQgLyAyICsgdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2F4aXNDb2xvcicsXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLmRyYXdDb29yZCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsYWJlbHNDb2xvcicsXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuZHJhd0Nvb3JkKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxDb2xvcjtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb29yZDtcbn0oX0Jhc2UzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb29yZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUF4aXMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEJhc2UgPSBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge1xuICAgICAgICBjb2xvcjogJyNlZWUnLFxuICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICBoZWlnaHQ6IDUwMCxcbiAgICAgICAgaW50ZXJ2YWw6IDIwXG4gICAgfSA6IGFyZ3VtZW50c1swXTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlKTtcblxuICAgIHRoaXMuY3R4ID0gb3B0aW9ucy5jdHg7XG4gICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgICB0aGlzLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcbiAgICB0aGlzLmludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbDtcbiAgICB0aGlzLmJlZ2luID0gMC41O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJhc2UuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9CYXNlMiA9IHJlcXVpcmUoJy4vQmFzZScpO1xuXG52YXIgX0Jhc2UzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmFzZTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBDb29yZCA9IGZ1bmN0aW9uIChfQmFzZSkge1xuICAgIF9pbmhlcml0cyhDb29yZCwgX0Jhc2UpO1xuXG4gICAgZnVuY3Rpb24gQ29vcmQob3B0aW9ucykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29vcmQpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb29yZCkuY2FsbCh0aGlzLCBvcHRpb25zKSk7XG5cbiAgICAgICAgX3RoaXMuZm9udCA9IG9wdGlvbnMuZm9udDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDb29yZCwgW3tcbiAgICAgICAga2V5OiAnZHJhd0Nvb3JkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdDb29yZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1hDb29yZCgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3WUNvb3JkKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdUaXRsZXMoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd1hDb29yZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3WENvb3JkKCkge1xuICAgICAgICAgICAgdmFyIHggPSB0aGlzLmJlZ2luLFxuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgZW5kID0gdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0aXRsZSA9IC0odGhpcy53aWR0aCAvIDIgLyB0aGlzLmludGVydmFsKSArIDE7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICB3aGlsZSAoeCA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICB4ICs9IHRoaXMuaW50ZXJ2YWw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGl0bGUrKywgeCwgeSAtIHRoaXMuaW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSAtIHRoaXMuaW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSArIHRoaXMuaW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMuZm9udDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdYJywgeCAtIHRoaXMuaW50ZXJ2YWwsIHkgKyB0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgIHggKz0gdGhpcy5pbnRldmFsO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3WUNvb3JkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdZQ29vcmQoKSB7XG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuYmVnaW4sXG4gICAgICAgICAgICAgICAgeCA9IHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIGVuZCA9IHRoaXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRpdGxlID0gdGhpcy5oZWlnaHQgLyAyIC8gdGhpcy5pbnRlcnZhbCAtIDE7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICB3aGlsZSAoeSA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICB5ICs9IHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRpdGxlLS0sIHggLSB0aGlzLmludGVydmFsLCB5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZS0tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4IC0gdGhpcy5pbnRlcnZhbCAvIDIsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgdGhpcy5pbnRlcnZhbCAvIDIsIHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ1knLCB4ICsgdGhpcy5pbnRlcnZhbCwgdGhpcy5iZWdpbiArIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICB5ICs9IHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd1RpdGxlcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3VGl0bGVzKCkge31cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29vcmQ7XG59KF9CYXNlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29vcmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db29yZC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9CYXNlMiA9IHJlcXVpcmUoJy4vQmFzZScpO1xuXG52YXIgX0Jhc2UzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQmFzZTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBEcmF3ZXIgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgX2luaGVyaXRzKERyYXdlciwgX0Jhc2UpO1xuXG4gIGZ1bmN0aW9uIERyYXdlcigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHtcbiAgICAgIGE6IDEwLFxuICAgICAgdEJlZ2luOiAtNCxcbiAgICAgIGZpbGxlZDogZmFsc2VcbiAgICB9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyYXdlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhd2VyKS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmEgPSBvcHRpb25zLmE7XG4gICAgX3RoaXMudEJlZ2luID0gb3B0aW9ucy50QmVnaW47XG4gICAgX3RoaXMuZmlsbGVkID0gb3B0aW9ucy5maWxsZWQ7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKERyYXdlciwgW3tcbiAgICBrZXk6ICdkcmF3RnVuY3Rpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3RnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RlcHMgPSAxMCxcbiAgICAgICAgICB0ID0gdGhpcy50QmVnaW4sXG4gICAgICAgICAgeDBWYWx1ZSA9ICh0aGlzLndpZHRoIC0gMC41KSAvIDIgLyB0aGlzLmludGVydmFsLFxuICAgICAgICAgIHkwVmFsdWUgPSAodGhpcy5oZWlnaHQgLSAwLjUpIC8gMiAvIHRoaXMuaW50ZXJ2YWwsXG4gICAgICAgICAgeCA9IHRoaXMuYSAqICh0ICogdCAtIDEpIC8gKHQgKiB0ICsgMSksXG4gICAgICAgICAgeSA9IHRoaXMuYSAqIHQgKiAodCAqIHQgLSAxKSAvICh0ICogdCArIDEpLFxuICAgICAgICAgIHJlYWxYID0gKHggKyB4MFZhbHVlKSAqIHRoaXMuaW50ZXJ2YWwsXG4gICAgICAgICAgcmVhbFkgPSAoeTBWYWx1ZSAtIHkpICogdGhpcy5pbnRlcnZhbCxcbiAgICAgICAgICBncmFkZSA9IDIgKiAzLjE0IC8gMzYwO1xuXG4gICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgdGhpcy5jdHgubW92ZVRvKHJlYWxYLCByZWFsWSk7XG4gICAgICB3aGlsZSAodCA8IHN0ZXBzKSB7XG4gICAgICAgIHggPSB0aGlzLmEgKiAodCAqIHQgLSAxKSAvICh0ICogdCArIDEpO1xuICAgICAgICB5ID0gdGhpcy5hICogdCAqICh0ICogdCAtIDEpIC8gKHQgKiB0ICsgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd4OicgKyB4ICsgJyArIHk6JyArIHkpO1xuICAgICAgICByZWFsWCA9ICh4ICsgeDBWYWx1ZSkgKiB0aGlzLmludGVydmFsO1xuICAgICAgICByZWFsWSA9IHRoaXMuaW50ZXJ2YWwgKiAoeTBWYWx1ZSAtIHkpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8ocmVhbFgsIHJlYWxZKTtcbiAgICAgICAgdCArPSBncmFkZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGVhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGFydENvbG9yJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChjb2xvcikge1xuICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgdGhpcy5kcmF3RnVuY3Rpb24oKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnQXZhbHVlJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5hID0gdmFsdWU7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmRyYXdGdW5jdGlvbihmYWxzZSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmE7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYmVnaW5WYWx1ZScsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMudEJlZ2luID0gdmFsdWU7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmRyYXdGdW5jdGlvbihmYWxzZSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRCZWdpbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc0ZpbGxlZCcsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuZmlsbGVkID0gdmFsdWU7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmRyYXdGdW5jdGlvbigpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxsZWQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIERyYXdlcjtcbn0oX0Jhc2UzLmRlZmF1bHQpO1xuXG4vL1RPRE86IGF4aXMgc2NhbGVzIGRlcGFuZHMgb24gZ3JhcGhpY1xuLy9UT0RPOiBtYXJrZXJzIGluIHBvaW50c1xuLy9UT0RPOiBtYXgodCksIHN0ZXBzXG5cblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJhd2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RHJhd2VyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfQmFzZTIgPSByZXF1aXJlKCcuL0Jhc2UnKTtcblxudmFyIF9CYXNlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jhc2UyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgRmllbGQgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHMoRmllbGQsIF9CYXNlKTtcblxuICAgIGZ1bmN0aW9uIEZpZWxkKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmllbGQpO1xuXG4gICAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRmllbGQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhGaWVsZCwgW3tcbiAgICAgICAga2V5OiAnZHJhd0dyaWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd0dyaWQoKSB7XG4gICAgICAgICAgICB2YXIgeCwgeTtcblxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgMCk7XG5cbiAgICAgICAgICAgIGZvciAoeCA9IHRoaXMuYmVnaW47IHggPCB0aGlzLndpZHRoOyB4ICs9IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh5ID0gdGhpcy5iZWdpbjsgeSA8IHRoaXMuaGVpZ2h0OyB5ICs9IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMud2lkdGgsIHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdncmlkQ29sb3InLFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRmllbGQ7XG59KF9CYXNlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRmllbGQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWVsZC5qcy5tYXBcbiJdfQ==
