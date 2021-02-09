import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import fetchMock from 'fetch-mock';
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { useRouter } from 'next/router';
import Login from "../src/components/Login";
import { fakeUser, render, screen } from "../src/utils/testUtils";
import { alertActionTypes } from "../src/actions/alert";
import { userConstants, userActions } from "../src/actions/user";
import { userService } from "../src/services/user.service";

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  authentication: {
    user: {},
  },
};

const mockPush = jest.fn();
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: mockPush
    })
  }));

const mockSuccessFn = jest.fn();

const user = fakeUser();
//
const server = setupServer(
  rest.post("https://localhost:5001/users/authenticate", (req, res, ctx) => {
    return res(ctx.json(user));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
  fetchMock.restore();
});
afterAll(() => server.close());

describe("<Login />", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should render empty form", () => {
    const { container } = render(<Login authUser={{ user: false }} />);
    expect(screen.queryByTestId("login-form")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  describe("inputting username and password", () => {
    it("handles user submitting a username and password", async () => {
      render(<Login store={store} />);
      expect(screen.queryByTestId("login-form")).toBeTruthy();

      userEvent.type(screen.getByPlaceholderText("Username"), user.username);
      userEvent.type(screen.getByPlaceholderText("Password"), user.password);

      userEvent.click(screen.getByText("Sign In!"));

      const expectedActions = [
        {
          type: userConstants.LOGIN_REQUEST,
          user: {username: user.username}
        }
      ];
      return store.dispatch(userActions.login(user.username, user.password, mockSuccessFn))
        .then(async () => {
          const actualActions = store.getActions();
          expect(actualActions).toEqual(expectedActions);
        })
    });

    it.only("reroutes to home page after successful login", () => {
        render(<Login store={store} />);
    
        expect(screen.queryByTestId("login-form")).toBeTruthy();
        userEvent.type(screen.getByPlaceholderText("Username"), user.username);
        userEvent.type(screen.getByPlaceholderText("Password"), user.password);
        userEvent.click(screen.getByText("Sign In!"));
        
        fetchMock.getOnce("/users/authenticate", {
            body: {user},
            headers: {"Content-Type": "application/json"}
        });

        const expectedActions = [
            {
                type: userConstants.LOGIN_REQUEST,
                user: {username: user.username}
              },
            {
                type: userConstants.LOGIN_SUCCESS,
                user
            }
        ];
        return store.dispatch(userActions.login(user.username, user.password, mockSuccessFn)).then(async() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(expectedActions);
            await waitFor(() => expect(mockSuccessFn).toHaveBeenCalledTimes(1));
        })
    });
    
    it("shows error if username or password is incorrect", () => {});
  });
});
