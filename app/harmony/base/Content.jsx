import React from 'react';

export default ({children, title}) => (
    <div className = 'content'>
        <span className= 'myTitle'>
            {title}
        </span>
        {children}
    </div>
)
