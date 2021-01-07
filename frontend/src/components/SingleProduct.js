import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/product';



const SingleProduct = ({ id, productList, singleProduct }) => {
    const [ values, setValues ] = useState({});


    useEffect(() => {
        singleProduct(id);
        setValues({ ...productList.find(item => item.id === parseInt(id)) })
    }, [id]);

    return (
        <div>
        <p>{values.price}</p>
        <p>{values.description}</p>
        </div>
    )
//     const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
//       variables: { id },
//     });
//     if (error) return <Error error={error} />;
//     if (loading) return <p>Loading...</p>;
//     if (!data?.Product) return <p>No Item Found for {id}</p>;
//     const { Product } = data;
//     return (
//       <SingleProductStyles data-testid="singleProduct">
//         <Head>
//           <title>Sick Fits | {Product.name}</title>
//         </Head>
//         <img src={Product.photo.image.publicUrlTransformed} alt={Product.name} />
//         <div className="details">
//           <h2>Viewing {Product.name}</h2>
//           <p>{Product.description}</p>
//         </div>
//       </SingleProductStyles>
//     );
  }
  
const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = {
    singleProduct: actions.fetchById
};

export default connect(mapStateToProps, mapActionsToProps)(SingleProduct);