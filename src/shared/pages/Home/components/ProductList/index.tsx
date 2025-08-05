import type { Product } from "@/shared/interfaces";

interface ProductListProps {
  isLoading: boolean;
  error: Error | null;
  data: Product[] | undefined;
}

function ProductList({ data, error, isLoading }: ProductListProps) {
  if (isLoading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar produtos.</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((product) => (
          <div key={product.id}>
            {product.title}
            <img src={product.image} alt={product.title} />
          </div>
        ))
      ) : (
        <div>Nenhum produto encontrado.</div>
      )}
    </div>
  );
}

export default ProductList;
