// import { USERS_API_URL } from '../utils/index';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { UseUser } from './User';

function Nav() {
  const me = UseUser();
  return (
    <NavStyles>
      {me && (
        <>
          <Link href="/marketplace">
            <a>Marketplace</a>
          </Link>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
        </>
      )
      }
      {!me && (
        <>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
          <Link href="/account">
            <a>Account</a>
          </Link>
        </>
      )}
    </NavStyles>
  )
};

export default Nav;

