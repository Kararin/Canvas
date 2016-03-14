import {connect} from 'react-redux';
import {setFIeldColor, setGridColor} from '../actions/field';
import Background from '../view/Background';

const mapDispatchToProps = (dispatch) => {
        return {
            setBGColor: (color) => {
                dispatch(setFIeldColor(color));
            },
            setGridColor: (color) => {
                dispatch(setGridColor(color));
            }
        };
};

const mapStateToProps = (state) => {
    var {bgColor, grColor} = state.field;
    return {
        bgColor, grColor
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
