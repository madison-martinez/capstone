import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import formatMoney from "../utils/formatMoney";
import CartProduct from "./CartProduct";
import * as orderActions from "../actions/order";
import * as cartActions from "../actions/cart";
import { CartStyles, PlaceOrderButton } from "./styles/CartListStyles";



function Cart() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <CartStyles>
      {!cartProducts.length && (
        <>
          <h1>Your cart looks pretty empty.</h1>
          <p>Let's fix that!</p>
          <Link href="/marketplace">
            <a>Marketplace</a>
          </Link>
        </>
      )}

      {cartProducts.length > 0 && (
        <>
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
      )}
    </CartStyles>
  );
}

export default Cart;
