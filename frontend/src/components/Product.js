import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export default function Product({ product }) {
  const onDelete = id => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      
    }
  }
  return (
    <div>
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Link
        href={{
          pathname: 'update',
          query: { id: product.id },
        }}
      >
        <a>Edit Product</a>
      </Link>
        <DeleteButton id={product.id} />
    </div>
  )
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};