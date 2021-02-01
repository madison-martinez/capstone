import React from 'react';
import { screen, render, fakeItem } from '../src/utils/testUtils';
import Cart from '../src/components/Cart';
import { waitFor } from '@testing-library/react';

const item = fakeItem();

describe('< Cart />', () => {
    it('should display empty cart when no items in state', async () => {
        const { container } = render(
        <Cart />);

        expect(container).toMatchSnapshot();
    });

    it('should display fake item correctly when added into cart state', async () => {
        render(<Cart />,  { initialState: { cart: { cartProducts: [item]}}});
        await waitFor(() => expect(screen.getByTestId('order-button')).toBeEnabled());
        expect(screen.getByText(item.description)).toBeInTheDocument();
    })
})