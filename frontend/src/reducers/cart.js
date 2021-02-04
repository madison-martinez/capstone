import { CartActionTypes } from "../actions/cart";

const initialState = {
  cartCount: 0,
  totalPrice: 0,
  cartProducts: [],
};

export function cart(state = initialState, action) {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartCount: state.cartCount + 1,
        totalPrice: state.totalPrice + action.payload.price,
        cartProducts: [...state.cartProducts, action.payload],
      };
    case CartActionTypes.GET_CART_COUNT:
      return {
        ...state,
      };
    case CartActionTypes.DELETE_CART_PRODUCT:
      return {
        ...state,
        cartCount: state.cartCount - 1,
        totalPrice: state.totalPrice - action.payload.price,
        cartProducts: state.cartProducts.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartProducts: [],
        cartCount: 0,
        totalPrice: 0,
      };
    default:
      return state;
  }
}
