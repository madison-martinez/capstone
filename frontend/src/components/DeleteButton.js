import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/product';

function DeleteButton({ id, deleteProduct}) {
    return (
      <button
        type="button"
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this item?')) {
            deleteProduct(id)
            }
        }}
      > Delete This Item
      </button>
    )
  }
  
  const mapStateToProps = state => ({ productList: state.product.list });

  const mapActionsToProps = { 
      deleteProduct: actions.deleteProduct,
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(DeleteButton);