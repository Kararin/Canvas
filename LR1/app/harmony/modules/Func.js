export default class Func {
    constructor({tMin = 0, tMax = 0, step = 1, a = 1}) {
        this.a = a;
        this.tMax = tMax;
        this.tMin = tMin;
        this.step = step;
        this.points = {
          x: [],
          y: []
        };
    }

    get extremymX() {
      var result = null,
          {x} = this.points;

      if (x.length) {
        result = {
          min:  Math.min(...x),
          max: Math.max(...x)
        };
      }

      return result;
    }

    get extremymY() {
      var result = null,
          {y} = this.points;

      if (y.length) {
        result = {
          min: Math.min(...y),
          max: Math.max(...y)
        };
      }

      return result;
    }

    set aValue(value) {
      this.a = value;
    }

    get aValue() {
      return this.a;
    }

    set tMinValue(value) {
      this.iMin = value;
    }

    get tMinValue() {
      return this.tMin;
    }

    set tMaxValue(value) {
        this.tMAx = value;
    }

    get tMaxValue() {
        return this.tMAx;
    }

    set stepValue(value) {
        this.step = value;
    }

    get stepValue() {
        return this.step;
    }

    get pointsValues() {
        this.cleanPoints();
        this.calcPoints();
        return Object.assign({}, this.points);
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

    calcPoints() {
      var t = this.tMin;

      this.cleanPoints();

      while (t < this.tMax) {
        let {x, y} = this.countXY(t);
        this.points.x.push(x);
        this.points.y.push(y);
        t += this.step;
      }
    }
}
