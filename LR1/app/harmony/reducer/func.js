import Func from '../modules/Func';

export default (state = {func: new Func({
        tMin: -2,
        tMax: 3,
        step: 0.012,
        a: 5
    }),
    options: {
        color: '#000000',
        ctx: null
    }},
    action) => {
        var result = state,
            actions = {
                SET_F_A: () => {
                    state.func.aValue = action.a;

                    return Object.assign({}, state,
                    {func: state.func});
                },
                SET_F_T_MAX: () => {
                    state.func.tMaxValue = action.tMax;

                    return Object.assign({}, state,
                    {func: state.func});
                },
                SET_F_T_MIN: () => {
                    state.func.tMinValue = action.tMin;

                    return Object.assign({}, state,
                    {func: state.func});
                },
                SET_F_COLOR: () => {
                    var options = Object.assign({}, state.options, {
                        color: action.color
                    });
                    return Object.assign({}, state, {options});
                },
                SET_F_INTERVAL: () => {
                    state.func.stepValue = action.step;

                    return Object.assign({}, state,
                    {func: state.func});
                },
                SET_F_CTX: () => {
                    var options = Object.assign({}, state.options, {
                        ctx: action.ctx
                    });
                    return Object.assign({}, state, {options});
                }
            };

        if (actions[action.type]) {
            result = actions[action.type]();
        }

        return result;
};
