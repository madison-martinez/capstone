import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './styles/FormStyles';
import useForm from '../utils/useForm';
import { userActions } from '../actions/user';


function Signup() {
  const { values, handleChange } = useForm({
    firstName: '',
    lastName: '',
    // email: '',
    username: '',
    password: '',
  });

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
      }}
    >
      <fieldset>
        <h2>Sign Up for An Account</h2>
        
        <label htmlFor="firstname">
          First Name
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastname">
          Last Name
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
          />
        </label>
        {/* <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
          />
        </label> */}
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}

export default Signup;