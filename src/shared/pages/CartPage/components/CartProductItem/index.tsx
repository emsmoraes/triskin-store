import { CartItemCounter } from "../CartItemCounter";
import type { CartItem } from "@/shared/stores/useCartStore";
import { formatPriceBRL } from "@/shared/utils/formatPriceBRL";

type Props = {
  productInCart: CartItem;
};

export const CartProductItem = ({ productInCart }: Props) => {
  return (
    <div
      className="
        flex flex-col gap-4 py-4 
        md:grid md:grid-cols-[5.5rem_2fr_1fr] md:gap-4 border-t border-gray-200
      "
    >
      <div className="flex justify-center md:block">
        <img
          src={productInCart.image}
          alt="product image"
          className="w-[5.5rem] h-[5.5rem] object-contain"
        />
      </div>

      <div className="flex flex-col flex-grow items-start gap-2 justify-center md:justify-start">
        <h1
          className="
            text-base font-bold text-[#42464d]
            overflow-hidden text-ellipsis  no-underline
            max-w-full
          "
        >
          {productInCart.title}
        </h1>
      </div>

      <div
        className="
          flex flex-col-reverse items-stretch gap-3
          sm:flex-row sm:items-end sm:justify-between
          md:flex-col md:items-end md:justify-between
          lg:flex-row lg:items-start lg:justify-between
        "
      >
        <CartItemCounter productInCart={productInCart} />

        <div
          className="
            flex flex-col gap-1 text-left
            sm:text-right sm:items-end
            md:text-right md:items-end
            lg:text-left lg:items-start
          "
        >
          <p className="text-xs font-normal text-gray-500">
            Preço à vista no PIX:
          </p>
          <h1 className="text-base leading-7 font-bold text-orange-600">
            {formatPriceBRL(productInCart.price * productInCart.quantity)}
          </h1>
        </div>
      </div>
    </div>
  );
};
