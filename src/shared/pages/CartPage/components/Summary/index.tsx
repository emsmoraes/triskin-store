import { BsFileEarmarkTextFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCartStore } from "@/shared/stores/useCartStore";
import { formatPriceBRL } from "@/shared/utils/formatPriceBRL";
import { Button } from "@/shared/components/ui/button";

function Summary() {
  const navigate = useNavigate();
  const { items, clearCart, getTotalPrice } = useCartStore();

  const total = getTotalPrice();
  const splitValue = () => formatPriceBRL(total / 10);

  const buyProducts = () => {
    if (items.length > 0) {
      navigate("/");
      clearCart();
      toast.success("Pedido realizado!", { position: "bottom-right" });
    } else {
      toast.error("Você não possui produtos no carrinho", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full sm:max-w-96 p-4 border rounded-lg shadow-md flex flex-col gap-4 bg-white h-fit self-start sticky top-4">
      <div className="flex items-center gap-2 mb-8">
        <BsFileEarmarkTextFill fontSize={23} />
        <h1 className="text-lg font-bold text-gray-800">Resumo</h1>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Valor dos produtos:</span>
        <b>{formatPriceBRL(total)}</b>
      </div>
      <hr className="border-gray-200" />

      <div className="flex justify-between text-sm text-gray-700">
        <span>Valor do frete:</span>
        <b>R$ 0,00</b>
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-700">
        <div className="flex justify-between font-semibold">
          <span>Total à prazo:</span>
          <b>{formatPriceBRL(total)}</b>
        </div>
        <span className="text-xs text-gray-500">
          (em até <b>10x</b> de <b>{splitValue()}</b> sem juros)
        </span>
      </div>

      <div
        className="flex flex-col gap-1 text-sm text-gray-700"
        data-testid="pix-summary"
      >
        <span>
          Valor à vista no <b>Pix:</b>
        </span>
        <div className="text-lg font-bold text-orange-600">
          {formatPriceBRL(total)}
          <span className="block text-xs font-normal text-gray-500">
            (Confirmação <b>imediata</b>)
          </span>
        </div>
      </div>

      <Button variant={"gradient"} onClick={buyProducts}>
        Finalizar Compra
      </Button>
      <Button
        variant={"outline"}
        onClick={() => navigate("/")}
        className="w-full py-2 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
      >
        Comprar mais
      </Button>
    </div>
  );
}

export default Summary;
