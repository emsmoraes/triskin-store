import { TbLoader2 } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  className?: string;
}

function Loader({ size = 32, className }: LoaderProps) {
  return (
    <TbLoader2
      size={size}
      className={cn("animate-spin text-[#fb7185]", className)}
    />
  );
}

export default Loader;
