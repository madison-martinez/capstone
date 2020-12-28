import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Form from './styles/FormStyles';
import * as actions from '../actions/product';

const CreateProduct = (props) => {
    
    useEffect(() => {
        props.fetchAllProducts()
    });

    return (
        <>
        <Form>
            <fieldset>
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="image"
                        placeholder="Upload an image"
                        required
                        // onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        // value={inputs.name}
                        // onChange={handleChange}
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
                        // value={inputs.price}
                        // onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        // value={inputs.description}
                        // onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
        <div>
        {props.productList.map((item, index) => {
                return <p>{item.title}</p>
        })}
        </div>
        </>
    )
}

const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = { fetchAllProducts: actions.fetchAll };


export default connect(mapStateToProps, mapActionsToProps)(CreateProduct);