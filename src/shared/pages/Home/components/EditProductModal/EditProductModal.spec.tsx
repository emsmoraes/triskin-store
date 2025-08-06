import { screen, fireEvent } from "@testing-library/react";
import EditProductModal from ".";
import { renderWithQueryClient } from "@/test/test-utils";
import "@testing-library/jest-dom";

const defaultValues = {
  title: "Produto Teste",
  price: 99.99,
  image: "",
};

describe("EditProductModal", () => {
  it("deve abrir o modal ao clicar no botão de editar", async () => {
    renderWithQueryClient(
      <EditProductModal productId={1} defaultValues={defaultValues} />
    );
    const openButton = screen.getByRole("button");
    fireEvent.click(openButton);
    expect(await screen.findByText("Editar produto")).toBeInTheDocument();
  });

  it("deve mostrar os valores iniciais do formulário", async () => {
    renderWithQueryClient(
      <EditProductModal productId={1} defaultValues={defaultValues} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(
      await screen.findByDisplayValue("Produto Teste")
    ).toBeInTheDocument();
    expect(
      (
        screen.getByPlaceholderText("Preço do produto") as HTMLInputElement
      ).value.replace(/\s/g, "")
    ).toBe("R$99,99");
  });

  it("deve validar campos obrigatórios", async () => {
    renderWithQueryClient(
      <EditProductModal productId={1} defaultValues={defaultValues} />
    );
    fireEvent.click(screen.getByRole("button"));

    const input = await screen.findByPlaceholderText("Digite o título");
    fireEvent.change(input, { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /salvar alterações/i }));
    expect(
      await screen.findByText("O titulo é obrigatório")
    ).toBeInTheDocument();
  });

  it("deve desabilitar o botão de salvar se nada foi alterado", async () => {
    renderWithQueryClient(
      <EditProductModal productId={1} defaultValues={defaultValues} />
    );
    fireEvent.click(screen.getByRole("button"));
    const saveButton = await screen.findByRole("button", {
      name: /salvar alterações/i,
    });
    expect(saveButton).toBeDisabled();
  });

  it("deve habilitar o botão de salvar se algum campo for alterado", async () => {
    renderWithQueryClient(
      <EditProductModal productId={1} defaultValues={defaultValues} />
    );
    fireEvent.click(screen.getByRole("button"));
    const input = await screen.findByPlaceholderText("Digite o título");
    fireEvent.change(input, { target: { value: "Novo Título" } });
    const saveButton = await screen.findByRole("button", {
      name: /salvar alterações/i,
    });
    expect(saveButton).not.toBeDisabled();
  });
});
