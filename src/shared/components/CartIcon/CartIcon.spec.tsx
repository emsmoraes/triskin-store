import { render, screen } from "@testing-library/react";
import CartIcon from ".";
import { useCartStore } from "@/shared/stores/useCartStore";
import "@testing-library/jest-dom";

jest.mock("@/shared/stores/useCartStore", () => ({
  useCartStore: jest.fn(),
}));

describe("CartIcon", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o ícone do carrinho", () => {
    ((useCartStore as unknown) as jest.Mock).mockImplementation((selector) =>
      selector({ items: [] })
    );
    render(<CartIcon />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("shopping-cart-icon")).toBeInTheDocument();
  });

  it("não deve mostrar badge se o carrinho estiver vazio", () => {
    (useCartStore as any).mockImplementation((selector: any) =>
      selector({ items: [] })
    );
    render(<CartIcon />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("deve mostrar a quantidade correta no badge", () => {
    ((useCartStore as unknown) as jest.Mock).mockImplementation((selector) =>
      selector({
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 3 },
        ],
      })
    );
    render(<CartIcon />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("deve mostrar '99+' se a quantidade for maior que 99", () => {
    ((useCartStore as unknown) as jest.Mock).mockImplementation((selector) =>
      selector({
        items: [
          { id: 1, quantity: 60 },
          { id: 2, quantity: 50 },
        ],
      })
    );
    render(<CartIcon />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });
});