import ProductList from "./components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/shared/services";
import { useState } from "react";
import SearchInput from "./components/SearchInput";

function Home() {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full p-4 items-center gap-2 space-y-4">
      <SearchInput setSearchValue={setSearchValue} />

      <ProductList
        data={filteredProducts}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Home;
