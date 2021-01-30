import { render } from '@testing-library/react';
import { Test as Nav } from '../src/components/Nav';

jest.mock('react-redux', () => {
    return {
        connect: (props) => (ui) => () => ui(props)
    }
});

describe('<Nav />', () => {
    it('renders nav links if user is not logged in', () => {
        const { container } = render(
            <Nav authUser={false} />
        );
        expect(container).toHaveTextContent('Signup');
        expect(container).toHaveTextContent('Login');
    });
    it('renders nav links if user is logged in', () => {
        const { container } = render(
            <Nav authUser={true} />
        );
        expect(container).toHaveTextContent('Sell');
        expect(container).toHaveTextContent('Orders');
        expect(container).toHaveTextContent('Logout');
    });
});
