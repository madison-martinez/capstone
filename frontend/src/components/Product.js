import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Product({ product }) {

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
        </div>
    )
};

Product.propTypes = {
    product: PropTypes.object.isRequired
};