import React from 'react';
import UpdateProduct from '../components/UpdateProduct';


function Update({ query }) {
    return (
        <div>
            <UpdateProduct id={query.id} />
        </div>
    )
};
export default (Update);