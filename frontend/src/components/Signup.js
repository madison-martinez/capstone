import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Form from './styles/FormStyles';
import useForm from '../utils/useForm';
import { userActions } from '../actions/user';


function Signup() {
  const { values, handleChange, clearForm } = useForm({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const { firstName, lastName, username, password } = values;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        setSubmitted(true);
        if (firstName && lastName && username && password) {
          const res = await dispatch(userActions.register(values));
          console.log(res);
        }
        clearForm();
      }}
    >
      <fieldset>
        <h2>Sign Up for An Account</h2>

        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Sign Up!</button>
      </fieldset>

      <Image
        src="/assets/photo-1444459094717-a39f1e3e0903.jpeg"
        alt=""
        layout="responsive"
        width={200}
        height={200}
      />

    </Form>
  );
};

export default Signup;