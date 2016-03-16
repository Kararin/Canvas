import React from 'react';
import Paper from '../base/Paper';
import Content from '../base/Content';

export default ({
    color,
    a,
    tMin,
    tMax,
    step,
    changeColor,
    changeA,
    changeTMin,
    changeTMax,
    changeStep
}) => (
    <Paper title = 'Function'>
        <Content title = 'color:'>
          <input type = "color"
                 className = "input"
                 onChange = {(e) => {
                     e.preventDefault();
                     changeColor(e.target.value)
                 }}/>
        </Content>
        <Content>
            <label>
                a:
                <input type = "number"
                   placeholder = "a:"
                   className = "input"
                   defaultValue = {a}
                   onChange = {(e) => {
                       e.preventDefault();
                       changeA(Number(e.target.value))
                   }}/>
            </label>
        </Content>
        <Content>
            <label>
               t min:
                <input type = "number"
                   placeholder = "t min:"
                   className = "input"
                   defaultValue = {tMin}
                   onChange = {(e) => {
                       e.preventDefault();
                       changeTMin(Number(e.target.value))
                   }}/>
            </label>
        </Content>
        <Content>
            <label>
               t max:
                <input type = "number"
                   placeholder = "t max:"
                   className = "input"
                   defaultValue = {tMax}
                   onChange = {(e) => {
                       e.preventDefault();
                       changeTMax(Number(e.target.value))
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
                   defaultValue = {step}
                   onChange = {(e) => {
                       e.preventDefault();
                       changeStep(Number(e.target.value))
                   }}/>
            </label>
        </Content>
    </Paper>
)
