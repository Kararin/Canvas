  document.addEventListener("DOMContentLoaded", () => {
    let drawer = new Drawer({
      elementId: 'func'
    });

    drawer.drawGrid();
    drawer.drawCoord();

    drawer.drawFunction();
  });

  class Drawer {
    constructor({
      width = 1000,
      height = 800,
      elementId,
      interval = 20
    }) {
      this.el = document.getElementById(elementId);
      this.ctx = this.el.getContext('2d');
      this.width = 1000;
      this.height = 800;
      this.interval = interval;
    }

    drawGrid() {
      this.ctx.beginPath();

      this.ctx.moveTo(0,0);

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

    drawCoord() {
      this.drawXCoord();
      this.drawYCoord();
    }

    drawXCoord() {
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

    drawYCoord() {
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

    drawFunction () {
      var steps = 20,
          t = -10,
          a = 5,
          x0Value = (this.width - 0.5)/2/this.interval,
          y0Value = (this.height - 0.5)/2/this.interval,
          x = a * t * t/(t * t + 1),
          y = a * t* (t * t - 1)/(t * t + 1),
          realX = (x + x0Value) * this.interval,
          realY = this.interval * (y0Value - y);

      this.ctx.beginPath();

      this.ctx.moveTo(realX, realY);
      while (t < steps) {
         x = a * t * t/(t * t + 1);
         y = a * t* (t * t - 1)/(t * t + 1);

         console.log(`x:${x} + y:${y}`);
         realX = (x + x0Value) * this.interval;
         realY = this.interval * (y0Value - y);
         this.ctx.lineTo(realX, realY);
         t++;

       }

      this.ctx.strokeStyle = "#3E2723";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
  // NOTE: t from 0 to 2pi, step = 2pi/360
  // TODO: add webPack
  // TODO: add module
 // TODO: add custom width, height,
