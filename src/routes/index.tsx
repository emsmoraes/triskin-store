import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@/shared/pages/Home";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export function Router(): ReactElement {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
