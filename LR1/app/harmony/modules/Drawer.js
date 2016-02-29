import Base from './Base';

export default class Drawer extends Base {
    constructor(options = {
        a: 10,
        tBegin: -4
    }) {
        super(options);
        this.a = options.a;
        this.tBegin = options.tBegin;
        this.tStop = options.tStop;
    }

    drawFunction() {
        var steps = this.tStop,
            t = this.tBegin,
            x0Value = (this.width - 0.5) / 2 / this.interval,
            y0Value = (this.height - 0.5) / 2 / this.interval,
            x = this.a * (t * t - 1)/(t * t + 1),
            y = this.a * t * (t * t - 1) / (t * t + 1),
            realX = (x + x0Value) * this.interval,
            realY = (y0Value - y) * this.interval,
            grade = 3.14 / 360;

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

        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
