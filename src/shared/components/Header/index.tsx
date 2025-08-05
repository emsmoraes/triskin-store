import { useScrollDirection } from "@/layouts/DashboardLayout/hooks/useScrollDirection";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        justify-between h-16 flex py-3 px-2 max-w-[2000px] mx-auto
        bg-white dark:bg-zinc-900 border-b border-solid border-zinc-200 transition-transform duration-300 rounded-md
        ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xl bg-gradient-to-r from-orange-500 to-pink-500">
          T
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          triskin-store
        </span>
      </div>
      <button
        className="p-2 rounded hover:bg-pink-50 transition"
        aria-label="Carrinho"
      >
        <FaShoppingCart size={28} className="text-pink-500" />
      </button>
    </header>
  );
};

export default Header;
