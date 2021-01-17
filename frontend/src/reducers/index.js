import { combineReducers } from 'redux';
import product from './product';
import { registration } from './registration';
import { alert } from './alert';

export const reducers = combineReducers({
    product,
    alert,
    registration

});

export default reducers;