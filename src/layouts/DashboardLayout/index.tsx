import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col w-full items-center bg-zinc-100 dark:bg-zinc-900 min-h-screen pt-16">
      <Header />
      <div className="max-w-[2000px] w-full min-h-full pb-7 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
