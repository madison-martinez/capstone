import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { connect } from "react-redux";
import CartCounter from "./CartCounter";

function Nav({ authUser }) {
  return (
    <NavStyles>
      {!authUser && (
        <>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </>
      )}
      {authUser && authUser.role === "farmer" && (
        <>
          <Link href="/marketplace">
            <a>Marketplace</a>
          </Link>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/login">
            <a>Logout</a>
          </Link>
        </>
      )}
      {authUser && authUser.role === "restaurant" && (
        <>
          <Link href="/marketplace">
            <a>Marketplace</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
          <CartCounter />
          <Link href="/login">
            <a>Logout</a>
          </Link>
        </>
      )}
    </NavStyles>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.authentication.user,
});

export default connect(mapStateToProps)(Nav);

export const Test = Nav;
