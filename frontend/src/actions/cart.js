export const CartActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    GET_CART_COUNT: 'GET_CART_COUNT'
};

export const addToCart = ({product, id, price, description, quantity }) => {
    const cartProduct = {product, id, price, description, quantity};
    console.log(cartProduct)
    return (dispatch) => {
        dispatch({
            type: CartActionTypes.ADD_TO_CART,
            payload: cartProduct
        })
    }
};

export const getCartCount = () => {
    return (dispatch) => {
        console.log('getting cart count')
        dispatch({
            type: CartActionTypes.GET_CART_COUNT
        })
    }
};