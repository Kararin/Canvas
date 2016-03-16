import {combineReducers} from 'redux';
import common from './common';
import field from './field';
import axis from './axis';
import func from './func';

export default combineReducers({
    common,
    field,
    axis,
    func
});
