import {connect} from 'react-redux';
import {setA, setTMin, setTMax, setColor, setStep} from '../actions/func';
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
            }
        };
};

const mapStateToProps = (state) => {
    var {color} = state.func.options,
        {aValue: a,
        tMinValue: tMin,
        tMaxValue: tMax,
        stepValue: step} = state.func.func;
    return {
        a,
        tMin,
        tMax,
        color,
        step
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Func);
