// import { USERS_API_URL } from '../utils/index';
import Link from 'next/link';
import { useEffect } from 'react';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

function Nav() {
  const currentUser = useUser();

  useEffect(() => {

  }, []);

  return (
    <NavStyles>
      {currentUser && (
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
          <Link href="/account">
            <a>Account</a>
          </Link>
          <Link href="/login">
            <a>Logout</a>
          </Link>
        </>
      )
      }
      {!currentUser && (
        <>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>

        </>
      )}
    </NavStyles>
  )
};

export default Nav;

