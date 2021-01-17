import { alertActionTypes } from '../actions/alert';

export function alert(state = {}, action) {
    console.log(action.type)
    switch(action.type) {
        case alertActionTypes.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertActionTypes.ERROR: 
            return {
                type: 'alert-danger',
                message: action.message
            }
        default: 
            return state;
    }
};