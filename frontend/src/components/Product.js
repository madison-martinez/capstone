import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import DeleteButton from './DeleteButton';
import ProductStyles from './styles/ProductStyles';
import formatMoney from '../utils/formatMoney';
import { addToCart, getCartCount } from '../actions/cart';

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    }
  .button-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .shopping-cart-icon {
      grid-column-start: 4;
    }
    @media (max-width: 750px) {
      grid-template-columns: auto 1fr;
    }
  }
`;

const DetailsStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;

`;

function Product({ products, loading, addToCart, getCartCount, cartProps }) {

  let items = [];
  for (let i = 0; i < products.length; i++) {
    items.push(
      <ProductStyles key={products[i].id}>
        <h3>
          <Link
            href={{
              pathname: 'product',
              query: { id: products[i].id }
            }}>
            <a>{products[i].title}</a>
          </Link>
        </h3>
        <DetailsStyles>
          <p>{products[i].description}</p>
          <p>{formatMoney(products[i].price)}</p>
        </DetailsStyles>

        <div className="button-list">

          {/* TODO: if user is restaurant user, show add to cart button here instead of edit and delete */}

          <Link
            href={{
              pathname: 'update',
              query: { id: products[i].id },
            }}
          >
            <a>Edit</a>
          </Link>
          <DeleteButton id={products[i].id} />
          <button
            className="shopping-cart-icon"
            type="button"
            id={products[i].id}
            onClick={() => addToCart({
              product: products[i].title,
              id: [i],
              price: products[i].price,
              description: products[i].description,
              quantity: 0,
              image: products[i].image
            })}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>

        </div>
      </ProductStyles>
    )
  }
  return (
    <ProductsList>
      {items}
    </ProductsList>
  )
};

const mapStateToProps = state => ({
  cartProps: state.cart
});

export default connect(mapStateToProps, { addToCart, getCartCount })(Product);