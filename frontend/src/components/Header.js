import Link from "next/link";
import Nav from "./Nav";
import { Logo, StyledHeader } from './styles/HeaderStyles';


const Header = () => (
  <StyledHeader>
    <div className="header">
      <Logo>
        <Link href="/">
          <a>Farmer's Special</a>
        </Link>
      </Logo>
      <Nav />
    </div>
  </StyledHeader>
);

export default Header;
