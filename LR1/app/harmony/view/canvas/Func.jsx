import React from 'react';

export default class Func extends React.Component {
    constructor(props) {
        super(props);

        this.el = null;
    }

    componentDidMount() {
        this.props.setCtx(this.el.getContext('2d'));
    }

    render() {
        var {width, height} = this.props.size,
            {color} = this.props;

        if (this.el) {
            this.cleanCanvas();
            this.drawFunction();
        }

        return (<canvas className = 'my-canvas'
                    width = {width}
                    height = {height}
                    ref = {(el) => {this.el = el;}}>
            </canvas>
        )
    }

    drawFunction() {
        var {points, step, ctx, color} = this.props,
            {x, y} = this.getScaledPoints(points, step),
            i = 1;

        ctx.beginPath();

        ctx.moveTo(x[0], y[0]);

        while (x[i]) {
            ctx.lineTo(x[i], y[i]);
            this.drawPointer(x[i], y[i]);
            i++;
        }

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    getScaledPoints(points, step) {
      var {width, height} = this.props.size,
          {begin} = this.props,
          xCenter = (width - begin) / 2,
          yCenter = (height - begin) / 2,
          x0Value = xCenter / step,
          y0Value = yCenter / step,
          scaledPoints = {
            x: [],
            y: []
          };

      points.x.forEach((xValue, index) => {
        scaledPoints.x.push((xValue + x0Value) * step);
        scaledPoints.y.push(step * (y0Value - points.y[index]));
      });

      return scaledPoints;
    }

    cleanCanvas() {
        var {width, height} = this.props.size,
            {ctx} = this.props;

        ctx.clearRect(0, 0, width, height);
    }

    drawPointer(x, y) {
        var {ctx, color} = this.props,
            r = 2;

        ctx.arc(x, y,  r, 0, 2 * Math.PI);
    }
}
