import { useSelector } from "react-redux";
import OrderProduct from "./OrderProduct";

function Order() {
  const orderProducts = useSelector((state) => state.order.products);

  return (
    <>
      <h2> Previous Orders </h2>
      {!orderProducts.length && <h3>You haven't placed any orders yet.</h3>}
      <OrderProduct />
    </>
  );
}

export default Order;
