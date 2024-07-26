import { Navbar } from "@components/Authentication";
import { Input } from "@components/FormControls";
import { Button } from "@components/UI";
import { Flex, Spin } from "antd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = function (data) {
    const { email } = data;
    const getOTP = async function () {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");

      const formdata = new FormData();
      formdata.append("email", email);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const resp = await fetch(
        "https://test7.accrualdev.com/api/send/otp",
        requestOptions
      );
      const data = await resp.json();
      if (data.status >= 200 && data.status < 300) {
        toast.success(data.message);
        navigate("/verify-email", { email });
      }
      if (data.status === 422) toast.error(data.message);
    };

    if (email) getOTP();
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
            <Button
              variant="gradient"
              type="submit"
              className="w-full mt-5 py-3 "
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Flex align="center" gap="middle">
                  <Spin indicator={<LoadingOutlined spin />} size="small" />
                </Flex>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
