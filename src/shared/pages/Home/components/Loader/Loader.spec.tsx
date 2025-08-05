import { render, screen } from "@testing-library/react";
import Loader from ".";
import "@testing-library/jest-dom";

describe("Loader", () => {
  it("should render when active is true", () => {
    render(<Loader active={true} />);
    const loader = screen.getByTestId("loader-icon");
    expect(loader).toBeInTheDocument();
  });

  it("should not render when active is false", () => {
    const { container } = render(<Loader active={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should apply size and custom className", () => {
    render(<Loader active={true} size={48} className="custom-class" />);
    const loader = screen.getByTestId("loader-icon");
    expect(loader).toHaveClass("custom-class");
    expect(loader).toHaveAttribute("width", "48");
    expect(loader).toHaveAttribute("height", "48");
  });
});
