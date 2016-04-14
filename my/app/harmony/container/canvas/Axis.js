import {connect} from 'react-redux';
import {setAxisCtx} from '../../actions/axis';
import Axis from '../../view/canvas/Axis';

const mapStateToProps = (state) => {
    var {color, ctx, points} = state.axis,
        {x, y} = points,
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

export default connect(mapStateToProps, mapDispatchToProps)(Axis);
