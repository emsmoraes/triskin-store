import { TbLoader2 } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  className?: string;
  active: boolean;
}

function Loader({ size = 32, className, active = true }: LoaderProps) {
  if (!active) return null;
  return (
    <TbLoader2
      data-testid="loader-icon"
      size={size}
      className={cn("animate-spin text-[#fb7185]", className)}
    />
  );
}

export default Loader;
