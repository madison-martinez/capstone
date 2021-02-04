import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 1rem;
  display: flex;
  justify-self: end;
  font-size: 2.5rem;
  a,
  button {
    padding: 1rem 1rem;
    border: none;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 1.2em;
    background: none;
    cursor: pointer;
    color: ${(props) => props.theme.darkBlue};
    @media (max-width: 700px) {
      font-size: 1.2rem;
      padding: 0 0.5rem;
    }
    &:hover {
      color: ${(props) => props.theme.lightGray};
    }
  }
  @media (max-width: 1300px) {
    border-top: 2px solid ${(props) => props.theme.darkBlue};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
