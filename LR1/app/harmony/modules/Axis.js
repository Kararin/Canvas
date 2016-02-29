import Base from './Base';

export default class Coord extends Base {
    constructor(options) {
        super(options);
        this.font = options.font;
        this.labelColor = options.labelColor;
    }

    drawCoord() {
        this.drawXCoord();
        this.drawYCoord();
        this.drawLabels();
    }

    drawXCoord() {
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

    drawYCoord() {
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

    drawLabels() {
      this.ctx.fillText('Y', this.width / 2 + this.interval, this.begin + this.interval);
      this.ctx.fillText('X', this.width - this.interval, this.height / 2 + this.interval);

    }

    set axisColor(color) {
      this.color = color;
      this.drawCoord();
    }

    get axisColor() {
      return this.color;
    }

    set labelsColor(color) {
      this.labelColor = color;
      this.drawCoord();
    }

    get labelsColor() {
      return this.labelColor;
    }
}
