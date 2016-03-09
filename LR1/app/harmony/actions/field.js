export const setFIeldColor = (color) => {
    return {
        type: 'SET_FIELD_COLOR',
        color
    };
};

export const setFieldCtx = (ctx) => {
    return {
        type: 'SET_FIELD_CTX',
        ctx
    };
};
