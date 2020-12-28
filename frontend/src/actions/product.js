import api from './api';

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH'
}

export const fetchAll = () => dispatch => {
    //GET REQUEST
    api.product().fetchAll()
    .then(
        response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    })
    .catch(error => console.log(error)); //TODO SHOW ERRORS TO USER
}

export const create = ( data, onSuccess ) => dispatch => {
    //POST REQUEST
    api.product().create(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data
        })
        onSuccess();
    })
    .catch(error => console.log(error));
}

export const update = ( data, id, onSuccess ) => dispatch => {
    //PUT REQUEST
    api.product().update( data, id )
    .then(response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { ...data, id }
        })
        onSuccess();
    })
    .catch(error => console.log(error));
}

export const deleteProduct = ( id, onSuccess ) => dispatch => {
    //DELETE REQUEST
    api.product().update(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess();
    })
    .catch(error => console.log(error));
}