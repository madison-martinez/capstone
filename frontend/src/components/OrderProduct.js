import { connect } from 'react-redux';
import styled from 'styled-components';
import formatMoney from '../utils/formatMoney';

const OrderList = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const OrderItem = styled.ul`

`;  

function OrderProduct({ orderProducts, price }) {
    let orders = [];
    for (let i = 0; i < orderProducts.length; i++) {
        orders.push(
            <OrderItem>
                <ul>
                    {orderProducts[i].products.map((item, index) => {
                        return(
                        <li key={index}>{item.product}</li>
                        ) 
                    })}
                </ul>
                <p>Your order total: {formatMoney(orderProducts[i].price)}</p>
            </OrderItem>
        )
    }
    return (
        <OrderList>
            {orders}
        </OrderList>
    )
};

const mapStateToProps = state => ({
    orderProducts: state.order.products,
    price: state.order.products
});

export default connect(mapStateToProps)(OrderProduct);