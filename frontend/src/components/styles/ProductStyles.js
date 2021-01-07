import styled from 'styled-components';

const Product = styled.div`
    border: 2px solid ${props => props.theme.darkGreen};
    position: relative;
    display: flex;
    flex-direction: column;
    h3 {
        text-align: center;
        margin-top: 2rem;
        a {
            background: ${props => props.theme.darkGreen};
            display: inline;
            line-height: 1;
            font-size: 2rem;
            text-align: center;
            color: white;
            padding: 0 .5rem;   
        }
    }
    .button-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
        margin: 1rem 3rem ;
        a, button {
            font-family: 'Josefin Slab', serif;
            font-size: 1.2rem;
            background: white;
        }
        & > * {
            background: white;
            color: black;
            border: 0;
            padding: 1rem;
            :hover {
                background: ${props => props.theme.darkGreen};
                color: white;
                cursor: pointer;
            }

          }
    }

`;

export default Product;