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
            // this.drawFunction();
        }

        return( <canvas
                    className = 'my-canvas'
                    width = {width}
                    height = {height}
                    ref = {(el) => {this.el = el;}}>
            </canvas>
        )
    }

    drawFunction() {
        var {points, ctx, color} = this.props,
            {x, y} = points,
            i = 1;

        ctx.beginPath();

        ctx.moveTo(this.scaleX(x[0]), this.scaleY(y[0]));

        while (x[i]) {
            let tempX = this.scaleX(x[i]),
                tempY = this.scaleY(y[i]);

            ctx.lineTo(tempX, tempY);
            this.drawPointer(tempX, tempY);

            i++;
        }

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();

        console.timeEnd('func');
    }

    scaleX(x) {
        var {width} = this.props.size,
            {begin, step} = this.props,
            xCenter = (width - begin) / 2,
            x0Value = xCenter / step;

        return (x + x0Value) * step;
    }

    scaleY(y) {
        var {height} = this.props.size,
            {begin, step} = this.props,
            yCenter = (height - begin) / 2,
            y0Value = yCenter / step;

        return (y0Value - y) * step;
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


