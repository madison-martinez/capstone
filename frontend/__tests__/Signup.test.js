import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import fetchMock from "fetch-mock";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { render, screen } from "../src/utils/testUtils";
import { alertActionTypes } from "../src/actions/alert";
import { userConstants, userActions } from "../src/actions/user";
import Signup from "../src/components/Signup";

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  registration: {},
};

const mockSuccessFn = jest.fn();

const mockedUser = {
  firstName: "Pam",
  lastName: "Beasley",
  username: "receptionist01",
  password: "jim",
  role: "",
};

const mockedUserMissingFields = {
  firstName: "Pam",
  lastName: "",
  username: "receptionist01",
  password: "",
  role: "",
};

const server = setupServer(
  rest.post("https://localhost:5001/users/register", (req, res, ctx) => {
    return res(ctx.json(mockedUser));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
  fetchMock.restore();
});
afterAll(() => server.close());

describe("<Signup />", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should show an empty signup form when page renders", () => {
    const { container } = render(<Signup />);
    expect(screen.queryByTestId("signup-form")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("should allow a user to fill out the form and submit it", async () => {
    render(<Signup store={store} />);
    expect(screen.queryByTestId("signup-form")).toBeTruthy();
    //user fills out form
    userEvent.type(
      screen.getByPlaceholderText("First Name"),
      mockedUser.firstName
    );
    userEvent.type(
      screen.getByPlaceholderText("Last Name"),
      mockedUser.lastName
    );
    userEvent.type(
      screen.getByPlaceholderText("Username"),
      mockedUser.username
    );
    userEvent.type(
      screen.getByPlaceholderText("Password"),
      mockedUser.password
    );

    //user click the submit button
    userEvent.click(screen.getByText("Sign Up!"));

    // expected actions upon submit
    const expectedActions = [
      {
        type: userConstants.REGISTER_REQUEST,
        user: mockedUser,
      },
      {
        type: userConstants.REGISTER_SUCCESS,
        user: mockedUser,
      },
    ];

    return store
      .dispatch(userActions.register(mockedUser, mockSuccessFn))
      .then(async () => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        await waitFor(() => expect(mockSuccessFn).toHaveBeenCalledTimes(1));
      });
  });

  it("should show an error if a required field is not filled out", () => {
    server.use(
      rest.post("https://localhost:5001/users/register", (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(<Signup store={store} />);
    userEvent.click(screen.getByText("Sign Up!"));

    fetchMock.getOnce("/users/register", {
      body: {},
      headers: { "Content-Type": "application/json" },
    });

    const expectedActions = [
      {
        type: userConstants.REGISTER_REQUEST,
        user: mockedUserMissingFields,
      },
      {
        type: userConstants.REGISTER_FAILURE,
        error: "Bad Request",
      },
      {
        type: alertActionTypes.ERROR,
        message: "Bad Request",
      },
    ];

    return store
      .dispatch(userActions.register(mockedUserMissingFields, mockSuccessFn))
      .then(async () => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      });
  });
});
