import { Button } from "@/shared/components/ui/button";
import { ErrorMessage } from "./components/ErrorMessage";
import Loader from "./components/Loader";

function Home() {
  const handleError = () => {
    ErrorMessage({
      message: "Erro ao buscar produtos",
      description: "Verifique sua conexão e tente novamente",
      actionLabel: "Tentar de novo",
      onActionClick: () => console.log("Retrying..."),
    });
  };

  return (
    <div className="w-full p-4 flex items-center gap-2">
      <Button variant={"gradient"} onClick={handleError}>
        <Loader className="text-white" size={20} active={true} />
        Home
      </Button>
    </div>
  );
}

export default Home;
