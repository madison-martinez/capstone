import { combineReducers } from 'redux';
import product from './product';
import { registration } from './registration';
import { alert } from './alert';
import { cart } from './cart';

export const reducers = combineReducers({
    product,
    alert,
    registration,
    cart
});

export default reducers;