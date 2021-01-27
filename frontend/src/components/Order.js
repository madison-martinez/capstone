import { connect } from 'react-redux';
import OrderProduct from './OrderProduct';

function Order({ orderProducts }) {

    return (
        <>
        <h2> Previous Orders </h2>
        {!orderProducts.length && (
            <h3>You haven't placed any orders yet.</h3>
        )}
        <OrderProduct />
        </>
    )
};

const mapStateToProps = state => ({
    orderProducts: state.order.products,
});

export default connect(mapStateToProps)(Order);