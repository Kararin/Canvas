export const setFIeldColor = (color) => {
    return {
        type: 'SET_FIELD_COLOR',
        color
    };
};

export const setGridColor = (color) => {
    return {
        type: 'SET_GRID_COLOR',
        color
    };
};

export const setFieldCtx = (ctx) => {
    return {
        type: 'SET_FIELD_CTX',
        ctx
    };
};
