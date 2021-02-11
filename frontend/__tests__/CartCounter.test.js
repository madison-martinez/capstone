import { render, screen } from "../src/utils/testUtils";
import CartCounter from "../src/components/CartCounter";

describe("<CartCounter />", () => {
  it("should display an empty div when nothing in cart", () => {
    const { container } = render(<CartCounter />);
    expect(container).toMatchSnapshot();
  });

  it("handles state updating to add one to cart", async () => {
    render(<CartCounter />, { initialState: { cart: { cartCount: 1 } } });
    expect(screen.getByText(1)).toBeInTheDocument();
  });
});
