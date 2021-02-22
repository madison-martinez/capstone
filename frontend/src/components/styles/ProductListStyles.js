import styled from "styled-components";

export const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  .image {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 1rem;
    h3 {
      a:hover {
        background-color: ${(props) => props.theme.blue};
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .shopping-cart-icon {
      grid-column-start: 2;
      width: 4rem;
    }
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailsStyles = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
`;