import React from "react";
import { Button } from "@components/UI";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Navbar } from "@components/Authentication";
import { Input } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { register as UserRegister } from "@services/apiAuth";
import { useDispatch } from "react-redux";
import { createUser } from "@store/slices/registerSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    const datatoLoad = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await UserRegister(datatoLoad);

      localStorage.setItem("token", response.token);
      dispatch(createUser({ user: datatoLoad.name, isAuthenticated: true }));
      navigate("/");
      toast.success("User successfully created!");
    } catch (error) {
      toast.error(error.error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Login" />
      <div className="max-w-md mx-auto py-10">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl text-gray-700 text-center mb-4">
            Register to PeakTek
          </h1>
          <p className="mb-4">
            Get fast and accurate roof measurements and signature-worthy
            proposals.
          </p>

          <div className="flex items-center mb-4 text-sm font-medium text-gray-500">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2">Or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2 mb-2">
              <Input
                label="First Name"
                name="firstName"
                placeholder="Jhon"
                applyMarginBottom={true}
                register={register}
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                applyMarginBottom={true}
                register={register}
              />
            </div>
            <Input
              className="mb-2"
              label="Work email"
              name="email"
              placeholder="name@company.com"
              applyMarginBottom={true}
              register={register}
            />
            <Input
              className="mb-6"
              label="Password"
              type="password"
              name="password"
              placeholder="**********"
              applyMarginBottom={true}
              register={register}
            />
            <Button
              disabled={formState.isSubmitting}
              type="Submit"
              className="flex justify-center w-full items-center bg-gradient-to-r from-blue-400 to-blue-800 text-white font-medium text-base hover:bg-custom-gradient border border-transparent rounded-full px-3 py-2 mr-3 group"
            >
              Continue{" "}
              <FaArrowRightLong className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
          <Button variant="primaryOutline" className="my-5">
            <FcGoogle className="w-5 h-5 mr-2" /> Register with Google
          </Button>
          <Button variant="primaryOutline">
            <MdFacebook className="w-6 h-6 mr-1 text-[#4267B2]" /> Register with
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
