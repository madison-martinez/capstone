import * as actions from '../src/actions/cart';
import { CartActionTypes as types } from '../src/actions/alert';

describe('actions', () => {
    it('should create an action to addToCart', () => {
        const payload = 'cartProduct';
        const expectedAction = {
            type: types.ADD_TO_CART,
            payload
        }
        expect(actions.addToCart(payload)).toEqual(expectedAction)
    });

    it('should get the cart count', () => {
        const payload = {};
        const expectedAction = (dispatch) => {
            dispatch({
                type: types.GET_CART_COUNT,
                payload
            })
            
        }
        expect(actions.getCartCount(payload)).toEqual(expectedAction)
    })
})