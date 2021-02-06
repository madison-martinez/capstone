import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../actions/product";
import formatMoney from "../utils/formatMoney";

const SingleProductStyles = styled.div`
  display: grid;
  grid-auto-colummns: 1fr;
  grid-flow-auto: columns;
  min-height: 500px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  .details {
    font-size: 2rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SingleProduct = ({ id, productList, singleProduct }) => {

  useEffect(() => {
    singleProduct(id);
  }, [id, singleProduct]);

  return (
    <>
      <SingleProductStyles>
        {productList[0].image && (
          <Image
            src={productList[0].image}
            alt={productList[0].title}
            width={500}
            height={500}
            layout="fixed"
          />
        )}
        <Head>
          <title>Farmer's Special - {productList[0].title}</title>
        </Head>
        <div className="details" data-testid="details">
          <h3>Looking at {productList[0].title}.</h3>
          <p>{productList[0].description}</p>
          <p>{formatMoney(productList[0].price)}</p>
        </div>
      </SingleProductStyles>
    </>
  );
};

const mapStateToProps = (state) => ({ productList: state.product.list });

const mapActionsToProps = {
  singleProduct: actions.fetchById,
};

export default connect(mapStateToProps, mapActionsToProps)(SingleProduct);
