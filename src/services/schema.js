import * as Yup from "yup";

const adjustorMeetingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{12}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
  time: Yup.string().required("Time is required"),
  date: Yup.date().required("Date is required").typeError("Invalid date"),
});
const overturnMeetingSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  time: Yup.string().required("Time is required"),
  date: Yup.date().required("Date is required").typeError("Invalid date"),
});

export { adjustorMeetingSchema, overturnMeetingSchema };
