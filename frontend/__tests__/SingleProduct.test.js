import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "../setupTests";
import moxios from "moxios";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fakeItem } from "../src/utils/testUtils";
import { ACTION_TYPES, fetchById } from "../src/actions/product";

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  list: [],
};

const item = fakeItem();

const server = setupServer(
  rest.get("https://localhost:5001/api/Product/1", (req, res, ctx) => {
    return res(ctx.json(item));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<SingleProduct />", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Loads single mocked product after dispatch", (done) => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: item,
      });
    });
    const expectedActions = [
      {
        type: ACTION_TYPES.FETCH_BY_ID,
        payload: item,
      },
    ];
    return store.dispatch(fetchById("1")).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      done();
    });
  });
});
