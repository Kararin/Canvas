import {connect} from 'react-redux';
import {
    setColor,
    setA,
    setTMax,
    setTMin,
    setStep,
    getPoints} from '../actions/func';
import Func from '../view/Func';

const mapDispatchToProps = (dispatch) => {
        return {
            changeColor: (color) => {
                dispatch(setColor(color));
            },
            changeA: (a) => {
                dispatch(setA(a));
            },
            changeTMin: (tMin) => {
                dispatch(setTMin(tMin));
            },
            changeTMax: (tMax) => {
                dispatch(setTMax(tMax));
            },
            changeStep: (step) => {
                dispatch(setStep(step));
            },
            getPoints: (points) => {
                dispatch(getPoints(points));
            }
        };
};

const mapStateToProps = (state) => {
    var {color} = state.func.options,
        {a,
        tMin,
        tMax,
        step} = state.func.func,
        options = state.func.func,
        getUpdatedParams = options => newOption => (
            Object.assign({},
                options,
                newOption)
        );
    return {
        a,
        tMin,
        tMax,
        color,
        step,
        getUpdatedParams: getUpdatedParams(options)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Func);
