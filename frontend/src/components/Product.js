import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteButton from './DeleteButton';
import ProductStyles from './styles/ProductStyles';
import formatMoney from '../utils/formatMoney';


const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
`;

const DetailsStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;

`;

export default function Product({ products, loading }) {
  if(loading) {
    return <p>Loading...</p>
  }
  
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
            <a>Edit Product</a>
          </Link>
          <DeleteButton id={products[i].id} />
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