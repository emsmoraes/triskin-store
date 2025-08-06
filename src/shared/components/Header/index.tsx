import { useScrollDirection } from "@/shared/components/Header/hooks/useScrollDirection";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import CartIcon from "../CartIcon";

const Header = () => {
  const scrollDirection = useScrollDirection();

  const navigate = useNavigate();

  return (
    <header
      className={`
  fixed top-0 left-0 right-0 z-50
  justify-between h-16 flex py-3 px-2 sm:px-6 lg:px-12
  max-w-[2000px] mx-auto
  bg-white dark:bg-zinc-900 border-b border-solid border-zinc-200
  transition-transform duration-300 rounded-md
  ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}
`}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xl bg-gradient-to-r from-orange-500 to-pink-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          TS
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          Triskin Store
        </span>
      </div>
      <CartIcon />
    </header>
  );
};

export default Header;
