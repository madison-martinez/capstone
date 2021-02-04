import { connect } from "react-redux";
import styled from "styled-components";
import formatMoney from "../utils/formatMoney";

const OrderList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const OrderItemStyles = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  border: 1px solid ${(props) => props.theme.blue};
  margin: 0 auto;
  p {
    margin: 1rem;
  }
`;

function OrderProduct({ orderProducts, price }) {
  let orders = [];
  for (let i = 0; i < orderProducts.length; i++) {
    orders.push(
      <OrderItemStyles>
        <p>
          {orderProducts[i].products.map((item, index) => {
            return <li key={index}>{item.product}</li>;
          })}
        </p>
        <p className="align">Total: {formatMoney(orderProducts[i].price)}</p>
      </OrderItemStyles>
    );
  }
  return <OrderList>{orders}</OrderList>;
}

const mapStateToProps = (state) => ({
  orderProducts: state.order.products,
  price: state.order.products,
});

export default connect(mapStateToProps)(OrderProduct);
