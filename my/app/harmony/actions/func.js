export const setA = (a) => ({type: 'SET_F_A', a});

export const setTMin = (tMin) => ({type: 'SET_F_T_MIN', tMin});

export const setTMax = (tMax) => ({type: 'SET_F_T_MAX', tMax});

export const setColor = (color) => ({type: 'SET_F_COLOR', color});

export const setStep = (step) => ({type: 'SET_F_INTERVAL', step});

export const setCtx = (ctx) => ({type: 'SET_F_CTX', ctx});

export const getPoints = (params) => {
    return dispatch => {
        var worker = new Worker('worker.js');

        worker.addEventListener('message', function (e) {
            dispatch(setPoints(e.data));
        });

        worker.postMessage(params);
    };
};

export const setPoints = (points) => ({type: 'SET_POINTS', points});