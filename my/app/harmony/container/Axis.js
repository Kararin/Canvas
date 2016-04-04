import {connect} from 'react-redux';
import {setAxisColor} from '../actions/axis';
import Axis from '../view/Axis';

const mapDispatchToProps = (dispatch) => {
        return {
            changeColor: (color) => {
                dispatch(setAxisColor(color));
            }
        };
};

const mapStateToProps = (state) => {
    var {color} = state.axis;

    return {
        color
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Axis);
