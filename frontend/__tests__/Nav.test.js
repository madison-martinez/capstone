import { render } from '@testing-library/react';
import Nav from '../src/components/Nav';

describe('<Nav />', () => {
    it('renders nav links', () => {
        const { container } = render(
            <Nav />
        );
        expect(container).toHaveTextContent('Marketplace');
        expect(container).toHaveTextContent('Sell');
    })
});