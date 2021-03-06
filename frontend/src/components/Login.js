import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useForm from "../utils/useForm";
import Form from "./styles/FormStyles";
import { userActions } from "../actions/user";
import { alertActions } from "../actions/alert";

function LoginPage() {
  const { values, handleChange, clearForm } = useForm({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = values;
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const router = useRouter();

  useEffect(() => {
    dispatch(userActions.logout());
    dispatch(alertActions.reset());
  }, []);

  const handleOnSuccess = () => router.push("/");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password, handleOnSuccess));
    }
    clearForm();
  };

  return (
    <Form method="post" onSubmit={handleOnSubmit} data-testid="login-form">
      <fieldset>
        <h2>Login to your account</h2>
        {submitted && alert.message && <div>{alert.message}</div>}
        <label htmlFor="username">
          Username
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
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
            autoComplete="new-password"
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>

      <img
        src="/assets/photo-1464226184884-fa280b87c399.jpeg"
        alt="fieldrows"
        width={500}
        height={500}
      />
    </Form>
  );
}

export default LoginPage;
