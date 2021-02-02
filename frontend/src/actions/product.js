import api from './api';


export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH',
    FETCH_BY_ID: 'FETCH'
};

export const fetchAll = () => {
    return async dispatch => {
        //GET REQUEST
        return api.product().fetchAll()
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_ALL,
                        payload: response.data
                    })
                })
            .catch(error => console.log(error));
    }; //TODO SHOW ERRORS TO USER
};

export const fetchById = (id) => {
    return async dispatch => {
        return api.product().fetchById(id)
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_BY_ID,
                        payload: { ...response.data, id }
                    })
                })
            .catch(error => console.log(error));
    }
};

export const create = (data, onSuccess) => {
    return async dispatch => {
        //POST REQUEST
        return api.product().create(data)
            .then(response => {
                dispatch({
                    type: ACTION_TYPES.CREATE,
                    payload: response.data
                })
            })
            .catch(error => {
                throw error
            });
    };
};

export const update = (data, id, onSuccess) => {
    return async dispatch => {
        //PUT REQUEST
        return api.product().update(data, id)
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.UPDATE,
                        payload: { ...data, id }
                    })
                    onSuccess();
                })
            .catch(error => console.log(error));
    }
};

export const deleteProduct = (id, onSuccess) => {
    return async dispatch => {
        //DELETE REQUEST
        return api.product().delete(id)
            .then(response => {
                dispatch({
                    type: ACTION_TYPES.DELETE,
                    payload: id
                })
                onSuccess();
            })
            .catch(error => console.log(error));
    }
};