import { render, screen, fireEvent } from "@testing-library/react";
import { BackButton } from ".";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("BackButton", () => {
  it("deve renderizar o botão com o texto e ícone", () => {
    render(<BackButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("deve chamar navigate(-1) ao clicar", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<BackButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});