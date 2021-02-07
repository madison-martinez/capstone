import api from "./api";
import { alertActions } from "./alert";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH",
  FETCH_BY_ID: "FETCH_BY_ID",
};

export const fetchAll = () => {
  return async (dispatch) => {
    //GET REQUEST
    return api
      .product()
      .fetchAll()
      .then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data,
          });
        },
        (error) => {
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
};

export const fetchById = (id) => {
  return async (dispatch) => {
    return api
      .product()
      .fetchById(id)
      .then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.FETCH_BY_ID,
            payload: { ...response.data, id },
          });
        },
        (error) => {
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
};

export const create = (data, handleOnSuccess) => {
  return async (dispatch) => {
    if (parseInt(data.price) <= 0 || parseInt(data.price) > 10000) {
      const error = "Price must be between $1.00 and $10,000";
      return dispatch(alertActions.error(error));
    } else {
      //POST REQUEST
      return api
        .product()
        .create(data)
        .then(
          (response) => {
            dispatch({
              type: ACTION_TYPES.CREATE,
              payload: response.data,
            });
            handleOnSuccess();
          },
          (error) => {
            dispatch(alertActions.error(error.toString()));
          }
        );
    }
  };
};

export const update = (data, id) => {
  return async (dispatch) => {
    //PUT REQUEST
    return api
      .product()
      .update(data, id)
      .then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: { ...data, id },
          });
        },
        (error) => {
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    //DELETE REQUEST
    return api
      .product()
      .delete(id)
      .then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id,
          });
        },
        (error) => {
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
};
