import {handleActions} from 'redux-actions';
import Func from '../modules/Func';

export default handleActions({
    SET_F_A: (state, action) => {
        state.func.aValue = action.a;

        return Object.assign({}, state,
        {func: state.func});
    },
    SET_F_T_MAX: (state, action) => {
        state.func.tMaxValue = action.tMax;

        return Object.assign({}, state,
        {func: state.func});
    },
    SET_F_T_MIN: (state, action) => {
        state.func.tMinValue = action.tMin;

        return Object.assign({}, state,
        {func: state.func});
    },
    SET_F_INTERVAL: (state, action) => {
        state.func.stepValue = action.step;

        return Object.assign({}, state,
        {func: state.func});
    },
    SET_F_COLOR: (state, action) => (
        Object.assign({}, state, {options: options(state.options, action)})
    ),
    SET_F_CTX: (state, action) => (
        Object.assign({}, state, {options: options(state.options, action)})
    ),
    SET_POINTS_READY: (state, action) => (
        Object.assign({}, state, {options: options(state.options, action)})
    )
}, {func: new Func({
        tMin: -2,
        tMax: 3,
        step: 0.012,
        a: 5
    }),
    options: {
        color: '#000000',
        ctx: null,
        pointsReady: false
    }
});

const options = handleActions({
    SET_F_COLOR: (state, action) => {
        return Object.assign({},
            state,
            {color: action.color}
        );
    },
    SET_F_CTX: (state, action) => {
        return Object.assign({},
            state,
            {ctx: action.ctx}
        );
    },
    SET_POINTS_READY: (state, action) => {
        return Object.assign({},
            state,
            {pointsReady: action.pointsReady});
    }
}, {
    color: '#000000',
    ctx: null,
    pointsReady: false
});