import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/product';
import Product from './Product';
import Pagination from './Pagination';

export const Products = ({ productList, fetchAllProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fn = async () => {
            await fetchAllProducts();
            setProducts(productList);
        };
        fn();
    }, [fetchAllProducts]);

    //get current products on page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   
    return (
        <>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
            />
            <Product
                products={currentProducts}
                loading={loading}
            />
        </>
    )
};

const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = {
    fetchAllProducts: actions.fetchAll
};

export default connect(mapStateToProps, mapActionsToProps)(Products);