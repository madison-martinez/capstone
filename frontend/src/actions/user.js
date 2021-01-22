import { userService } from '../services/user.service';
import { alertActions } from './alert';

export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',
};


function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) {
        return { type: userConstants.LOGIN_REQUEST, user }
    };
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    };
    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error }
    };
};

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
};

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));

                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) {
        return { type: userConstants.REGISTER_REQUEST, user }
    };
    function success(user) {
        return { type: userConstants.REGISTER_SUCCESS, user }
    };
    function failure(error) {
        return { type: userConstants.REGISTER_FAILURE, error }
    };
};

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() {
        return { type: userConstants.GETALL_REQUEST }
    };
    function success(users) {
        return { type: userConstants.GETALL_SUCCESS, users }
    };
    function failure(error) {
        return { type: userConstants.GETALL_FAILURE, error }
    };
};

export const userActions = {
    login,
    logout,
    register,
    getAll
};