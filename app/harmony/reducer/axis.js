import {handleActions} from 'redux-actions';

export default handleActions({
    SET_AXIS_CTX: (state, {payload}) => {
        return Object.assign({}, state, {
            ctx: payload
        });
    },
    SET_AXIS_COLOR: (state, {payload}) => {
        return Object.assign({}, state, {
            color: payload
        });
    }
}, {
    color: '#000000',
    ctx: null
});