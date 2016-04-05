import {handleActions} from 'redux-actions';

export default handleActions({
    SET_AXIS_CTX: (state, {ctx}) => {
        return Object.assign({}, state, {
            ctx
        });
    },
    SET_AXIS_COLOR: (state, {color}) => {
        return Object.assign({}, state, {
            color
        });
    }
}, {
    color: '#000000',
    ctx: null
});