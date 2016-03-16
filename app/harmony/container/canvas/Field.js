import React from 'react';
import {connect} from 'react-redux';
import Field from '../../view/canvas/Field';
import {setFieldCtx} from '../../actions/field';

const mapStateToProps = (state) => {
    var {
        begin,
        step
    } = state.common,
        {
        grColor,
        bgColor,
        ctx
    } = state.field,
    {
        width,
        height
    } = state.common.size;
    return {
        width,
        height,
        begin,
        step,
        grColor,
        bgColor,
        ctx
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCtx: (ctx) => {
            dispatch(setFieldCtx(ctx));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
