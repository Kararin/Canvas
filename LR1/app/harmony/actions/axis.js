export const setAxisColor = (color) => {
    return {
        type: 'SET_AXIS_COLOR',
        color
    };
};

export const setAxisCtx = (ctx) => {
    return {
        type: 'SET_AXIS_CTX',
        ctx
    };
};
