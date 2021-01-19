import { CartActionTypes } from '../actions/cart';

const initialState = {
    cartCount: 0
}

export function cart(state = initialState, action) {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            return {
                cartCount: state.cartCount + 1
            }
        case CartActionTypes.GET_CART_COUNT:
            return {
                ...state
            }

        default:
            return state;
    }
};