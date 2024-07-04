import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@components";
import { useForm } from "react-hook-form";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
