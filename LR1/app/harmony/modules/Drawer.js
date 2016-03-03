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
        this.filled = options.filled;
    }

    drawFunction() {
        var steps = 10,
            t = this.tBegin,
            x0Value = (this.width - 0.5) / 2 / this.interval,
            y0Value = (this.height - 0.5) / 2 / this.interval,
            x = this.a * (t * t - 1)/(t * t + 1),
            y = this.a * t * (t * t - 1) / (t * t + 1),
            realX = (x + x0Value) * this.interval,
            realY = (y0Value - y) * this.interval,
            grade = 2 * 3.14 / 360;

        this.ctx.beginPath();

        this.ctx.moveTo(realX, realY);
        while (t < steps) {
            x = this.a * (t * t - 1)/(t * t + 1);
            y = this.a * t * (t * t - 1) / (t * t + 1);
            console.log(`x:${x} + y:${y}`);
            realX = (x + x0Value) * this.interval;
            realY = this.interval * (y0Value - y);
            this.ctx.lineTo(realX, realY);
            t += grade;
        }

        if(this.filled) {
          this.ctx.fillStyle = this.color;
          this.ctx.fill();
        }

        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
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
      this.drawFunction(false);
    }

    get Avalue() {
      return this.a;
    }

    set beginValue(value) {
      this.tBegin = value;
      this.clear();
      this.drawFunction(false);
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
}

//TODO: axis scales depends on graphic
//TODO: markers in points
//TODO: max(t), steps
