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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZW1wL21haW4uanMiLCJ0ZW1wL21vZHVsZXMvQXhpcy5qcyIsInRlbXAvbW9kdWxlcy9CYXNlLmpzIiwidGVtcC9tb2R1bGVzL0Nvb3JkLmpzIiwidGVtcC9tb2R1bGVzL0RyYXdlci5qcyIsInRlbXAvbW9kdWxlcy9GaWVsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9EcmF3ZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvRHJhd2VyJyk7XG5cbnZhciBfRHJhd2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYXdlcik7XG5cbnZhciBfRmllbGQgPSByZXF1aXJlKCcuL21vZHVsZXMvRmllbGQnKTtcblxudmFyIF9GaWVsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GaWVsZCk7XG5cbnZhciBfQXhpcyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9BeGlzJyk7XG5cbnZhciBfQXhpczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BeGlzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICB2YXIgbWFpbkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tncm91bmQnKSxcbiAgICAgIGN0eCA9IG1haW5FbC5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgZnVuY0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bmMnKSxcbiAgICAgIGZ1bmNDdHggPSBmdW5jRWwuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgIGludGVydmFsID0gMjAsXG4gICAgICB3aWR0aCA9IDEwMDAsXG4gICAgICBoZWlnaHQgPSA4MDAsXG4gICAgICBmaWVsZCA9IG5ldyBfRmllbGQyLmRlZmF1bHQoe1xuICAgIGludGVydmFsOiBpbnRlcnZhbCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgY3R4OiBjdHgsXG4gICAgY29sb3I6ICcjZWVlJ1xuICB9KSxcbiAgICAgIGF4aXMgPSBuZXcgX0F4aXMyLmRlZmF1bHQoe1xuICAgIGludGVydmFsOiBpbnRlcnZhbCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgY3R4OiBjdHgsXG4gICAgZm9udDogJzEwcHggQXJpYWwnLFxuICAgIGNvbG9yOiAnIzAwMDAwMCdcbiAgfSksXG4gICAgICBkcmF3ZXIgPSBuZXcgX0RyYXdlcjIuZGVmYXVsdCh7XG4gICAgY29sb3I6IFwiIzNFMjcyM1wiLFxuICAgIGludGVydmFsOiBpbnRlcnZhbCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgY3R4OiBmdW5jQ3R4LFxuICAgIGE6IDUsXG4gICAgdEJlZ2luOiAtNSxcbiAgICBmaWxsZWQ6IGZhbHNlXG4gIH0pO1xuXG4gIGZpZWxkLmRyYXdHcmlkKCk7XG4gIGF4aXMuZHJhd0Nvb3JkKCk7XG4gIGRyYXdlci5kcmF3RnVuY3Rpb24oZmFsc2UpO1xuXG4gIGFkZExpc3RlbmVycyh7XG4gICAgbWFpbkVsOiBtYWluRWwsXG4gICAgZnVuY0VsOiBmdW5jRWwsXG4gICAgZmllbGQ6IGZpZWxkLFxuICAgIGF4aXM6IGF4aXMsXG4gICAgZHJhd2VyOiBkcmF3ZXJcbiAgfSk7XG59KTtcblxudmFyIGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhfcmVmKSB7XG4gIHZhciBtYWluRWwgPSBfcmVmLm1haW5FbDtcbiAgdmFyIGZpZWxkID0gX3JlZi5maWVsZDtcbiAgdmFyIGF4aXMgPSBfcmVmLmF4aXM7XG4gIHZhciBkcmF3ZXIgPSBfcmVmLmRyYXdlcjtcblxuICB2YXIgYmNvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tncm91bmRDb2xvcicpLFxuICAgICAgZ3JpZENvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWRDb2xvcicpLFxuICAgICAgYXhpc0NvbG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F4aXNDb2xvcicpLFxuICAgICAgbGFiZWxzQ29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXhpc1RpdGxlQ29sb3InKSxcbiAgICAgIGNoYXJ0Q29sb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnRDb2xvcicpLFxuICAgICAgY2hhcnRUQmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnRWYWx1ZScpLFxuICAgICAgY2hhcnRBVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnRBVmFsdWUnKSxcbiAgICAgIGlzQ2hhcnRGaWxsZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXNDaGFydEZpbGxlZCcpLFxuICAgICAgbWFwID0gbmV3IE1hcCgpO1xuXG4gIG1hcC5zZXQoYmNvbG9yLCBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gY2hhbmdlQmdDb2xvcihtYWluRWwsIGNvbG9yKTtcbiAgfSkuc2V0KGdyaWRDb2xvciwgZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgcmV0dXJuIGZpZWxkLmdyaWRDb2xvciA9IGNvbG9yO1xuICB9KS5zZXQoYXhpc0NvbG9yLCBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gYXhpcy5heGlzQ29sb3IgPSBjb2xvcjtcbiAgfSkuc2V0KGNoYXJ0Q29sb3IsIGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiBkcmF3ZXIuY2hhcnRDb2xvciA9IGNvbG9yO1xuICB9KS5zZXQoY2hhcnRBVmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBkcmF3ZXIuQXZhbHVlID0gK3ZhbHVlO1xuICB9KS5zZXQoY2hhcnRUQmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBkcmF3ZXIuYmVnaW5WYWx1ZSA9ICt2YWx1ZTtcbiAgfSkuc2V0KGxhYmVsc0NvbG9yLCBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gYXhpcy5sYWJlbHNDb2xvciA9IGNvbG9yO1xuICB9KTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGtleS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFsdWUoZS50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xuICB9KTtcblxuICBpc0NoYXJ0RmlsbGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRyYXdlci5jbGVhcigpO1xuICAgIGRyYXdlci5pc0ZpbGxlZCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gIH0pO1xufTtcblxudmFyIGNoYW5nZUJnQ29sb3IgPSBmdW5jdGlvbiBjaGFuZ2VCZ0NvbG9yKGVsLCBjb2xvcikge1xuICBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfQmFzZTIgPSByZXF1aXJlKCcuL0Jhc2UnKTtcblxudmFyIF9CYXNlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jhc2UyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQ29vcmQgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHMoQ29vcmQsIF9CYXNlKTtcblxuICAgIGZ1bmN0aW9uIENvb3JkKG9wdGlvbnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvb3JkKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29vcmQpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG4gICAgICAgIF90aGlzLmZvbnQgPSBvcHRpb25zLmZvbnQ7XG4gICAgICAgIF90aGlzLmxhYmVsQ29sb3IgPSBvcHRpb25zLmxhYmVsQ29sb3I7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29vcmQsIFt7XG4gICAgICAgIGtleTogJ2RyYXdDb29yZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3Q29vcmQoKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdYQ29vcmQoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1lDb29yZCgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3TGFiZWxzKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RyYXdYQ29vcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd1hDb29yZCgpIHtcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5iZWdpbixcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGVuZCA9IHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGl0bGUgPSAtKHRoaXMud2lkdGggLyAyIC8gdGhpcy5pbnRlcnZhbCkgKyAxO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMubGFiZWxDb2xvcjtcblxuICAgICAgICAgICAgd2hpbGUgKHggPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICAgICAgeCArPSB0aGlzLmludGVydmFsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRpdGxlKyssIHgsIHkgLSB0aGlzLmludGVydmFsIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkgLSB0aGlzLmludGVydmFsIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkgKyB0aGlzLmludGVydmFsIC8gMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgIHggKz0gdGhpcy5pbnRldmFsO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3WUNvb3JkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdZQ29vcmQoKSB7XG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuYmVnaW4sXG4gICAgICAgICAgICAgICAgeCA9IHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIGVuZCA9IHRoaXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRpdGxlID0gdGhpcy5oZWlnaHQgLyAyIC8gdGhpcy5pbnRlcnZhbCAtIDE7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5sYWJlbENvbG9yO1xuXG4gICAgICAgICAgICB3aGlsZSAoeSA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICB5ICs9IHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRpdGxlLS0sIHggLSB0aGlzLmludGVydmFsLCB5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZS0tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4IC0gdGhpcy5pbnRlcnZhbCAvIDIsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgdGhpcy5pbnRlcnZhbCAvIDIsIHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICB5ICs9IHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RyYXdMYWJlbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd0xhYmVscygpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdZJywgdGhpcy53aWR0aCAvIDIgKyB0aGlzLmludGVydmFsLCB0aGlzLmJlZ2luICsgdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnWCcsIHRoaXMud2lkdGggLSB0aGlzLmludGVydmFsLCB0aGlzLmhlaWdodCAvIDIgKyB0aGlzLmludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYXhpc0NvbG9yJyxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuZHJhd0Nvb3JkKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2xhYmVsc0NvbG9yJyxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5kcmF3Q29vcmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbENvbG9yO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIENvb3JkO1xufShfQmFzZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvb3JkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXhpcy5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQmFzZSA9IGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7XG4gICAgICAgIGNvbG9yOiAnI2VlZScsXG4gICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgIGhlaWdodDogNTAwLFxuICAgICAgICBpbnRlcnZhbDogMjBcbiAgICB9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2UpO1xuXG4gICAgdGhpcy5jdHggPSBvcHRpb25zLmN0eDtcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBvcHRpb25zLmludGVydmFsO1xuICAgIHRoaXMuYmVnaW4gPSAwLjU7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QmFzZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0Jhc2UyID0gcmVxdWlyZSgnLi9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIENvb3JkID0gZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgX2luaGVyaXRzKENvb3JkLCBfQmFzZSk7XG5cbiAgICBmdW5jdGlvbiBDb29yZChvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb29yZCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvb3JkKS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuICAgICAgICBfdGhpcy5mb250ID0gb3B0aW9ucy5mb250O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKENvb3JkLCBbe1xuICAgICAgICBrZXk6ICdkcmF3Q29vcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd0Nvb3JkKCkge1xuICAgICAgICAgICAgdGhpcy5kcmF3WENvb3JkKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdZQ29vcmQoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1RpdGxlcygpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3WENvb3JkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdYQ29vcmQoKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuYmVnaW4sXG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLndpZHRoLFxuICAgICAgICAgICAgICAgIHRpdGxlID0gLSh0aGlzLndpZHRoIC8gMiAvIHRoaXMuaW50ZXJ2YWwpICsgMTtcblxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgIHdoaWxlICh4IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIHggKz0gdGhpcy5pbnRlcnZhbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aXRsZSsrLCB4LCB5IC0gdGhpcy5pbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5IC0gdGhpcy5pbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5ICsgdGhpcy5pbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ1gnLCB4IC0gdGhpcy5pbnRlcnZhbCwgeSArIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgeCArPSB0aGlzLmludGV2YWw7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RyYXdZQ29vcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZHJhd1lDb29yZCgpIHtcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5iZWdpbixcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgZW5kID0gdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0aGlzLmhlaWdodCAvIDIgLyB0aGlzLmludGVydmFsIC0gMTtcblxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAgIHdoaWxlICh5IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIHkgKz0gdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGl0bGUtLSwgeCAtIHRoaXMuaW50ZXJ2YWwsIHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggLSB0aGlzLmludGVydmFsIC8gMiwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggKyB0aGlzLmludGVydmFsIC8gMiwgeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnWScsIHggKyB0aGlzLmludGVydmFsLCB0aGlzLmJlZ2luICsgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgICAgIHkgKz0gdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkcmF3VGl0bGVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdUaXRsZXMoKSB7fVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb29yZDtcbn0oX0Jhc2UzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb29yZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvb3JkLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0Jhc2UyID0gcmVxdWlyZSgnLi9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIERyYXdlciA9IGZ1bmN0aW9uIChfQmFzZSkge1xuICBfaW5oZXJpdHMoRHJhd2VyLCBfQmFzZSk7XG5cbiAgZnVuY3Rpb24gRHJhd2VyKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge1xuICAgICAgYTogMTAsXG4gICAgICB0QmVnaW46IC00LFxuICAgICAgZmlsbGVkOiBmYWxzZVxuICAgIH0gOiBhcmd1bWVudHNbMF07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhd2VyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmF3ZXIpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuYSA9IG9wdGlvbnMuYTtcbiAgICBfdGhpcy50QmVnaW4gPSBvcHRpb25zLnRCZWdpbjtcbiAgICBfdGhpcy5maWxsZWQgPSBvcHRpb25zLmZpbGxlZDtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRHJhd2VyLCBbe1xuICAgIGtleTogJ2RyYXdGdW5jdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdGdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdGVwcyA9IDEwLFxuICAgICAgICAgIHQgPSB0aGlzLnRCZWdpbixcbiAgICAgICAgICB4MFZhbHVlID0gKHRoaXMud2lkdGggLSAwLjUpIC8gMiAvIHRoaXMuaW50ZXJ2YWwsXG4gICAgICAgICAgeTBWYWx1ZSA9ICh0aGlzLmhlaWdodCAtIDAuNSkgLyAyIC8gdGhpcy5pbnRlcnZhbCxcbiAgICAgICAgICB4ID0gdGhpcy5hICogKHQgKiB0IC0gMSkgLyAodCAqIHQgKyAxKSxcbiAgICAgICAgICB5ID0gdGhpcy5hICogdCAqICh0ICogdCAtIDEpIC8gKHQgKiB0ICsgMSksXG4gICAgICAgICAgcmVhbFggPSAoeCArIHgwVmFsdWUpICogdGhpcy5pbnRlcnZhbCxcbiAgICAgICAgICByZWFsWSA9ICh5MFZhbHVlIC0geSkgKiB0aGlzLmludGVydmFsLFxuICAgICAgICAgIGdyYWRlID0gMiAqIDMuMTQgLyAzNjA7XG5cbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICB0aGlzLmN0eC5tb3ZlVG8ocmVhbFgsIHJlYWxZKTtcbiAgICAgIHdoaWxlICh0IDwgc3RlcHMpIHtcbiAgICAgICAgeCA9IHRoaXMuYSAqICh0ICogdCAtIDEpIC8gKHQgKiB0ICsgMSk7XG4gICAgICAgIHkgPSB0aGlzLmEgKiB0ICogKHQgKiB0IC0gMSkgLyAodCAqIHQgKyAxKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3g6JyArIHggKyAnICsgeTonICsgeSk7XG4gICAgICAgIHJlYWxYID0gKHggKyB4MFZhbHVlKSAqIHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgIHJlYWxZID0gdGhpcy5pbnRlcnZhbCAqICh5MFZhbHVlIC0geSk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyhyZWFsWCwgcmVhbFkpO1xuICAgICAgICB0ICs9IGdyYWRlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5maWxsZWQpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NsZWFyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoYXJ0Q29sb3InLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLmRyYXdGdW5jdGlvbigpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdBdmFsdWUnLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLmEgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuZHJhd0Z1bmN0aW9uKGZhbHNlKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuYTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdiZWdpblZhbHVlJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy50QmVnaW4gPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuZHJhd0Z1bmN0aW9uKGZhbHNlKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudEJlZ2luO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lzRmlsbGVkJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5maWxsZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuZHJhd0Z1bmN0aW9uKCk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbGxlZDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRHJhd2VyO1xufShfQmFzZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYXdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURyYXdlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0Jhc2UyID0gcmVxdWlyZSgnLi9CYXNlJyk7XG5cbnZhciBfQmFzZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEZpZWxkID0gZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgX2luaGVyaXRzKEZpZWxkLCBfQmFzZSk7XG5cbiAgICBmdW5jdGlvbiBGaWVsZCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpZWxkKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZpZWxkKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRmllbGQsIFt7XG4gICAgICAgIGtleTogJ2RyYXdHcmlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdHcmlkKCkge1xuICAgICAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIDApO1xuXG4gICAgICAgICAgICBmb3IgKHggPSB0aGlzLmJlZ2luOyB4IDwgdGhpcy53aWR0aDsgeCArPSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoeSA9IHRoaXMuYmVnaW47IHkgPCB0aGlzLmhlaWdodDsgeSArPSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLndpZHRoLCB5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ3JpZENvbG9yJyxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgICAgICAgICAgdGhpcy5kcmF3R3JpZCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZpZWxkO1xufShfQmFzZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZpZWxkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmllbGQuanMubWFwXG4iXX0=
