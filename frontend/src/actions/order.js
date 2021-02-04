export const OrderActionTypes = {
  PLACE_ORDER: "PLACE_ORDER",
};

export const placeOrder = ({ products, price }) => {
  const order = { products, price };
  return (dispatch) => {
    dispatch({
      type: OrderActionTypes.PLACE_ORDER,
      payload: order,
    });
  };
};
