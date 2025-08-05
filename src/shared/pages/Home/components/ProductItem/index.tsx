import type { Product } from "@/shared/interfaces";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { formatPriceBRL } from "@/shared/utils/formatPriceBRL";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const isActive = !(product.price % 2 === 0);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-4 max-w-md mx-auto w-full">
      <div className="w-full h-40 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full bg-white"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path stroke="currentColor" strokeWidth="2" d="M8 15l4-4 4 4" />
              <rect
                x="9"
                y="9"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span className="text-sm mt-2">Sem imagem</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <div className="text-2xl font-bold mt-1 mb-2">
          {formatPriceBRL(product.price)}
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-white text-xs font-medium">
            {isActive ? "Ativo" : "Inativo"}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Pencil className="w-5 h-5 text-zinc-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        </div>
      </div>

      <Button className="w-full flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800">
        <Plus className="w-5 h-5" />
        Add to Cart
      </Button>
    </div>
  );
}

export default ProductItem;
