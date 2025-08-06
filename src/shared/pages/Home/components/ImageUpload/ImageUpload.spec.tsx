import { render, screen, fireEvent } from "@testing-library/react";
import ImageUpload from ".";
import "@testing-library/jest-dom";

describe("ImageUpload", () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => "blob:test");
  });
  it("deve exibir o texto padrão quando não há imagem", () => {
    render(<ImageUpload />);
    expect(screen.getByText(/clique para enviar/i)).toBeInTheDocument();
  });

  it("deve exibir a imagem quando currentImage é uma string", () => {
    render(<ImageUpload currentImage="https://example.com/image.jpg" />);
    const img = screen.getByAltText("Preview");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("deve exibir a imagem quando currentImage é um File", () => {
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    const urlSpy = jest
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:test");
    render(<ImageUpload currentImage={file} />);
    const img = screen.getByAltText("Preview");
    expect(img).toHaveAttribute("src", "blob:test");
    urlSpy.mockRestore();
  });

  it("deve chamar onChange ao selecionar um arquivo", () => {
    const onChange = jest.fn();
    render(<ImageUpload onChange={onChange} />);
    const input = screen.getByLabelText(/clique para enviar/i);
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    expect(onChange).toHaveBeenCalledWith(file);
  });

  it("deve exibir mensagem de erro se error for passado", () => {
    render(<ImageUpload error="Erro de imagem" />);
    expect(screen.getByText("Erro de imagem")).toBeInTheDocument();
  });
});
