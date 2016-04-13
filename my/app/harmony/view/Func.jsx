import React from 'react';
import Paper from '../base/Paper';
import Content from '../base/Content';

class Func extends React.Component {
    render() {
        var {a,
            tMin,
            tMax,
            color,
            step,
            changeA,
            changeColor,
            changeStep,
            changeTMax,
            changeTMin,
            getPoints,
            getUpdatedParams} = this.props;
        return (
            <Paper title = 'Function'>
                <Content title = 'color:'>
                <input type = "color"
                        className = "input"
                        value = {color}
                        onChange = {(e) => {
                            e.preventDefault();
                            changeColor(e.target.value);
                        }}/>
                </Content>
                <Content>
                    <label>
                        a:
                        <input type = "number"
                        placeholder = "a:"
                        className = "input"
                        value = {a}
                        onChange = {(e) => {
                            var value = +e.target.value;

                            e.preventDefault();

                            changeA(Number(value));
                            getPoints(getUpdatedParams({a: value}));
                        }}/>
                    </label>
                </Content>
                <Content>
                    <label>
                    t min:
                        <input type = "number"
                        placeholder = "t min:"
                        className = "input"
                        value = {tMin}
                        onChange = {(e) => {
                            var value = +e.target.value;

                            e.preventDefault();

                            changeTMin(Number(e.target.value));
                            getPoints(getUpdatedParams({tMin: value}));
                        }}/>
                    </label>
                </Content>
                <Content>
                    <label>
                    t max:
                        <input type = "number"
                        placeholder = "t max:"
                        className = "input"
                        value = {tMax}
                        onChange = {(e) => {
                            var value = +e.target.value;

                            e.preventDefault();

                            changeTMax(Number(e.target.value));
                            getPoints(getUpdatedParams({tMax: value}));
                        }}/>
                    </label>
                </Content>
                <Content>
                    <label>
                    interval:
                        <input type = "number"
                        placeholder = "interval"
                        className = "input"
                        min = "0"
                        value = {step}
                        onChange = {(e) => {
                            var value = +e.target.value;

                            e.preventDefault();

                            changeStep(Number(e.target.value));
                            getPoints(getUpdatedParams({step: value}));
                        }}/>
                    </label>
                </Content>
            </Paper>
        )
    }
}

Func.defaultProps = {
    color: '#FFFFF',
    a: 0,
    tMin: 0,
    tMax: 0,
    step: 0,
    changeColor: console.log('changeColor not implemented'),
    changeA: console.log('changeA not implemented'),
    changeTMin: console.log('cnangeTMin not implemented'),
    changeTMax: console.log('changeTMax not implemented'),
    changeStep: console.log('changeStep not implemented'),
    getFuncParams: console.log('getFuncPatams not implemented')
}

export default Func;