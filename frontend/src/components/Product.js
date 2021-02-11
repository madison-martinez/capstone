import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import ProductStyles from "./styles/ProductStyles";
import formatMoney from "../utils/formatMoney";
import * as actions from "../actions/cart";

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  .image {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 1rem;
    h3 {
      a:hover {
        background-color: ${(props) => props.theme.blue};
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .shopping-cart-icon {
      grid-column-start: 2;
      width: 4rem;
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

function Product({ products }) {
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  let items = [];
  
  for (let i = 0; i < products.length; i++) {
    items.push(
      <ProductStyles key={products[i].id}>
        <div className="image">
          <h3>
            <Link
              href={{
                pathname: "product",
                query: { id: products[i].id },
              }}
            >
              <a>{products[i].title}</a>
            </Link>
          </h3>
          {products[i].image && (
            <Image
              src={products[i].image}
              alt={products[i].title}
              width={100}
              height={100}
              layout="fixed"
            />
          )}
        </div>
        <DetailsStyles>
          <p>{products[i].description}</p>
          <p>{formatMoney(products[i].price)}</p>
        </DetailsStyles>

        <div className="button-list">
          {user.role === "farmer" && (
            <>
              <Link
                href={{
                  pathname: "update",
                  query: { id: products[i].id },
                }}
              >
                <a>Edit</a>
              </Link>
              <DeleteButton id={products[i].id} />
            </>
          )}
          {user.role === "restaurant" && (
            <button
              className="shopping-cart-icon"
              type="button"
              id={products[i].id}
              onClick={() =>
                dispatch(actions.addToCart({
                  product: products[i].title,
                  id: [i],
                  price: products[i].price,
                  description: products[i].description,
                  quantity: 0,
                  image: products[i].image,
                }))
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          )}
        </div>
      </ProductStyles>
    );
  }
  return <ProductsList>{items}</ProductsList>;
}

export default Product;
