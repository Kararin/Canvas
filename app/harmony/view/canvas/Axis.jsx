import React from 'react';

export default class Axis extends React.Component {
    constructor(props) {
        super(props);

        this.el = null;
    }

    componentDidMount() {
        this.props.setCtx(this.el.getContext('2d'));
    }

    render() {
        var {width, height} = this.props.size;

        if (this.el) {
            this.clear();
            this.drawAxis();
        }

        return (<canvas className = 'my-canvas'
                    width = {width}
                    height = {height}
                    ref = {(el) => {this.el = el;}}>
            </canvas>
        )

    }

    drawAxis() {
        this.drawXCoord();
        // this.drawLabels();
        this.drawYCoord();
    }

    drawXCoord() {
        var {min, max} = this.props.x,
            {height, width} = this.props.size,
            {step, color, ctx} = this.props,
            center = width / 2,
            x = min * step + center,
            y = height / 2,
            end = max * step + center,
            title = Math.round(min) + 1;

        ctx.beginPath();
        ctx.fillStyle = color;

        while (x < end) {
            ctx.moveTo(x, y);
            x += step;

            ctx.lineTo(x, y);
            ctx.fillText(title++, x, y - step / 2);
            ctx.lineTo(x, y - step / 2);
            ctx.lineTo(x, y + step / 2);
        }

        ctx.moveTo(x, y);
        x += step;
        ctx.lineTo(x, y);

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    drawYCoord() {
        var {min, max} = this.props.y,
            {height, width} = this.props.size,
            {step, color, ctx} = this.props,
            center = height / 2,
            y = center - max * step,
            x = width / 2,
            end = center + Math.abs(min) * step,
            title = Math.round(max) - 1;

        ctx.beginPath();
        ctx.fillStyle = color;

        while (y < end) {
            ctx.moveTo(x, y);
            y += step;
            ctx.lineTo(x, y);

            if (title) {
                ctx.fillText(title--, x - step, y);
            } else {
                title--;
            }

            ctx.lineTo(x - step / 2, y);
            ctx.lineTo(x + step / 2, y);
        }

        ctx.moveTo(x, y);
        y += step;
        ctx.lineTo(x, y);

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    drawLabels() {
      this.ctx.fillText('Y', this.width / 2 + this.interval, this.begin + this.interval);
      this.ctx.fillText('X', this.width - this.interval, this.height / 2 + this.interval);

    }

    clear() {
        var {ctx} = this.props,
            {height, width} = this.props.size;

        ctx.clearRect(0, 0, width, width);
    }
}
