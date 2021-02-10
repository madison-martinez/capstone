import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions/product";

export const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();
 
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm("Are you sure you want to delete this item?")) {
          dispatch(actions.deleteProduct(id));
        }
      }}
    >
      {" "}
      Delete
    </button>
  );
};

export default DeleteButton;
