'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener("DOMContentLoaded", function () {
  var drawer = new Drawer({
    elementId: 'func'
  });

  drawer.drawGrid();
  drawer.drawCoord();

  drawer.drawFunction();
});

var Drawer = function () {
  function Drawer(_ref) {
    var _ref$width = _ref.width;
    var width = _ref$width === undefined ? 1000 : _ref$width;
    var _ref$height = _ref.height;
    var height = _ref$height === undefined ? 800 : _ref$height;
    var elementId = _ref.elementId;
    var _ref$interval = _ref.interval;
    var interval = _ref$interval === undefined ? 20 : _ref$interval;

    _classCallCheck(this, Drawer);

    this.el = document.getElementById(elementId);
    this.ctx = this.el.getContext('2d');
    this.width = 1000;
    this.height = 800;
    this.interval = interval;
  }

  _createClass(Drawer, [{
    key: 'drawGrid',
    value: function drawGrid() {
      this.ctx.beginPath();

      this.ctx.moveTo(0, 0);

      for (var x = 0.5; x < this.width; x += this.interval) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.height);
      }

      for (var y = 0.5; y < this.height; y += this.interval) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.width, y);
      }

      this.ctx.strokeStyle = "#eee";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: 'drawCoord',
    value: function drawCoord() {
      this.drawXCoord();
      this.drawYCoord();
    }
  }, {
    key: 'drawXCoord',
    value: function drawXCoord() {
      var x = 0.5,
          y = this.height / 2,
          end = this.width;

      this.ctx.beginPath();

      while (x < end) {
        this.ctx.moveTo(x, y);
        x += this.interval;

        this.ctx.lineTo(x, y);
        this.ctx.fillText('1', x, y - this.interval / 2);
        this.ctx.lineTo(x, y - this.interval / 2);
        this.ctx.lineTo(x, y + this.interval / 2);
      }

      this.ctx.moveTo(x, y);
      x += this.inteval;
      this.ctx.lineTo(x, y);

      this.ctx.strokeStyle = '#000000';
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: 'drawYCoord',
    value: function drawYCoord() {
      var y = 0.5,
          x = this.width / 2,
          end = this.height;

      this.ctx.beginPath();

      while (y < end) {
        this.ctx.moveTo(x, y);
        y += this.interval;
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x - this.interval / 2, y);
        this.ctx.lineTo(x + this.interval / 2, y);
      }

      this.ctx.moveTo(x, y);
      y += this.interval;
      this.ctx.lineTo(x, y);

      this.ctx.strokeStyle = '#000000';
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: 'drawFunction',
    value: function drawFunction() {
      var steps = 20,
          t = -10,
          a = 5,
          x0Value = (this.width - 0.5) / 2 / this.interval,
          y0Value = (this.height - 0.5) / 2 / this.interval,
          x = a * t * t / (t * t + 1),
          y = a * t * (t * t - 1) / (t * t + 1),
          realX = (x + x0Value) * this.interval,
          realY = this.interval * (y0Value - y);

      this.ctx.beginPath();

      this.ctx.moveTo(realX, realY);
      while (t < steps) {
        x = a * t * t / (t * t + 1);
        y = a * t * (t * t - 1) / (t * t + 1);

        console.log('x:' + x + ' + y:' + y);
        realX = (x + x0Value) * this.interval;
        realY = this.interval * (y0Value - y);
        this.ctx.lineTo(realX, realY);
        t++;
      }

      this.ctx.strokeStyle = "#3E2723";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }]);

  return Drawer;
}();
// NOTE: t from 0 to 2pi, step = 2pi/360
// TODO: add webPack
// TODO: add module
// TODO: add custom width, height,
//# sourceMappingURL=main.js.map
