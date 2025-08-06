import { BackButton } from "@/shared/components/BackButton";
import CartProductList from "./components/CartProductList";
import Summary from "./components/Summary";

function CartPage() {
  return (
    <div className="w-full p-4 items-center gap-2 space-y-4">
      <BackButton />

      <div className="flex lg:flex-row flex-col gap-4">
        <CartProductList />
        <Summary />
      </div>
    </div>
  );
}

export default CartPage;
