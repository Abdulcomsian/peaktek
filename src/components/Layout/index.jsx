import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@components";
import { useForm } from "react-hook-form";

const AppLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Header />
        <Outlet />
      </form>
    </div>
  );
};

export default AppLayout;
