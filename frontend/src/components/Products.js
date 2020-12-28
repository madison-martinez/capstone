import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import * as actions from '../actions/product';
 

const ProductsList = styled.div`
    display: grid:
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    margin: 0 auto;
    max-width: ${props => props.theme.maxWidth};
`;

const Center = styled.div`
    text-align: center;
`;

function Products({ ...props }) {
    //call api fetchAll req
    useEffect(() => {
        props.fetchAllProducts()
    });

    return (
        <Center>
          <ProductsList>
            {props.productList.map((item, index) => {
                return <p key={index}>{item.title}</p>
            })};
          </ProductsList>
        </Center>
    )
};


const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = { fetchAllProducts: actions.fetchAll };

export default connect(mapStateToProps, mapActionsToProps)(Products);