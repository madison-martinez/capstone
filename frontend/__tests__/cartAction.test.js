import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions/cart';
import { CartActionTypes as types  } from '../src/actions/cart';
import { fakeItem } from '../src/utils/testUtils';


const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
    cartCount: 0,
    totalPrice: 0, 
    cartProducts: []
};

const cartItem = {
    product: fakeItem(),
    id: 1,
    price: 1,
    description: 'Hello',
    quantity: 1,
    image: ''
}

describe('actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('should create an action to addToCart', () => {
        const expectedAction = [{
            type: types.ADD_TO_CART,
            payload: cartItem
        }]
        return store.dispatch(actions.addToCart(cartItem)).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedAction);
        });
    });

    it('should call the cartCount action', () => {
        const expectedAction = [{
            type: types.GET_CART_COUNT
        }]
        return store.dispatch(actions.getCartCount()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedAction);
        });
    });

    it('should call the clearCart action', () => {
        const expectedAction = [{
            type: types.CLEAR_CART
        }]
        return store.dispatch(actions.clearCart()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedAction);
        });
    });
    // TODO: TEST DELETE CART PRODUCT 
})