import React from 'react';
import { connect } from 'react-redux';

function Cart({cartProps}) {
    console.log(cartProps)
    return (
        <div>
            <h1>

            </h1>
        </div>
    )
};

const mapStateToProps = state => ({
    cartProps: state.cart
})

export default connect(mapStateToProps)(Cart)