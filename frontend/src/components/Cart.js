import React from "react";
import { connect, useSelector } from "react-redux";
import styled from "styled-components";
import formatMoney from "../utils/formatMoney";
import CartProduct from "./CartProduct";
import { placeOrder } from "../actions/order";
import { clearCart } from "../actions/cart";

const PlaceOrderButton = styled.button`
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
  :disabled {
    cursor: default;
    color: ${(props) => props.theme.offWhite};
    background-color: ${(props) => props.theme.lightGray};

  }
`;

function Cart({ cartProducts, totalPrice, placeOrder, clearCart }) {
  const user = useSelector(state => state.authentication.user);
  
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
          placeOrder({
            products: cartProducts,
            price: totalPrice,
            userId: user.id
          });
          clearCart();
        }}
      >
        Place Order
      </PlaceOrderButton>
    </>
  );
}

const mapStateToProps = (state) => ({
  totalPrice: state.cart.totalPrice,
  cartProducts: state.cart.cartProducts,
});

export default connect(mapStateToProps, { placeOrder, clearCart })(Cart);
