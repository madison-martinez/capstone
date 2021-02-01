import { alertActions as actions } from '../src/actions/alert';
import { alertActionTypes as types } from '../src/actions/alert';

describe('actions', () => {
    it('should create an action to display a success messsage', () => {
        const message = 'Success Message';
        const expectedAction = {
            type: types.SUCCESS,
            message
        }
        expect(actions.success(message)).toEqual(expectedAction)
    });
    it('should create an action to display an error messsage', () => {
        const message = 'Error Message';
        const expectedAction = {
            type: types.ERROR,
            message
        }
        expect(actions.error(message)).toEqual(expectedAction)
    });
    it('should create an action to reset', () => {
        const message = 'ALERT_RESET'
        const expectedAction = {
            type: types.RESET
        }
        expect(actions.reset(message)).toEqual(expectedAction)
    });
})
