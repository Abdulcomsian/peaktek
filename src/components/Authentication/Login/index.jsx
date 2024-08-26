import React, { useEffect, useState } from "react";
import { Button } from "@components/UI";
import { Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@components/Authentication";
import { Input } from "@components/FormControls";
import { useAuth } from "@context/AuthContext";
import { useForm } from "react-hook-form";
import { login } from "@services/apiAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveUser } from "@store/slices/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard");
    },
    [isAuthenticated, navigate]
  );

  const onSubmit = async function (data) {
    setIsLoading(true);
    try {
      const resp = await login(data);
      console.log("Login resp", resp);
      if (resp.status >= 200 && resp.status < 300) {
        localStorage.setItem("token", resp.data.token);
        dispatch(saveUser(resp?.data?.user));
        setIsAuthenticated(true);
        navigate("/dashboard");
        toast.success(resp.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Register" />
      <div className="max-w-md mx-auto mt-6">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl text-gray-700 text-center mb-9">
            Log in to PeakTek
          </h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              name="email"
              applyMarginBottom={true}
              className="mb-4"
              placeholder="example@gmail.com"
              register={register}
              error={errors?.email?.message}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              applyMarginBottom={true}
              className="mb-2"
              placeholder="***********"
              register={register}
              error={errors?.password?.message}
            />
            <Button
              variant="gradient"
              type="submit"
              className="w-full mt-5 py-3 "
              disabled={isLoading}
            >
              {isLoading ? <Spin /> : "Login"}
            </Button>
          </form>
          <div className="flex justify-end mt-4">
            <Link
              to="forgotpassword"
              className="text-gray-500 font-medium text-base"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
