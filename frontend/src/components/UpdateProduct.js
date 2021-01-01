import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Form from './styles/FormStyles';
import * as actions from '../actions/product';
import useForm from '../utils/useForm';

const UpdateProduct = ({ id, productList, updateProduct, fetchAllProducts }) => {
    const { values, setValues, handleChange } = useForm({
        title: '',
        description: '',
        price: 0
    });

    useEffect(() => {
        // fetchSingleProduct(id)
        fetchAllProducts()
        setValues({ ...productList.find(item => item.id === parseInt(id)) })
    }, []);


    const handleSubmit = e => {
        e.preventDefault();
        updateProduct(id, values, () => { window.alert('updated a new product') })
    };

    return (
        <>
            <Form
                data-testid="form"
                onSubmit={handleSubmit}                                //TODO POST INFO TO API AND DB
            >
                <fieldset>
                    <label htmlFor="title">
                        Title
                    <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            required
                            value={values.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="description">
                        Description
                    <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            required
                            value={values.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="price">
                        Price
                    <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Price"
                            required
                            value={values.price}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
            </Form>
        </>
    )
};

const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = {
    updateProduct: actions.update,
    fetchAllProducts: actions.fetchAll
};


export default connect(mapStateToProps, mapActionsToProps)(UpdateProduct);