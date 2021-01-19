export const CartActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    GET_CART_COUNT: 'GET_CART_COUNT'
};

export const addToCart = () => {
    return (dispatch) => {
        console.log('adddingggg')
        dispatch({
            type: CartActionTypes.ADD_TO_CART
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
}