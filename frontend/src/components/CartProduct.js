import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import formatMoney from "../utils/formatMoney";
import * as actions from "../actions/cart";
import { CartList } from "./styles/CartListStyles";


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
      <h3>You have {cartCount} {cartCount > 1 ? 'items' : 'item'} in your cart!</h3>
      <CartList>{items}</CartList>
    </>
  );
}

export default CartProduct;
