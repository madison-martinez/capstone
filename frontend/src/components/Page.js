import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  offWhite: "#F6EDD9",
  darkGreen: "#2C5415",
  lightGray: "#A5AE9D",
  darkGray: "#717A6A",
  darkBlue: "#005874",
  blue: "#008BA8",
  maxWidth: "1000px",
};

const StyledPage = styled.div`
  background: white;
  color: black;
  margin-bottom: 3rem;
`;

const InnerPage = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 2.5rem;
`;

const GlobalStyles = createGlobalStyle`
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
      font-size: 1rem;
      font-family: 'Josefin Slab', serif;
      margin: 0;
      padding: 0;
    }
    a {
      font-family: 'Amatic SC', cursive;
      text-decoration: none;
      color: ${theme.darkGreen};
    }
`;

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyles />
          <Meta />
          <Header />
          <InnerPage>{this.props.children}</InnerPage>
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}
