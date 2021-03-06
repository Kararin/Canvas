import {
    connect
} from 'react-redux';
import {
    setCtx
} from '../../actions/func';
import Func from '../../view/canvas/Func';

const mapStateToProps = (state) => {
    console.time('func');
    var {
        size,
        step,
        begin
    } = state.common,
        {points} = state.func, {
            ctx,
            color
        } = state.func.options;

    return {
        size,
        step,
        points,
        ctx,
        color,
        begin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCtx: (ctx) => {
            dispatch(setCtx(ctx));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Func);