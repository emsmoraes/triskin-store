import type { Product } from "@/shared/interfaces";
import ProductItem from "../ProductItem";
import { ProductsSkeletonGrid } from "../ProductsSkeletonGrid";

interface ProductListProps {
  isLoading: boolean;
  error: Error | null;
  data: Product[] | undefined;
}

function ProductList({ data, error, isLoading }: ProductListProps) {
  if (isLoading)
    return (
      <ProductsSkeletonGrid
        count={15}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      />
    );
  if (error) return <div>Erro ao carregar produtos.</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
      ) : (
        <div>Nenhum produto encontrado.</div>
      )}
    </div>
  );
}

export default ProductList;
