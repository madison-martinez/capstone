import Link from 'next/link';
import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>

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
        </div>
    )
};

export default Pagination;