import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from ".";
import "@testing-library/jest-dom";

describe("SearchInput", () => {
  it("deve renderizar o input com placeholder", () => {
    const setSearchValue = jest.fn();
    render(<SearchInput setSearchValue={setSearchValue} />);
    expect(
      screen.getByPlaceholderText("Buscar produto")
    ).toBeInTheDocument();
  });

  it("deve chamar setSearchValue com debounce ao digitar", async () => {
    jest.useFakeTimers();
    const setSearchValue = jest.fn();
    render(<SearchInput setSearchValue={setSearchValue} />);
    const input = screen.getByPlaceholderText("Buscar produto");

    fireEvent.change(input, { target: { value: "abc" } });

    expect(setSearchValue).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(setSearchValue).toHaveBeenCalledWith("abc");
    });

    jest.useRealTimers();
  });
});
