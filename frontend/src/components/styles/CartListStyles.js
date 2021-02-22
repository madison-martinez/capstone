import styled from "styled-components";

export const CartList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-flow-auto: columns;
max-width: ${(props) => props.theme.maxWidth};
button {
  margin-bottom: 2rem;
  font-family: "Josefin Slab", serif;
  font-size: 1.2rem;
  background: ${(props) => props.theme.darkGreen};
  color: ${(props) => props.theme.offWhite};
  padding: 0.5rem 1rem;
  border: none;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.offWhite};
    color: ${(props) => props.theme.darkGreen};
  }
}
div {
  text-align: center;
}
`;

export const PlaceOrderButton = styled.button`
  background: ${(props) => props.theme.darkGreen};
  color: ${(props) => props.theme.offWhite};
  font-family: "Josefin Slab", serif;
  font-size: 1.2rem;
  border: none;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.offWhite};
    color: ${(props) => props.theme.darkGreen};
  }
  :disabled {
    cursor: default;
    background-color: ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.offWhite};
  }
`;

export const CartStyles = styled.div`
  a {
    font-size: 2rem;
    &:hover {
      color:  ${(props) => props.theme.blue};
    }
    
  }
  p {
    font-size: 1.5rem;
  }
`;