import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { Navbar } from "@components/Authentication";
import { Form, PasswordBox, TextBox } from "@components/FormControls";
import toast from "react-hot-toast";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { loginValidationSchema } from "@services/schema";
import { useFormik } from "formik";
import { Loader } from "@components/UI";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await clientBaseURL.post(
          `${clientEndPoints?.login}`,
          values
        );

        if (response?.status >= 200 && response?.status < 300) {
          localStorage.setItem("token", response?.data?.token);
          toast.success(response?.data?.message);
          setIsAuthenticated(true);
          navigate("/dashboard");
          actions.resetForm();
        }
      } catch (error) {
        if (error?.response) {
          toast.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      }
    },
  });
  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard");
    },
    [isAuthenticated, navigate]
  );

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
          <Form action="" onSubmit={handleSubmit}>
            <TextBox
              label="Email address"
              name="email"
              className="mb-4"
              placeholder="example@gmail.com"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />
            <PasswordBox
              label="Password"
              type="password"
              name="password"
              placeholder="Enter Password"
              className="mb-4"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.password}
              touched={touched.password}
            />
            <Button
              type="submit"
              className="w-full  text-white btn-gradient px-4 py-3 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Loader width={"24px"} height={"24px"} color="#fff" />
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
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
