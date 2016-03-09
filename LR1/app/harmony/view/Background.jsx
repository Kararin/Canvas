import React from 'react';
import Paper from '../base/Paper';
import Content from '../base/Content';

export default () => (
    <Paper title = 'Background'>
        <Content title = 'color:'>
          <input type="color" className="input" id="backgroundColor" />
        </Content>
        <Content title = 'grid color:'>
          <input type="color" className="input" id="gridColor" />
        </Content>
    </Paper>
)
