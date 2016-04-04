export const setA = (a) => {
    return {
        type: 'SET_F_A',
        a
    };
};

export const setTMin = (tMin) => {
    return {
        type: 'SET_F_T_MIN',
        tMin
    };
};

export const setTMax = (tMax) => {
    return {
        type: 'SET_F_T_MAX',
        tMax
    };
};

export const setColor = (color) => {
    return {
        type: 'SET_F_COLOR',
        color
    };
};

export const setStep = (step) => {
    return {
        type: 'SET_F_INTERVAL',
        step
    };
};

export const setCtx = (ctx) => {
    return {
        type: 'SET_F_CTX',
        ctx
    };
};

export const fetchParams = () => {
    return dispatch => {
        return fetch('/func/params')
            .then(response => response.json())
            .then(json => dispatch(setParams(json)));
    };
};

export const setParams = (params) => {
    return {
        type: 'SET_PARAMS',
        params
    };
};
