import { combineReducers } from 'redux';
import product from './product';
import { registration } from './registration';
import { alert } from './alert';
import { cart } from './cart';
import { authentication } from './authentication';

export const reducers = combineReducers({
    product,
    alert,
    registration,
    cart,
    authentication
});

export default reducers;