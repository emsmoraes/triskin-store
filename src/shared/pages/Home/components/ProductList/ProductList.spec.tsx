import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import ProductList from ".";
import type { Product } from "@/shared/interfaces";
import { renderWithQueryClient } from "@/test/test-utils";

describe("ProductList", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Produto 1",
      price: 10.5,
      category: "Categoria 1",
      image: "https://example.com/image1.jpg",
    },
    {
      id: 2,
      title: "Produto 2",
      price: 20,
      category: "Categoria 2",
      image: "https://example.com/image2.jpg",
    },
  ];

  it("should show loading skeleton when isLoading is true", () => {
    renderWithQueryClient(
      <ProductList isLoading={true} error={null} data={undefined} />
    );
    expect(screen.getByTestId("skeleton-container")).toBeInTheDocument();
  });

  it("should show error state when error is present", () => {
    renderWithQueryClient(
      <ProductList
        isLoading={false}
        error={new Error("Erro")}
        data={undefined}
      />
    );
    expect(
      screen.getByText("Erro ao carregar produtos.")
    ).toBeInTheDocument();
  });

  it("should render list of products when data is provided", () => {
    renderWithQueryClient(
      <ProductList isLoading={false} error={null} data={mockProducts} />
    );
    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", mockProducts[0].image);
    expect(images[1]).toHaveAttribute("src", mockProducts[1].image);
  });

  it("should show empty state when data is empty", () => {
    renderWithQueryClient(
      <ProductList isLoading={false} error={null} data={[]} />
    );
    expect(
      screen.getByText("Nenhum produto encontrado.")
    ).toBeInTheDocument();
  });
});
