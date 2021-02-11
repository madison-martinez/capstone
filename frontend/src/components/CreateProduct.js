import React from "react";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Form from "./styles/FormStyles";
import useForm from "../utils/useForm";
import * as actions from "../actions/product";

const CreateProduct = (props) => {
  const router = useRouter();
  const alert = useSelector((state) => state.alert);

  const { values, handleChange, setValues } = useForm({
    title: "",
    description: "",
    price: 0,
    image: "",
  });

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "farmersspecial");

    try {
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dzqeffkmp/image/upload",
        data
      );
      if (result.status === 200) {
        setValues({ image: result.data.secure_url });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSuccess = () => router.push("/marketplace");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.createProduct(values, handleOnSuccess);
  };

  return (
    <Form data-testid="form" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="file">
          Image
          <input
            id="file"
            type="file"
            name="image"
            placeholder="Upload an image"
            onChange={handleImageUpload}
            data-testid="image-element"
          />
        </label>
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={values.title || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={values.description || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Price"
            value={values.price || ""}
            onChange={handleChange}
            required
          />
        </label>
        {alert.message && <div>{alert.message}</div>}
        <button type="submit">Submit</button>
      </fieldset>

      <img
        src="/assets/photo-1560493676-04071c5f467b.jpeg"
        alt="fieldrows"
        layout="responsive"
        width={500}
        height={500}
      />
    </Form>
  );
};
const mapStateToProps = (state) => ({ productList: state.product.list });

const mapActionsToProps = {
  createProduct: actions.create,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateProduct);
