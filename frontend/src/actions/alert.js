export const alertActionTypes = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    RESET: 'ALERT_RESET'
};

function success(message) {
    return {
        type: alertActionTypes.SUCCESS,
        message
    }
};

function error(message) {
    return {
        type: alertActionTypes.ERROR,
        message
    }
};

function reset() {
    return {
        type: alertActionTypes.RESET
    }
};


export const alertActions = {
    success,
    error,
    reset
};

