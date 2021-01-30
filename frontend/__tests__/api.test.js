import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchAll } from '../src/actions/product';
import { fakeItem } from '../src/utils/testUtils';

const server = setupServer(
   rest.get("https://localhost:5001/api/Product/", (req, res, ctx) => {
       return res(
           ctx.status(200),
           ctx.json({list: [fakeItem]})
       )
   }) 
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it('should mock axios and fetch products', () => {
    
})