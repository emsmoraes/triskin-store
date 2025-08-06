import type { Product } from "@/shared/interfaces";
import { Button } from "@/shared/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { formatPriceBRL } from "@/shared/utils/formatPriceBRL";
import { TbPhotoOff } from "react-icons/tb";
import { cn } from "@/lib/utils";
import EditProductButton from "../EditProductButton";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const isActive = !(product.price % 2 === 0);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col gap-4 max-w-md mx-auto w-full group">
      <div className="w-full h-50 rounded-lg flex items-center justify-center overflow-hidden py-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full bg-white group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <TbPhotoOff size={35} />
            <span className="text-sm mt-2">Sem imagem</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold line-clamp-2">{product.title}</h3>
        <div className="text-2xl font-bold mt-1 mb-2">
          {formatPriceBRL(product.price)}
        </div>

        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full bg-zinc-800 text-white text-xs font-medium",
              isActive ? "bg-green-800" : "bg-red-900"
            )}
          >
            {isActive ? "Ativo" : "Inativo"}
          </span>
          <div className="flex gap-2">
            <EditProductButton productId={product.id} defaultValues={{
              title: product.title,
              price: product.price,
              image: product.image,
            }} />
            <Button variant="ghost" size="icon">
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant={"gradient"}
        className="w-full flex items-center gap-2  hover:bg-zinc-800"
      >
        <Plus className="w-5 h-5" />
        Adicionar ao carrinho
      </Button>
    </div>
  );
}

export default ProductItem;
