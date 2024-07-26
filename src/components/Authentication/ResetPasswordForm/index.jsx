import { Navbar } from "@components/Authentication";
import { useForm } from "react-hook-form";
import { Input } from "@components/FormControls";
import { Button } from "@components/UI";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const formInputData = [
  { name: "password", label: "Password", placeholder: "New Password" },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Confirm your password",
  },
];

export default function ResetPasswordForm() {
  const [searchParam, setSearchParam] = useSearchParams();
  const email = searchParam.get("email");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const onSubmit = function (data) {
    const { password, confirm_password } = data;
    const setNewPasssword = async function () {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");

      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("confirm_password", confirm_password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const resp = await fetch(
        "https://test7.accrualdev.com/api/change/password",
        requestOptions
      );
      const data = await resp.json();
      if (data.status >= 200 && data.status < 300) {
        toast.success(data.message);
        navigate("/");
      }

      if (data.status === 422) toast.error(data.message);
    };
    setNewPasssword();
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Navbar btnText="Register" />
      <div className="max-w-md mx-auto mt-6">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl text-gray-700 mb-9">
            Reset Password
          </h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {formInputData.map((data) => (
              <Input
                key={data.name}
                label={data.label}
                name={data.name}
                applyMarginBottom={true}
                className="mb-2"
                placeholder={data.placeholder}
                register={register}
                error={errors?.[data.name]?.message}
              />
            ))}
            <Button
              variant="gradient"
              type="submit"
              className="w-full mt-5 py-3 "
              disabled={isLoading}
            >
              {isLoading ? <Spin /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
