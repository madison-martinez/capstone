import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../actions/product';
import formatMoney from '../utils/formatMoney';

const SingleProductStyles = styled.div`
    display: grid;
    grid-auto-colummns: 1fr;
    grid-flow-auto: columns;
    min-height: 500px;
    max-width: ${props => props.theme.maxWidth};
    margin: 2rem auto;
    .details {
        font-size: 2rem;
    }
`;

const SingleProduct = ({ id, productList, singleProduct }) => {
    const [values, setValues] = useState({});

    useEffect(() => {
        singleProduct(id);
        setValues({ ...productList.find(item => item.id === parseInt(id)) })
    }, [id]);
    //add in error 
    //add in loading 
    return (
        <>
            <Head>
                <title>
                    Farmer's Special - {values.title}
                </title>
            </Head>
            <SingleProductStyles>
                <div className="details">
                    <h3>Looking at {values.title}.</h3>
                    <p>{values.description}</p>
                    <p>{formatMoney(values.price)}</p>
                </div>
            </SingleProductStyles>
        </>
    )
};

const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = {
    singleProduct: actions.fetchById
};

export default connect(mapStateToProps, mapActionsToProps)(SingleProduct);