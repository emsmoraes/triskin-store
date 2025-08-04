import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col py-0 lg:h-screen lg:flex-row lg:py-3">
      {/* <AddHeaderHere /> */}
      <div className="h-full w-full pr-3 pl-3 lg:pl-0">
        <div className="h-full w-full overflow-auto rounded-3xl bg-transparent pt-6 lg:mt-0 lg:bg-[#F9F9F9] lg:pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
