import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../actions/product";
import Product from "./Product";
import Pagination from "./Pagination";

const SearchboxStyles = styled.div`
  label {
    display: block;
    font-size: 1.5rem;
  }
  input {
    display: block;
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.list);

  useEffect(() => {
    dispatch(actions.fetchAll());
  }, [dispatch]);

  //get current products on page to set pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //searchbox
  const [searchValue, setSearchValue] = useState();
  const handleChangeFilter = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredProducts = productList.filter((product) => {
    return product.title
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });
  //reset pagination to new filtered array
  const currentFilteredProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <SearchboxStyles>
        <label htmlFor="search">
          Looking for something?
          <input
            type="text"
            value={searchValue}
            onChange={handleChangeFilter}
            placeholder="Search for an item"
          />
        </label>
      </SearchboxStyles>
      {filteredProducts.length > 0 ? (
        <>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
          />
          <Product products={currentFilteredProducts} />
        </>
      ) : (
        <>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={productList.length}
            paginate={paginate}
          />
          <Product products={currentProducts} />
        </>
      )}
    </>
  );
};

export default Products;
