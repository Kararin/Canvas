export default (state = {
    bgColor: '#ffffff',
    grColor: '#ede7e7',
    ctx: null
}, action) => {
    var actions = {
            SET_FIELD_COLOR: () => {
                return Object.assign({}, state, {
                    bgColor: action.color
                });
            },
            SET_FIELD_CTX: () => {
                return Object.assign({}, state, {
                    ctx: action.ctx
                });
            },
            SET_GRID_COLOR: () => {
                return Object.assign({}, state, {
                    grColor:  action.color
                });
            }
        },
        result = state;

    if (actions[action.type]) {
        result = actions[action.type]();
    }

    return result;
};
