import {connect} from 'react-redux';
import {setColor, updateParam, fetchParams} from '../actions/func';
import Func from '../view/Func';

const mapDispatchToProps = (dispatch) => {
        return {
            changeColor: (color) => {
                dispatch(setColor(color));
            },
            changeA: (a) => {
                dispatch(updateParam({a}));
            },
            changeTMin: (tMin) => {
                dispatch(updateParam({tMin}));
            },
            changeTMax: (tMax) => {
                dispatch(updateParam({tMax}));
            },
            changeStep: (step) => {
                dispatch(updateParam({step}));
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
