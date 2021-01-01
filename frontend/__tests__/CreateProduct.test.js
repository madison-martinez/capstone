import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import CreateProduct from '../src/components/CreateProduct';
import { render, screen, fakeItem } from '../src/utils/testUtils';

const mockStore = configureStore([]);
const item = fakeItem();

describe('<CreateProduct />', () => {
    it('should render connected CreateProduct with initialState', () => {
        render(<CreateProduct />, { initialState: { product: '' } })
        expect(screen.getByTestId('form')).toBeInTheDocument()
    });

    it('handles state updating', async () => {
        render(<CreateProduct />, { initialState: { product: { item } } })

        await userEvent.type(
            screen.getByPlaceholderText('Title'),
            item.title);
        await userEvent.type(
            screen.getByPlaceholderText('Price'),
            item.price.toString()
        );
        await userEvent.type(
            screen.getByPlaceholderText('Description'),
            item.description
        );

        expect(screen.getByDisplayValue(item.title)).toBeInTheDocument();
        expect(screen.getByDisplayValue(item.price.toString())).toBeInTheDocument();
        expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByTestId('form')).toBeInTheDocument());
    });

  //NEED TO TEST SUBMIT BUTTON
});