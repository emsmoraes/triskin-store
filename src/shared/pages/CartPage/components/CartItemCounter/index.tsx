import { Button } from "@/shared/components/ui/button";
import { useCartStore, type CartItem } from "@/shared/stores/useCartStore";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  productInCart: CartItem;
};

export const CartItemCounter = ({ productInCart }: Props) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecreaseQuantity = () => {
    updateQuantity(productInCart.cartItemId, productInCart.quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(productInCart.cartItemId, productInCart.quantity + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-fit ">
      <div className="flex flex-col items-center">
        <p className="text-xs font-normal text-center">Quant.</p>

        <div className="flex items-center gap-4">
          <Button
            disabled={productInCart.quantity === 1}
            onClick={handleDecreaseQuantity}
            size={"icon"}
            variant={"outline"}
            className="flex items-center justify-center"
          >
            <IoIosArrowBack fontSize={20} className="text-orange-600" />
          </Button>

          <h2 className="text-base leading-8 font-bold text-center">
            {productInCart.quantity}
          </h2>

          <Button
            size={"icon"}
            variant={"outline"}
            onClick={handleIncreaseQuantity}
            className="flex items-center justify-center"
          >
            <IoIosArrowForward fontSize={20} className="text-orange-600" />
          </Button>
        </div>
      </div>

      <button
        onClick={() => removeItem(productInCart.cartItemId)}
        className="text-[0.75rem] leading-4 font-semibold uppercase text-red-600 hover:text-red-600/70 transition flex items-center gap-2 cursor-pointer"
      >
        Remover
      </button>
    </div>
  );
};
