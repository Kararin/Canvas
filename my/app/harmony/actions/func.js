export const setA = (a) => ({type: 'SET_F_A', a});

export const setTMin = (tMin) => ({type: 'SET_F_T_MIN', tMin});

export const setTMax = (tMax) => ({type: 'SET_F_T_MAX', tMax});

export const setColor = (color) => ({type: 'SET_F_COLOR', color});

export const setStep = (step) => ({type: 'SET_F_INTERVAL', step});

export const setCtx = (ctx) => ({type: 'SET_F_CTX', ctx});

export const setPointsReady = (pointsReady) => ({type: 'SET_POINTS_READY', pointsReady});

export const fetchParams = () => {
    return dispatch => {
        fetch('/func/params/')
            .then(response => response.json())
            .then(json => {dispatch(setParams(json));});
    };
};

export const setParams = (params) => ({type: 'SET_PARAMS', params});

export const updateParam = (param) => {
    return dispatch => {
        fetch('/func/updateParam', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({param})
        })
        .then(response => response.json())
        .then(json => {
            dispatch(setParams(json));
            dispatch(getPoints());});
    };
};

export const getPoints = () => {
    return dispatch => {
        fetch('/func/getPoints')
        .then(response => response.json())
        .then(json => dispatch(setPoints(json)));
    };
};

export const setPoints = (points) => ({type: 'SET_POINTS', points});