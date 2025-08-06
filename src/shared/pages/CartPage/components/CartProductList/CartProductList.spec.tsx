import { render, screen } from "@testing-library/react";
import CartProductList from ".";
import { useCartStore } from "@/shared/stores/useCartStore";
import "@testing-library/jest-dom";

jest.mock("@/shared/stores/useCartStore", () => ({
  useCartStore: jest.fn(),
}));

jest.mock("../CartProductItem", () => ({
  __esModule: true,
  CartProductItem: ({ productInCart }: any) => (
    <div data-testid="cart-product-item">{productInCart.title}</div>
  ),
}));

describe("CartProductList", () => {
  const mockClearCart = jest.fn();

  const mockItems = [
    {
      cartItemId: "abc1",
      id: 1,
      title: "Produto 1",
      price: 10,
      quantity: 2,
      image: "img1",
    },
    {
      cartItemId: "abc2",
      id: 2,
      title: "Produto 2",
      price: 20,
      quantity: 1,
      image: "img2",
    },
  ];

  beforeEach(() => {
    (useCartStore as any).mockImplementation((selector: any) =>
      selector === expect.any(Function)
        ? selector({ items: mockItems, clearCart: mockClearCart })
        : mockItems
    );
    jest.clearAllMocks();
  });

  it("deve renderizar o título com a quantidade total de produtos", () => {
    (useCartStore as any).mockImplementation((selector: any) =>
      selector({ items: mockItems, clearCart: mockClearCart })
    );
    render(<CartProductList />);
    expect(screen.getByText("Produtos (3)")).toBeInTheDocument();
  });

  it("deve desabilitar o botão Limpar se o carrinho estiver vazio", () => {
    (useCartStore as any).mockImplementation((selector: any) =>
      selector({ items: [], clearCart: mockClearCart })
    );
    render(<CartProductList />);
    const clearButton = screen.getByRole("button", { name: /limpar/i });
    expect(clearButton).toBeDisabled();
  });
});
