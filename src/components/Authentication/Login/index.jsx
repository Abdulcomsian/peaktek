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

const Login = () => {
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
    const resp = await login(data);
    console.log(resp);
    if (resp.status >= 200 && resp.status < 300) {
      localStorage.setItem("token", resp.data.token);
      setIsAuthenticated(true);
      navigate("/dashboard");
      toast.success(resp.data.message);
    } else {
      toast.error(resp.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Register" />
      <div className="max-w-md mx-auto mt-6">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl text-gray-700 text-center mb-9">
            Log in to PeakTek
          </h1>
          {/* <Button className="flex justify-center items-center text-gray-700 font-medium text-base  hover:bg-blue-50 border border-blue-200 rounded-full px-3 py-2 mr-3 mb-4">
            <FcGoogle className="w-5 h-5 mr-2" /> Login with Google
          </Button>
          <Button className="flex justify-center items-center text-gray-700 font-medium text-base  hover:bg-blue-50 border border-blue-200 rounded-full px-3 py-2 mr-2 mb-4">
            <MdFacebook className="w-6 h-6 mr-2 text-[#4267B2]" /> Login with
            Facebook
          </Button> */}
          {/* <div className="flex items-center mb-4 text-sm font-medium text-gray-500">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4">Or, sign in with email</span>
            <div className="flex-grow border-t border-gray-300" />
          </div> */}
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
            {/* <Button
              className="text-blue-600 font-medium text-base"
              to="/register"
            >
              Register
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
