import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="gradient"
      onClick={() => navigate(-1)}
      className="flex items-center gap-2"
      size={"icon"}
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
}
