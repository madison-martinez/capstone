import React from 'react';
import { connect } from 'react-redux';

function Cart({ cartCount, totalPrice, cartProducts }) {
    console.log(cartCount);
    console.log(cartProducts);

    return (
        <div>
           {!cartProducts.length && (
               <h1>Your cart looks pretty empty.</h1>
           )}
        </div>
    )
};

const mapStateToProps = state => ({
    cartCount: state.cart.cartCount,
    totalPrice: state.cart.totalPrice,
    cartProducts: state.cart.cartProducts
});

export default connect(mapStateToProps)(Cart)