import styled from "styled-components";

export const GalleryStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  .text-center {
    text-align: center;
  }
  .buttons-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    font-size: 2rem;
    a {
      &:hover {
        background-color: ${(props) => props.theme.blue};
        color: ${(props) => props.theme.offWhite};
      }
    }
  }
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;