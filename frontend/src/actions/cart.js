export const CartActionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  GET_CART_COUNT: "GET_CART_COUNT",
  DELETE_CART_PRODUCT: "DELETE_CART_PRODUCT",
  CLEAR_CART: "CLEAR_CART",
};

export const addToCart = ({
  product,
  id,
  price,
  description,
  quantity,
  image,
}) => {
  const cartProduct = { product, id, price, description, quantity, image };
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: cartProduct,
    });
  };
};

export const getCartCount = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.GET_CART_COUNT,
    });
  };
};

export const deleteCartProduct = ({ id, price }) => {
  const deletedItem = { id, price };
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.DELETE_CART_PRODUCT,
      payload: deletedItem,
    });
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.CLEAR_CART,
    });
  };
};
