import { Input } from "@/shared/components/ui/input";
import { debounce } from "@/shared/utils/debounce";
import { SearchIcon } from "lucide-react";
import React, { useCallback } from "react";

interface SearchInputProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput({ setSearchValue }: SearchInputProps) {
  const onInput = (searchValue: string): void => {
    setSearchValue(searchValue);
  };

  const onInputWithDebouncing = useCallback(debounce(onInput, 1000), []);

  return (
    <div className="relative max-w-[800px] rounded-full p-[1px] bg-gradient-to-r from-orange-500 to-pink-500">
      <Input
        onChange={(e) => onInputWithDebouncing(e.target.value)}
        className="pl-10 pr-4 rounded-full h-[50px] bg-white border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
        placeholder="Buscar produto"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
    </div>
  );
}

export default SearchInput;
