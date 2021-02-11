import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import formatMoney from "../utils/formatMoney";
import * as actions from "../actions/cart";

const CartList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-flow-auto: columns;
  max-width: ${(props) => props.theme.maxWidth};
  button {
    margin-bottom: 2rem;
    font-family: "Josefin Slab", serif;
    font-size: 1.2rem;
    background: ${(props) => props.theme.darkGreen};
    color: ${(props) => props.theme.offWhite};
    padding: 0.5rem 1rem;
    border: none;
    :hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.offWhite};
      color: ${(props) => props.theme.darkGreen};
    }
  }
  div {
    text-align: center;
  }
`;

function CartProduct() {
  const cartCount = useSelector((state) => state.cart.cartCount);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();

  let items = [];
  for (let i = 0; i < cartProducts.length; i++) {
    items.push(
      <div key={cartProducts[i].id + i}>
        {cartProducts[i].image && (
          <Image
            src={cartProducts[i].image}
            alt={cartProducts[i].product}
            width={100}
            height={100}
          />
        )}
        <div>
          <h3>{cartProducts[i].product}</h3>
          <p>{cartProducts[i].description}</p>
          <p>{formatMoney(cartProducts[i].price)}</p>
          <button
            type="button"
            onClick={() => {
              dispatch(
                actions.deleteCartProduct({
                  id: cartProducts[i].id,
                  price: cartProducts[i].price,
                })
              );
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <h3>You have {cartCount} items in your cart!</h3>
      <CartList>{items}</CartList>
    </>
  );
}

export default CartProduct;
