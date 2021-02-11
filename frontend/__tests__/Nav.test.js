import Nav from "../src/components/Nav";
import { render, screen } from "../src/utils/testUtils";

describe("<Nav />", () => {
  it("renders nav links if user is not logged in", () => {
    const { container } = render(<Nav />, {
      initialState: { authentication: { user: {} } },
    });
    expect(container).toMatchSnapshot();
  });

  it("renders nav links if user is logged in and has the role of farmer", () => {
    render(<Nav />, {
      initialState: { authentication: { user: { role: "farmer" } } },
    });
    expect(screen.getByText("Sell")).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders nav links if user is logged in and has the role of restaurant", () => {
    render(<Nav />, {
      initialState: { authentication: { user: { role: "restaurant" } } },
    });
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
