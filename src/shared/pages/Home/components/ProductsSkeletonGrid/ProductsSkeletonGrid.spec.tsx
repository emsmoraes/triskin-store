import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductsSkeletonGrid } from ".";

describe("ProductsSkeletonGrid", () => {
  it("should render the default number of skeleton cards", () => {
    render(<ProductsSkeletonGrid />);
    const skeletonCards = screen.getAllByRole("presentation");
    expect(skeletonCards).toHaveLength(4);
  });

  it("should render the specified number of skeleton cards", () => {
    render(<ProductsSkeletonGrid count={7} />);
    const skeletonCards = screen.getAllByRole("presentation");
    expect(skeletonCards).toHaveLength(7);
  });

  it("should apply custom width and height to image skeleton", () => {
    render(<ProductsSkeletonGrid count={1} width={200} height={300} />);
    const imageSkeleton = screen.getByTestId("skeleton-image");
    expect(imageSkeleton).toHaveStyle({ width: "200px", height: "300px" });
  });

  it("should apply custom className", () => {
    render(<ProductsSkeletonGrid className="custom-class" />);
    const container = screen.getByTestId("skeleton-container");
    expect(container).toHaveClass("custom-class");
  });
});