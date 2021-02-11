import styled from "styled-components";

export const Logo = styled.h1`
  font-size: 4rem;
  padding: 1rem;
  margin: 1rem;
  a {
    font-family: "Amatic SC", cursive;
    padding: 0.25rem 1rem;
    background: ${(props) => props.theme.darkBlue};
    color: ${(props) => props.theme.offWhite};
    text-decoration: none;
    &:hover {
      background: ${(props) => props.theme.blue};
    }
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

export const StyledHeader = styled.header`
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
