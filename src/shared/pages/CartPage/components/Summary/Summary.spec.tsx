import { render, screen, fireEvent } from "@testing-library/react";
import Summary from ".";
import { useCartStore } from "@/shared/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "@testing-library/jest-dom";

jest.mock("@/shared/stores/useCartStore", () => ({
  useCartStore: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Summary", () => {
  const mockNavigate = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useCartStore as any).mockReturnValue({
      items: [
        { id: 1, title: "Produto 1", price: 100, quantity: 1 },
        { id: 2, title: "Produto 2", price: 50, quantity: 2 },
      ],
      clearCart: mockClearCart,
      getTotalPrice: () => 200,
    });
    jest.clearAllMocks();
  });

  it("deve renderizar os valores do resumo corretamente", () => {
    render(<Summary />);
    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByText("Valor dos produtos:")).toBeInTheDocument();
    const valores = screen.getAllByText(/R\$ ?200,00/);
    expect(valores[0]).toBeInTheDocument();
    expect(screen.getByText("Valor do frete:")).toBeInTheDocument();
    expect(screen.getByText("R$ 0,00")).toBeInTheDocument();
    expect(screen.getByText("Total à prazo:")).toBeInTheDocument();
    expect(screen.getByTestId("pix-summary")).toBeInTheDocument();
    expect(screen.getByText("Finalizar Compra")).toBeInTheDocument();
    expect(screen.getByText("Comprar mais")).toBeInTheDocument();
  });

  it("deve finalizar compra e limpar carrinho se houver produtos", () => {
    render(<Summary />);
    fireEvent.click(screen.getByText("Finalizar Compra"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockClearCart).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Pedido realizado!", {
      position: "bottom-right",
    });
  });

  it("deve mostrar erro se tentar finalizar compra sem produtos", () => {
    (useCartStore as any).mockReturnValue({
      items: [],
      clearCart: mockClearCart,
      getTotalPrice: () => 0,
    });
    render(<Summary />);
    fireEvent.click(screen.getByText("Finalizar Compra"));
    expect(toast.error).toHaveBeenCalledWith(
      "Você não possui produtos no carrinho",
      { position: "bottom-right" }
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockClearCart).not.toHaveBeenCalled();
  });

  it("deve navegar para / ao clicar em 'Comprar mais'", () => {
    render(<Summary />);
    fireEvent.click(screen.getByText("Comprar mais"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
