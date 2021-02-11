import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/product";
import Product from "./Product";
import Pagination from "./Pagination";

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

  const [searchValue, setSearchValue] = useState();
  const handleChangeFilter = (e) => {
    console.log("hi there", e.target.value);
    setSearchValue(e.target.value);
  };

  const filteredProducts = productList.filter((product) => {
    return product.title.toString().toLowerCase().includes(searchValue);
  });

  return (
    <>
      <label htmlFor="search">Search for Product</label>
      <input type="text" value={searchValue} onChange={handleChangeFilter} />
      {filteredProducts.length > 0 ? (
        <>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
          />
          <Product products={filteredProducts} />
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
