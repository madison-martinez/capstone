import api from './api';


export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH',
    FETCH_BY_ID: 'FETCH'
};

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
};

export const fetchById = (id) => dispatch => {
    //GET REQUEST
    api.product().fetchById(id)
    .then(
        response => {
        dispatch({
            type: ACTION_TYPES.FETCH_BY_ID,
            payload: {...response.data, id}
        })
    })
    .catch(error => console.log(error)); //TODO SHOW ERRORS TO USER
};

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
};

export const update = ( data, id, onSuccess ) => dispatch => {
    //PUT REQUEST
    api.product().update( data, id )
    .then(
        response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { ...data, id }
        })
        onSuccess();
    })
    .catch(error => console.log(error));
};

export const deleteProduct = ( id, onSuccess ) => dispatch => {
    //DELETE REQUEST
    api.product().delete(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess();
    })
    .catch(error => console.log(error));
};