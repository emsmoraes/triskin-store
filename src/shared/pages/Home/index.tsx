import Loader from "./components/Loader";

function Home() {
  return (
    <div className="w-full p-4 flex items-center gap-2">
      Home
      <Loader className="text-blue-300" size={20} />
    </div>
  );
}

export default Home;
