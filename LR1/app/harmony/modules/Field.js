import Base from './Base';

export default class Field extends Base {
    drawGrid() {
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

    set gridColor(color) {
      this.color = color;

      this.drawGrid();
    }

    get gridColor() {
      return this.color;
    }
}
