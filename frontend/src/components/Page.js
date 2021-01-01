import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';


const theme = {
    offWhite: '#F6EDD9',
    darkGreen: '#2C5415',
    lightGray: '#A5AE9D',
    darkGray: '#717A6A',
    darkBlue: "#005874",
    blue: "#008BA8",
    maxWidth: '1000px'
};

const StyledPage = styled.div`
    background: white;
    color: black;
`;

const InnerPage = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
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
        padding: 0;
        margin: 0;
        font-size: 1rem;
        font-family: 'Josefin Slab', serif;
    }
    a {
        text-decoration: none;
        font-family: 'Amatic SC', cursive;
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
                </StyledPage>
            </ThemeProvider>
        )
    }
};