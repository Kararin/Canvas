import {createAction}  from 'redux-actions';

export const setAxisColor = createAction('SET_AXIS_COLOR', color => color);

export const setAxisCtx = createAction('SET_AXIS_CTX', ctx => ctx);
