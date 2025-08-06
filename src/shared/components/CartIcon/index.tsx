import { Button } from "../ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/shared/stores/useCartStore";

function CartIcon() {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="relative">
      <Button
        variant={"outline"}
        size={"icon"}
        className="p-2 rounded hover:bg-pink-50 transition"
        data-testid="shopping-cart-icon"
      >
        <FaShoppingCart size={20} className="text-pink-500" />
      </Button>

      {totalQuantity > 0 && (
        <span className="absolute -bottom-1 -right-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      )}
    </div>
  );
}

export default CartIcon;
