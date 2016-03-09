export const setSize = ({width, height}) => {
    return {
        type: 'SET_SIZE',
        width, height
    };
};

export const setStep = (step) => {
    return {
        type: 'SET_STEP',
        step
    };
};
