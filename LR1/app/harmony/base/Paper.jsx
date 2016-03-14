import React from 'react';

export default ({children, title}) => (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
)
