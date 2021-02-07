import { render, screen, fakeUser } from '../src/utils/testUtils';
import Home from '../src/components/Home';

const mockedUser = fakeUser();

describe('<Home />', () => {
    it('should render home page with no user', () => {
        const { container } = render(
            <Home/>, { initialState: { authentication: { user: {}}}})
        expect(container).toMatchSnapshot();
    });
    it('shows correct buttons if logged in', () => {
        render(
        <Home/>, { initialState: { authentication: { user: { token: mockedUser.token }}}})
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });
});
