import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./styles/FormStyles";
import * as actions from "../actions/product";
import useForm from "../utils/useForm";

const UpdateProduct = ({ id }) => {
  const { values, setValues, handleChange } = useForm({
    title: "",
    description: "",
    price: 0,
  });
  
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.list)
  const router = useRouter();

  useEffect(() => {
    dispatch(actions.fetchAll());
    setValues({ ...productList.find((item) => item.id === parseInt(id)) });
  }, []);

  const handleOnSuccess = () => router.push("/marketplace");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(actions.update(id, values, handleOnSuccess));
  };

  return (
      <Form
        data-testid="form"
        onSubmit={handleSubmit}
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
  );
};

export default UpdateProduct;
