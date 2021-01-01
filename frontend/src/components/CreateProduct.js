import React from 'react';
import { connect } from 'react-redux'
import Form from './styles/FormStyles';
import * as actions from '../actions/product';
import useForm from '../utils/useForm';

const CreateProduct = (props) => {

    const { values, handleChange, setInitialForm } = useForm({
        title: '',
        description: '', 
        price: 0
    });

    const onSuccess = () => setInitialForm();

    const handleSubmit = e => {
        e.preventDefault();
        props.createProduct(values, () => {window.alert('created a new product')})
        onSuccess();
    }

    return (
        <>
        <Form
            data-testid="form"
            onSubmit={handleSubmit}                                //TODO POST INFO TO API AND DB
        >
            <fieldset>
                {/* <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="image"
                        placeholder="Upload an image"
                        required
                        onChange={handleChange}
                    />
                </label> */}
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
    createProduct: actions.create,
};


export default connect(mapStateToProps, mapActionsToProps)(CreateProduct);