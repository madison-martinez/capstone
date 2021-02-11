import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import moxios from "moxios";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import CreateProduct from "../src/components/CreateProduct";
import { render, screen } from "../src/utils/testUtils";
import { ACTION_TYPES, create } from "../src/actions/product";
import { alertActionTypes } from "../src/actions/alert";

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  product: {
    list: [],
  },
};

const fakeNewItem = {
  id: 2,
  title: "fakeFood",
  description: "fakeYums",
  price: 2,
  image: "food.jpeg",
};

const fakeItemMissingFields = {
  id: 2,
  title: "",
  description: "",
  price: 2,
};

const mockSuccessFn = jest.fn();

const server = setupServer(
  rest.post(
    "https://localhost:5001/api/Product/:newProduct",
    (req, res, ctx) => {
      return res(ctx.json(fakeNewItem));
    }
  ),
  rest.post(
    "https://api.cloudinary.com/v1_1/dzqeffkmp/image/upload",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeNewItem.image));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe("<CreateProduct />", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should render empty form", () => {
    const { container } = render(<CreateProduct productList={[]} />);
    expect(container).toMatchSnapshot();
  });

  it("handles user inputting a new product", async () => {
    //render the form
    render(<CreateProduct store={store} />);
    expect(await screen.findByTestId("form")).toBeInTheDocument();
    //upload an image
    const file = new File(["hello"], fakeNewItem.image, { type: "image/png" });

    const input = await screen.findByTestId("image-element");
    userEvent.upload(input, file);
    expect(input.files[0]).toStrictEqual(file);
    expect(input.files).toHaveLength(1);

    //user types title, description, and price
    userEvent.type(screen.getByPlaceholderText("Title"), fakeNewItem.title);
    userEvent.type(
      screen.getByPlaceholderText("Description"),
      fakeNewItem.description
    );
    userEvent.type(
      screen.getByPlaceholderText("Price"),
      fakeNewItem.price.toString()
    );

    expect(screen.getByDisplayValue(fakeNewItem.title)).toBeInTheDocument();
    expect(screen.getByText(fakeNewItem.description)).toBeInTheDocument();
    //user clicks the submit button
    userEvent.click(screen.getByText("Submit"));
    //submit button fires dispatch to create product
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: fakeNewItem,
      });
    });
    const expectedActions = [
      {
        type: ACTION_TYPES.CREATE,
        payload: fakeNewItem,
      },
    ];
    return store.dispatch(create(fakeNewItem, mockSuccessFn)).then(async () => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      await waitFor(() => expect(mockSuccessFn).toHaveBeenCalledTimes(1));
    });
  });

  it("checks that required fields are filled out", () => {
    render(<CreateProduct store={store} />);
    userEvent.click(screen.getByText("Submit"));
    //submit button fires dispatch to create product
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: "Error: Request failed with status code 400",
      });
    });
    const expectedActions = [
      {
        type: alertActionTypes.ERROR,
        message: "Price must be between $1.00 and $10,000",
      },
      {
        type: alertActionTypes.ERROR,
        message: "Error: Request failed with status code 400",
      },
    ];
    return store
      .dispatch(create(fakeItemMissingFields, mockSuccessFn))
      .then(async () => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
        await waitFor(() => expect(mockSuccessFn).toHaveBeenCalledTimes(0));
      });
  });
});
