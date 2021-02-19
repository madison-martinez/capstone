import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import formatMoney from "../utils/formatMoney";
import CartProduct from "./CartProduct";
import * as orderActions from "../actions/order";
import * as cartActions from "../actions/cart";

const PlaceOrderButton = styled.button`
  background: ${(props) => props.theme.darkGreen};
  color: ${(props) => props.theme.offWhite};
  font-family: "Josefin Slab", serif;
  font-size: 1.2rem;
  border: none;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.offWhite};
    color: ${(props) => props.theme.darkGreen};
  }
  :disabled {
    cursor: default;
    background-color: ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.offWhite};
  }
`;

function Cart() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <>
      {!cartProducts.length && <h1>Your cart looks pretty empty.</h1>}
      <CartProduct />
      <h2>Your total is: {formatMoney(totalPrice)}</h2>
      <PlaceOrderButton
        disabled={cartProducts.length === 0}
        type="button"
        data-testid="order-button"
        onClick={() => {
          dispatch(
            orderActions.placeOrder({
              products: cartProducts,
              price: totalPrice,
            })
          );
          dispatch(cartActions.clearCart());
        }}
      >
        Place Order
      </PlaceOrderButton>
    </>
  );
}

export default Cart;
