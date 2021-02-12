import axios from "axios";

const baseUrl = "https://localhost:5001/api/Order";

export const OrderActionTypes = {
  PLACE_ORDER: "PLACE_ORDER",
};

export const placeOrder = ({ products, price, userId }) => {
  const order = { products, price, userId };
  return async (dispatch) => {
    dispatch({
      type: OrderActionTypes.PLACE_ORDER,
      payload: order,
    });
  };
};
