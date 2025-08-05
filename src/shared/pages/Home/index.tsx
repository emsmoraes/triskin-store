import { Button } from "@/shared/components/ui/button";
import { ErrorMessage } from "./components/ErrorMessage";
import Loader from "./components/Loader";
import ProductList from "./components/ProductList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "@/shared/services";
import type { Product } from "@/shared/interfaces";

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const queryClient = useQueryClient();

  const handleError = () => {
    ErrorMessage({
      message: "Erro ao buscar produtos",
      description: "Verifique sua conexão e tente novamente",
      actionLabel: "Tentar de novo",
      onActionClick: () => console.log("Retrying..."),
    });
  };

  const createProductMutation = useMutation({
    mutationFn: (product: Omit<Product, "id" | "createdAt">) =>
      createProduct(product),
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(["products"], (oldData = []) => [
        ...oldData,
        newProduct,
      ]);
    },
    onError: () => {
      ErrorMessage({
        message: "Erro ao criar produto",
        description: "Não foi possível criar o produto. Tente novamente.",
        actionLabel: "Tentar de novo",
        onActionClick: () => handleCreateProduct(),
      });
    }
  });

  const handleCreateProduct = () => {
    createProductMutation.mutate({
      title: "Produto de Teste",
      price: 99.9,
      description: "Descrição do produto de teste",
      category: "electronics",
      image: "https://i.pravatar.cc/300",
    });
  };

  return (
    <div className="w-full p-4 items-center gap-2">
      <Button
        variant={"gradient"}
        onClick={handleCreateProduct}
        className="mb-5 mr-4"
      >
        <Loader className="text-white" size={20} active={true} />
        criar produto
      </Button>
      <Button variant={"gradient"} onClick={handleError} className="mb-5">
        <Loader className="text-white" size={20} active={true} />
        Testar erro
      </Button>

      <ProductList data={data} error={error} isLoading={isLoading} />
    </div>
  );
}

export default Home;
