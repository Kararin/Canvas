import React from 'react';
import Paper from '../base/Paper';
import Content from '../base/Content';

export default ({
    setBGColor,
    setGridColor,
    bgColor,
    grColor
}) => (
    <Paper title = 'Background'>
        <Content title = 'color:'>
          <input type="color"
                 className="input"
                 defaultValue = {bgColor}
                 onChange = {(e) => {
                     e.preventDefault();
                     setBGColor(e.target.value);
                 }}/>
        </Content>
        <Content title = 'grid color:'>
          <input type="color"
                 className="input"
                 defaultValue = {grColor}
                 onChange = {(e) => {
                     e.preventDefault();
                     setGridColor(e.target.value);
                 }}
                 />
        </Content>
    </Paper>
)

// TODO: something better then onChange
