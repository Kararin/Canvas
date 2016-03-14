export default (state = {
    color: '#000000',
    ctx: null
}, action) => {
    var actions = {
        SET_AXIS_CTX: () => {
            return Object.assign({}, state,
            {ctx: action.ctx});
        },
        SET_AXIS_COLOR: () => {
            return Object.assign({}, state,
            {color: action.color});
        }
    },
    result = state;

    if(actions[action.type]) {
        result = actions[action.type]();
    }

    return result;
};
