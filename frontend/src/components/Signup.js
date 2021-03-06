import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./styles/FormStyles";
import useForm from "../utils/useForm";
import { userActions } from "../actions/user";
import { alertActions } from "../actions/alert";

function Signup() {
  const { values, handleChange, handleSelect } = useForm({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const { firstName, lastName, username, password, role } = values;
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const router = useRouter();

  useEffect(() => {
    dispatch(userActions.logout());
    dispatch(alertActions.reset());
  }, []);

  const handleOnSuccess = () => router.push("/login");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (firstName && lastName && username && password && role) {
      dispatch(userActions.register(values, handleOnSuccess));
    }
  };

  return (
    <Form method="post" onSubmit={handleOnSubmit} data-testid="signup-form">
      <fieldset>
        <h2>Sign Up for An Account</h2>
        {submitted && alert.message && <div>{alert.message}</div>}

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
            autoComplete="username"
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
        <label htmlFor="role">
          Select Your Profession
          <select type="select" value={values.role} onChange={handleSelect}>
            <option default></option>
            <option value="farmer">Farmer</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </label>

        <button type="submit">Sign Up!</button>
      </fieldset>

      <img
        src="/assets/photo-1444459094717-a39f1e3e0903.jpeg"
        alt="berries"
        width={500}
        height={650}
      />
    </Form>
  );
}

export default Signup;
