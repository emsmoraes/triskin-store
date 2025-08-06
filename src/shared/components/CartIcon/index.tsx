import { Button } from "../ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/shared/stores/useCartStore";
import { useNavigate } from "react-router-dom";

function CartIcon() {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="relative">
      <Button
        onClick={handleNavigateToCart}
        variant={"outline"}
        size={"icon"}
        className="p-2 rounded hover:bg-pink-50 transition"
        data-testid="shopping-cart-icon"
      >
        <FaShoppingCart size={20} className="text-pink-500" />
      </Button>

      {totalQuantity > 0 && (
        <button
          onClick={handleNavigateToCart}
          className="absolute -bottom-1 -right-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center cursor-pointer"
        >
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </button>
      )}
    </div>
  );
}

export default CartIcon;
