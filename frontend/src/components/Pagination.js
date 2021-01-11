import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 1rem;
    span {
        margin-left: 1rem;
    }
    
`;

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <PaginationStyles>
            {pageNumbers.map(num => (
                <Link
                    href='#'
                    key={num}
                >
                    <span> 
                        <a onClick={() => paginate(num)} href="#">
                        {num}
                        </a> 
                    </span>
                </Link>
            ))}
        </PaginationStyles>
    )
};

export default Pagination;