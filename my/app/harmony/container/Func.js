import {connect} from 'react-redux';
import {setA, setTMin, setTMax, setColor, setStep, fetchParams} from '../actions/func';
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
            getFuncParams: () => {
                dispatch(fetchParams());
            }
        };
};

const mapStateToProps = (state) => {
    var {color} = state.func.options,
        {a,
        tMin,
        tMax,
        step} = state.func.func;
    return {
        a,
        tMin,
        tMax,
        color,
        step
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Func);
