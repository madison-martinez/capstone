import { CartActionTypes } from '../actions/cart';

const initialState = {
    cartCount: 0,
    totalPrice: 0,
    cartProducts: []
}

export function cart(state = initialState, action) {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartCount: (state.cartCount + 1), 
                totalPrice: parseInt(state.totalPrice + action.payload.price),
                cartProducts: [...state.cartProducts, action.payload]
            }
        case CartActionTypes.GET_CART_COUNT:
            return {
                ...state
            }

        default:
            return state;
    }
};