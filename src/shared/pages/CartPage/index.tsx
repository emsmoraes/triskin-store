import { BackButton } from "@/shared/components/BackButton";
import React from "react";
import SearchInput from "../Home/components/SearchInput";

function CartPage() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="w-full p-4 items-center gap-2 space-y-4">
      <BackButton />
      <SearchInput setSearchValue={setSearchValue} />
    </div>
  );
}

export default CartPage;
