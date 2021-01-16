import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useForm from '../utils/useForm';
import Form from './styles/FormStyles';
import { userActions } from '../actions/user';


function LoginPage() {
    const { values, handleChange, clearForm } = useForm({
        username: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = values;
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(userActions.logout());
        router.prefetch('/marketplace');
    }, []);

    return (
        <>
        <Form
            method="post"
            onSubmit={async e => {
                e.preventDefault();
                setSubmitted(true);
                if (username && password) {
                    dispatch(userActions.login(username, password));
                    router.push('/marketplace');
                }
                clearForm();
            }}
        >
            <fieldset>
                <h2>Login to your account</h2>
                <label htmlFor="username">
                    Username
                <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {submitted && !username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </label>
                <label htmlFor="password">
                    Password
                 <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {submitted && !username &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </label>
                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
        </>
    );
};

export default LoginPage;