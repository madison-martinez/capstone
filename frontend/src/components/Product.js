import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import ProductStyles from './styles/ProductStyles';
import formatMoney from '../utils/formatMoney';

export default function Product({ product }) {

  return (
    <ProductStyles>
      <h3>
        <Link
          href={{ pathname: `/product/${product.id}` }}>
          <a>{product.title}</a>
        </Link>
      </h3>
      <p>{product.description}</p>
      <p>{formatMoney(product.price)}</p>
      <div className="button-list">

      {/* TODO: if user is restaurant user, show add to cart button here instead of edit and delete */}

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
    </ProductStyles>
  )
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};