import React from 'react';

export default class Canvas {
    componentDidMount() {
        var bgEl = document.getElementById('background'),
            funcEl = document.getElementById('func');

        this.props.setContext(bgEl, funcEl);
    }

    render() {
        return (
            <div class = 'canvases'>
              <canvas className='my-canvas' id="background" width="1000" height="800"></canvas>
              <canvas className='my-canvas ' id="func" width="1000" height="800"></canvas>
            </div>
        )
    }
}
