import React from 'react';

export default class Field extends React.Component {
    constructor(props) {
        super(props);

        this.el = null;
    }

    componentDidMount() {
        this.props.setCtx(this.el.getContext('2d'));
    }

    render() {
        var {width, height, bgColor} = this.props;

        if (this.el) {
            this.drawGrid();
        }


        return (<canvas className = 'my-canvas'
                    width = {width}
                    height = {height}
                    ref = {(el) => {this.el = el;}}
                    style = {{
                         'background-color':  bgColor
                    }}>
            </canvas>
        )

    }

    drawGrid() {
        var x,
            y, {
                ctx,
                width,
                height,
                step,
                begin,
                grColor
            } = this.props;

        ctx.beginPath();
        ctx.moveTo(0, 0);

        for (x = begin; x < width; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }

        for (y = begin; y < height; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }

        ctx.strokeStyle = grColor;
        ctx.stroke();
        ctx.closePath();
    }
}
