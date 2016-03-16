import React from 'react';
import Paper from '../base/Paper';
import Content from '../base/Content';

export default ({
    color,
    changeColor
}) => (
    <Paper title = 'Axis'>
        <Content title = 'color:'>
          <input type="color"
                 className="input"
                 defaultValue = {color}
                 onChange = {(e) => {
                     e.preventDefault();
                     changeColor(e.target.value);
                 }}/>
        </Content>
    </Paper>
)
