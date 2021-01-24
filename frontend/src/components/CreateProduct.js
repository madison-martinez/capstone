import React from 'react';
import { connect } from 'react-redux';
import Image from 'next/image';
import Form from './styles/FormStyles';
import * as actions from '../actions/product';
import useForm from '../utils/useForm';


const CreateProduct = (props) => {

    const { values, handleChange, setInitialForm, setValues } = useForm({
        title: '',
        description: '',
        price: 0,
        image: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        props.createProduct(values)
        setInitialForm();
    };

    const handleImageUpload = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'farmersspecial');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dzqeffkmp/image/upload',
            {
                method: 'POST',
                body: data
            });
        const file = await res.json();
        console.log(file)
        setValues({ image: file.secure_url });
    }

    return (
        <Form
            data-testid="form"
            onSubmit={handleSubmit}
        >
            <fieldset>
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="image"
                        placeholder="Upload an image"
                        onChange={handleImageUpload}
                    />
                </label>
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

            <Image
                src="/assets/photo-1560493676-04071c5f467b.jpeg"
                alt="fieldrows"
                layout="responsive"
                width={200}
                height={200}
            />

        </Form>
    )
};

const mapStateToProps = state => ({ productList: state.product.list });

const mapActionsToProps = {
    createProduct: actions.create,
};


export default connect(mapStateToProps, mapActionsToProps)(CreateProduct);