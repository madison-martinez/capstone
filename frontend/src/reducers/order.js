import { OrderActionTypes } from "../actions/order";

const initialState = {
  products: [],
};

export function order(state = initialState, action) {
  switch (action.type) {
    case OrderActionTypes.PLACE_ORDER:
      return {
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
}
