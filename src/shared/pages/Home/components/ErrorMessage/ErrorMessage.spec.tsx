import { ErrorMessage } from ".";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("ErrorMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar toast.error com mensagem e descrição", () => {
    ErrorMessage({ message: "Erro!", description: "Algo deu errado" });
    expect(toast.error).toHaveBeenCalledWith("Erro!", {
      description: "Algo deu errado",
      action: undefined,
    });
  });

  it("deve chamar toast.error com action se actionLabel for passado", () => {
    const onActionClick = jest.fn();
    ErrorMessage({
      message: "Erro!",
      description: "Algo deu errado",
      actionLabel: "Tentar novamente",
      onActionClick,
    });
    expect(toast.error).toHaveBeenCalledWith("Erro!", {
      description: "Algo deu errado",
      action: {
        label: "Tentar novamente",
        onClick: onActionClick,
      },
    });
  });

  it("deve usar função vazia se onActionClick não for passado", () => {
    ErrorMessage({
      message: "Erro!",
      actionLabel: "Fechar",
    });
    expect(toast.error).toHaveBeenCalledWith("Erro!", {
      description: undefined,
      action: {
        label: "Fechar",
        onClick: expect.any(Function),
      },
    });
  });
});