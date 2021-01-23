import React from 'react';
import { connect } from 'react-redux';
import CartStyles from '../components/styles/CartStyles'
import formatMoney from '../utils/formatMoney';
import CartProduct from './CartProduct';


function Cart({ cartProducts, totalPrice}) {

    return (
        <>
           {!cartProducts.length && (
               <h1>Your cart looks pretty empty.</h1>
           )}
           <CartProduct />
           <h2>Your total is: {formatMoney(totalPrice)}</h2>
        </>
    )
};

const mapStateToProps = state => ({
    cartCount: state.cart.cartCount,
    totalPrice: state.cart.totalPrice,
    cartProducts: state.cart.cartProducts
});

export default connect(mapStateToProps)(Cart)