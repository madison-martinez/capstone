import Link from 'next/link';
import styled from 'styled-components';
import Nav from "./Nav";


const Logo = styled.h1`
    font-size: 4rem;
    padding: 1rem;
    margin: 1rem;
    a {
        font-family: 'Amatic SC', cursive;
        padding: 0.25rem 1rem;
        background: ${props => props.theme.darkBlue};
        color: ${props => props.theme.offWhite};
        text-decoration: none;
        &:hover {
            background: ${props => props.theme.blue};
        }
    }
    
    @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`;

const StyledHeader = styled.header`
    .header {
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: 1300px) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }
    .sub-header {
        display: grid;
        grid-template-columns: 1fr auto;
    }
`;

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
        <div className="sub-header">
            <p>Search</p>
        </div>
        <div>
            <p>CART OR ACTIVE LISTINGS</p>
        </div>
    </StyledHeader>
);

export default Header;