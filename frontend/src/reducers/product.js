import { HYDRATE } from 'next-redux-wrapper';
import { ACTION_TYPES } from '../actions/product';

const initialState = {
    list: []
}

export const product = (state=initialState, action) => {
    switch (action.type) {
        case HYDRATE: 
            return { ...state, ...action.payload };
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            };
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [ ...state.list, action.payload ]
            };
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => 
                    x.id === action.payload.id ? action.payload : x)
            };
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x =>
                    x.id !== action.payload )
            }
        case ACTION_TYPES.PRODUCT_SELECTED: 
            const selectedProduct = state.list.find(
                item => item.id === action.payload
            );
            return {
                ...state, 
                selectedProduct
            }
        default: 
            return state;
    }
}
