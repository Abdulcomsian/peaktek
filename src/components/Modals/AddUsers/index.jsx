import React from "react";
import { Modal } from "antd";
import { Form, TextBox } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { useFormik } from "formik";
import { clientBaseURL, clientEndPoints } from "@services/config";
import toast from "react-hot-toast";
import { addUserSchema } from "@services/schema";
import { Loader } from "@components/UI";

const AddUser = ({ roleId, heading, open, onCancel, onOk }) => {
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
      name: "",
      email: "",
    },
    enableReinitialize: true,
    validationSchema: addUserSchema,
    onSubmit: async (values, actions) => {
      console.log("Values for create user=>", values);
      console.log("Role ID=>", roleId);
      console.log("Values chk=>", {
        name: values.name,
        email: values.email,
        role_id: roleId,
      });

      try {
        const token = localStorage.getItem("token");
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createUsers}`,
          {
            name: values.name,
            email: values.email,
            role_id: roleId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          actions.resetForm();

          onOk();
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
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <h1 className="text-center text-xl font-semibold my-4">{heading}</h1>
      <Form onSubmit={handleSubmit}>
        <TextBox
          label="Name"
          placeholder="Enter your name"
          className="mb-4"
          name="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />
        <TextBox
          type="email"
          label="Email"
          placeholder="Email Address"
          className="mb-4"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />

        <div className="flex justify-center">
          <Button
            disabled={isSubmitting}
            type="Submit"
            className="w-full max-w-28 text-white btn-gradient px-4 py-2"
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Add User"
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUser;
