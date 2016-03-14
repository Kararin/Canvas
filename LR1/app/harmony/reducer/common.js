export default (state = {
    size: {
        width: 1000,
        height: 800
    },
    step: 20,
    begin: 0.5
}, action) => {
    var actions = {
        'SET_SIZE': () => {
            return Object.assign({}, state, {
                width: action.width,
                height: action.height
            });
        },
        'SET_STEP': () => {
            return Object.assign({}, state, {
                size: action.size
            });
        },
        'SET_BEGIN': () => {
            return Object.assign({}, state, {
                begin: action.begin
            });
        }
    },
        result = state;

        if (action[action.type]) {
            result = action[action.type]();
        }

    return result;
};
