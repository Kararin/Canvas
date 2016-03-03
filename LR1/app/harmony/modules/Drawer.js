import Base from './Base';

export default class Drawer extends Base {
    constructor(options = {
        a: 10,
        tBegin: -4,
        filled: false
    }) {
        super(options);
        this.a = options.a;
        this.tBegin = options.tBegin;
        this.tFinish = options.tFinish;
        this.filled = options.filled;
        this.step = options.step;
        this.points = {
          x: [],
          y: []
        };
    }

    drawFunction() {
        this.calcPoints();
        var {x, y} = this.getScaledPoints(),
            i = 1;

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

    calcPoints() {
      var t = this.tBegin;

      this.cleanPoints();

      while (t < this.tFinish) {
        let {x, y} = this.countXY(t);
        this.points.x.push(x);
        this.points.y.push(y);
        t +=this.step;
      }
    }

    getScaledPoints() {
      var xCenter = (this.width - this.begin) / 2,
          yCenter = (this.height - this.begin) / 2,
          x0Value = xCenter / this.interval,
          y0Value = yCenter / this.interval,
          scaledPoints = {
            x: [],
            y: []
          };

      this.points.x.forEach((xValue, index) => {
        scaledPoints.x.push((xValue + x0Value) * this.interval);
        scaledPoints.y.push(this.interval * (y0Value - this.points.y[index]));
      });

      return scaledPoints;
    }

    cleanPoints() {
      this.points = {
        x: [],
        y: []
      };
    }

    countXY(t) {
      return {
        x: this.a * (t * t - 1)/(t * t + 1),
        y: this.a * t * (t * t - 1) / (t * t + 1)
      };
    }

    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    set chartColor(color) {
      this.color = color;
      this.drawFunction();
    }

    get chartColor() {
      return this.color;
    }

    set Avalue(value) {
      this.a = value;
      this.clear();
      this.drawFunction();
    }

    get Avalue() {
      return this.a;
    }

    set beginValue(value) {
      this.tBegin = value;
      this.clear();
      this.drawFunction();
    }

    get beginValue() {
      return this.tBegin;
    }

    set isFilled(value) {
      this.filled = value;
      this.clear();
      this.drawFunction();
    }

    get isFilled() {
      return this.filled;
    }

    get extremymX() {
      var result = null;

      if (this.points.x.length) {
        result = {
          min:  Math.min(...this.points.x),
          max: Math.max(...this.points.x)
        };
      }

      return result;
    }

    get extremymY() {
      var result = null;

      if (this.points.y.length) {
        result = {
          min: Math.min(...this.points.y),
          max: Math.max(...this.points.y)
        };
      }

      return result;
    }
}

//TODO: axis scales depends on graphic
//TODO: markers in points
//TODO: max(t), steps
