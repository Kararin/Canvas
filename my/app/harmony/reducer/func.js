import Func from '../modules/Func';

export default (state = {
        func: {
            tMin: 0,
            tMax: 0,
            step: 0,
            a: 0
        },
        options: {
            color: '#000000',
            ctx: null
        }
    },
    action) => {
    var result = state,
        actions = {
            SET_F_A: () => {
                return Object.assign({}, state, {
                    func: params(state.func, action)
                });
            },
            SET_F_T_MAX: () => {
                return Object.assign({}, state, {
                    func: params(state.func, action)
                });
            },
            SET_F_T_MIN: () => {
                return Object.assign({}, state, {
                    func: params(state.func, action)
                });
            },
            SET_F_COLOR: () => {
                var options = Object.assign({}, state.options, {
                    color: action.color
                });
                return Object.assign({}, state, {
                    options
                });
            },
            SET_F_INTERVAL: () => {
                return Object.assign({}, state, {
                    func: params(state.func, action)
                });
            },
            SET_F_CTX: () => {
                var options = Object.assign({}, state.options, {
                    ctx: action.ctx
                });
                return Object.assign({}, state, {
                    options
                });
            },
            SET_PARAMS: () => {
                return Object.assign({}, state, {
                    func: action.params
                });
            }
        };

    if (actions[action.type]) {
        result = actions[action.type]();
    }

    return result;
};

const params = (state = {
    tMin: 0,
    tMax: 0,
    step: 0,
    a: 0
}, action) => {
    var actions = {
            SET_F_A: (state, action) => {
                return Object.assign({}, state, {
                    a: action.a
                });
            },
            SET_F_T_MAX: (state, action) => {
                return Object.assign({}, state, {
                    tMax: action.tMax
                });
            },
            SET_F_T_MIN: (state, action) => {
                return Object.assign({}, state, {
                    tMin: action.tMin
                });
            },
            SET_F_INTERVAL: (state, action) => {
                return Object.assign({}, state, {
                    step: action.step
                });
            },
        },
        result = state;

    if (actions[action.type]) {
        result = actions[action.type]();
    }

    return result;
};