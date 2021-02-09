import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as actions from "../actions/product";
import Product from "./Product";
import Pagination from "./Pagination";

export const Products = ({ productList, fetchAllProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts);
  }, [fetchAllProducts, dispatch]);

  //get current products on page to set pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [searchValue, setSearchValue] = useState();
  const handleChangeFilter = (e) => {
    console.log('hi there', e.target.value);
    setSearchValue(e.target.value)
  };

  const filterProducts = productList.filter(product => {
    return product.title.includes(searchValue);
  });
  console.log(filterProducts)


  return (
    <>
    <label htmlFor="search">Search for Product</label>
    <input type="text" value={searchValue} onChange={handleChangeFilter} />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={productList.length}
        paginate={paginate}
      />
      <Product products={currentProducts} />
    </>
  );
};

const mapStateToProps = (state) => ({ productList: state.product.list });

const mapActionsToProps = {
  fetchAllProducts: actions.fetchAll,
};

export default connect(mapStateToProps, mapActionsToProps)(Products);
