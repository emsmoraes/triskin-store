import { render, screen, fireEvent } from "@testing-library/react";
import { CartItemCounter } from ".";
import { useCartStore } from "@/shared/stores/useCartStore";
import "@testing-library/jest-dom";

jest.mock("@/shared/stores/useCartStore", () => ({
  useCartStore: jest.fn(),
}));

describe("CartItemCounter", () => {
  const mockUpdateQuantity = jest.fn();
  const mockRemoveItem = jest.fn();

  const productInCart = {
    cartItemId: "abc1",
    id: 1,
    title: "Produto Teste",
    price: 10,
    quantity: 2,
    image: "img1",
  };

  beforeEach(() => {
    (useCartStore as any).mockReturnValue({
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });
    jest.clearAllMocks();
  });

  it("deve renderizar a quantidade corretamente", () => {
    render(<CartItemCounter productInCart={productInCart} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Quant.")).toBeInTheDocument();
  });

  it("deve chamar updateQuantity ao clicar para aumentar", () => {
    render(<CartItemCounter productInCart={productInCart} />);
    const increaseBtn = screen.getAllByRole("button")[1];
    fireEvent.click(increaseBtn);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("abc1", 3);
  });

  it("deve chamar updateQuantity ao clicar para diminuir", () => {
    render(<CartItemCounter productInCart={productInCart} />);
    const decreaseBtn = screen.getAllByRole("button")[0];
    fireEvent.click(decreaseBtn);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("abc1", 1);
  });

  it("deve desabilitar o botão de diminuir se a quantidade for 1", () => {
    render(<CartItemCounter productInCart={{ ...productInCart, quantity: 1 }} />);
    const decreaseBtn = screen.getAllByRole("button")[0];
    expect(decreaseBtn).toBeDisabled();
  });

  it("deve chamar removeItem ao clicar em Remover", () => {
    render(<CartItemCounter productInCart={productInCart} />);
    fireEvent.click(screen.getByText(/remover/i));
    expect(mockRemoveItem).toHaveBeenCalledWith("abc1");
  });
});