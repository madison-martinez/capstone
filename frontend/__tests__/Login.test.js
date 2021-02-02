import React from 'react';
import { render, screen } from '../src/utils/testUtils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Login from '../src/components/Login';

const server = setupServer(
    rest.post("/login", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                token: 'mocked-token'
            })
        )
    })
);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('allows the user to log in', async () => {
    render(<Login />, { initialState: { authentication: { user: {} } } })
    userEvent.type(
        screen.getByPlaceholderText('Username'),
        'Oakley',
    )
    userEvent.type(
        screen.getByPlaceholderText('Password'),
        'password',
    )
    userEvent.click(screen.getByText(/sign in/i))

    expect(window.localStorage.getItem('token')).toEqual('mocked-token');
})

