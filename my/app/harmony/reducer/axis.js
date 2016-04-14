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
    },
    SET_EXTREMUM: (state, {points}) => Object.assign({}, state, {points})
}, {
    color: '#000000',
    ctx: null,
    points: {
        x: {
            max: 0,
            min: 0
        },
        y: {
            max: 0,
            min: 0
        }
    }
});