import {connect} from 'react-redux';
import {setAxisCtx} from '../../actions/axis';
import Axis from '../../view/canvas/Axis';

const mapStateToProps = (state) => {
    var {color, ctx} = state.axis,
        {points} = state.func,
        x = getExtremym(points.x),
        y = getExtremym(points.y),
        {step, size} = state.common;

    return {
        color,
        x,
        y,
        step,
        size,
        ctx
    };
};

const mapDispatchToProps = (dispatch) => {
        return {
            setCtx: (ctx) => {
                dispatch(setAxisCtx(ctx));
            },
        };
};

const getExtremym = (points) => {
    var result = null;

    if (points.length) {
        result = {
            min: Math.min(...points),
            max: Math.max(...points)
        };
    } else {
        result = {
            min: 0,
            max: 0
        };
    }

    return result;
};
export default connect(mapStateToProps, mapDispatchToProps)(Axis);
