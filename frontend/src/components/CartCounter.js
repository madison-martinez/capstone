import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Counter = styled.div`
  background: ${(props) => props.theme.darkBlue};
  color: ${(props) => props.theme.offWhite};
  border-radius: 50%;
  padding: 0.5rem;
  height: 50px;
  display: block;
`;

const CartCounter = () => {
  const cartCount = useSelector(state => state.cart.cartCount)
  
  return (
    <>
    {cartCount > 0 && <Counter>{cartCount}</Counter>}
    </>
  ) 
};



export default CartCounter;
