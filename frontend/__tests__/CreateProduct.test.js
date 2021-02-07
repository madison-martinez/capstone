import thunk from "redux-thunk";
import { act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import moxios from "moxios";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import CreateProduct from "../src/components/CreateProduct";
import { render, screen } from "../src/utils/testUtils";
import { ACTION_TYPES, create } from "../src/actions/product";

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

const mockSuccessFn = jest.fn();


const server = setupServer(
  rest.post(
    "https://localhost:5001/api/Product/:newProduct",
    (req, res, ctx) => {
      return res(ctx.json(fakeNewItem));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
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

  it("handles user inputting a new product", async (done) => {
    render(<CreateProduct store={store} />);
    expect(await screen.findByTestId("form")).toBeInTheDocument();

    await act(async () => {
        userEvent.click(screen.getByPlaceholderText("Upload an image"));
        await waitFor(() => expect(screen.getByText(fakeNewItem.image).toBeInTheDocument()));
    });

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

    userEvent.click(screen.getByText("Submit"));

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
      }
    ];
    return store.dispatch(create(fakeNewItem, mockSuccessFn)).then(async () => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      done();
      await waitFor(() => expect(mockSuccessFn).toHaveBeenCalledTimes(1));
    });
  });
});

//NEED TO TEST IMAGE UPLOAD TO GET RID OF THE ACT WARNING
