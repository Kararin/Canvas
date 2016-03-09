export default (state = {
    color: '#afa9a9',
    ctx: null
}, action) => {
    var actions = {
            'SET_FIELD_COLOR': () => {
                return Object.assign({}, state, {
                    color: action.color
                });
            },
            'SET_FIELD_CTX': () => {
                return Object.assign({}, state, {
                    ctx: action.ctx
                });
            }
        },
        result = state;

    if (actions[action.type]) {
        result = actions[action.type]();
    }

    return result;
};
