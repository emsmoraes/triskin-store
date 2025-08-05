import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductItem from ".";
import type { Product } from "@/shared/interfaces";

describe("ProductItem", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Premium Face Cream",
    price: 89.99,
    category: "Skincare",
    image: "https://example.com/image.jpg",
  };

  it("should render product title, price and image", () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s*89,99/)).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockProduct.image);
    expect(img).toHaveAttribute("alt", mockProduct.title);
  });

  it("should render fallback when image is missing", () => {
    render(<ProductItem product={{ ...mockProduct, image: "" }} />);
    expect(screen.getByText("Sem imagem")).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(<ProductItem product={mockProduct} />);
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("should render 'Active' badge", () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
