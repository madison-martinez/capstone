import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateProduct from '../src/components/CreateProduct';
import { render, screen, fakeItem } from '../src/utils/testUtils';

const item = fakeItem();

describe('<CreateProduct />', () => {
    it('should render form with initial state', () => {
        const { container } = render(
            <CreateProduct productList={[]} />)
        expect(container).toMatchSnapshot();
    });

    it('handles state updating', async () => {
        render(<CreateProduct productList={[item]} />);

        userEvent.type(
            screen.getByPlaceholderText('Title'),
            item.title);
        userEvent.type(
            screen.getByPlaceholderText('Description'),
            item.description
        );

        expect(screen.getByText(item.title)).toBeInTheDocument();
        expect(screen.getByText(item.description)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByTestId('form')).toBeInTheDocument());
    });

    //NEED TO TEST SUBMIT BUTTON
});