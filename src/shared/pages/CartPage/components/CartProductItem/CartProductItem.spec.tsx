import { render, screen } from "@testing-library/react";
import { CartProductItem } from ".";
import { formatPriceBRL } from "@/shared/utils/formatPriceBRL";
import "@testing-library/jest-dom";

jest.mock("../CartItemCounter", () => ({
  CartItemCounter: () => <div data-testid="cart-item-counter" />,
}));

jest.mock("@/shared/utils/formatPriceBRL", () => ({
  formatPriceBRL: jest.fn((value) => `R$ ${value}`),
}));

describe("CartProductItem", () => {
  const productInCart = {
    cartItemId: "1",
    id: 1,
    title: "Produto Teste",
    price: 50,
    quantity: 2,
    image: "https://example.com/image.jpg",
  };

  it("deve renderizar título, imagem e preço total formatado", () => {
    render(<CartProductItem productInCart={productInCart} />);
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByAltText("product image")).toHaveAttribute("src", productInCart.image);
    expect(formatPriceBRL).toHaveBeenCalledWith(100); // 50 * 2
    expect(screen.getByText("R$ 100")).toBeInTheDocument();
  });

  it("deve renderizar o contador do item", () => {
    render(<CartProductItem productInCart={productInCart} />);
    expect(screen.getByTestId("cart-item-counter")).toBeInTheDocument();
  });

  it("deve exibir o texto do preço à vista no PIX", () => {
    render(<CartProductItem productInCart={productInCart} />);
    expect(screen.getByText(/preço à vista no PIX:/i)).toBeInTheDocument();
  });
});