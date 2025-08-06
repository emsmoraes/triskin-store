import { Button } from "@/shared/components/ui/button";
import { useCartStore } from "@/shared/stores/useCartStore";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartProductItem } from "../CartProductItem";

function CartProductList() {
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="bg-white p-4 w-full">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-2xl font-bold uppercase text-zinc-800">
          Produtos ({totalQuantity})
        </h2>

        <Button
          variant="outline"
          disabled={items.length === 0}
          className="border border-red-600 text-red-600 hover:bg-red-100/60 hover:text-red-600 transition-colors duration-200 flex items-center gap-2"
          onClick={clearCart}
        >
          <FaRegTrashAlt size={18} />
          Limpar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((productInCart) => (
          <CartProductItem
            key={productInCart.cartItemId}
            productInCart={productInCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CartProductList;
