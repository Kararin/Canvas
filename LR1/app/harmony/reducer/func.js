import Func from '../modules/Func';

export default (state = {func: new Func({
        tMin: 0,
        tMax: 0,
        step: 0.003,
        a: 1
    }),
    options: {
        color: '#000000'
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
                    state.func.tMAxValue = action.tMax;

                    return Object.assign({}, state,
                    {func: state.func});
                },
                SET_F_T_MIN: () => {
                    state.func.tMinValue = action.tMin;

                    return Object.assign({}, state,
                    {func: state.func});
                },
                SET_F_COLOR: () => {
                    return Object.assign({}, state,
                    {options: {
                        color: action.color
                    }});
                },
                'SET_F_INTERVAL': () => {
                    state.func.stepValue = action.step;

                    return Object.assign({}, state,
                    {func: state.func});
                }
            };

        if (actions[action.type]) {
            result = actions[action.type]();
        }

        return result;
};
