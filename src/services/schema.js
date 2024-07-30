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

const createAgreementSchema = Yup.object({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.string()
    .required("Zip code is required")
    .matches(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  insurance: Yup.string().required("Insurance is required"),
  claim_number: Yup.string().required("Claim number is required"),
  policy_number: Yup.string().required("Policy number is required"),
  company_signature: Yup.string().required("Company signature is required"),
  company_printed_name: Yup.string().required(
    "Company printed name is required"
  ),
  company_date: Yup.date().required("Company date is required"),
  customer_signature: Yup.string().required("Customer signature is required"),
  customer_printed_name: Yup.string().required(
    "Customer printed name is required"
  ),
  customer_date: Yup.date().required("Customer date is required"),
});
// Define the validation schema using Yup
const readyToBuildSchema = Yup.object().shape({
  recipient: Yup.string().required("Recipient is required"),
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.date().nullable().required("Time is required"),
  text: Yup.string().required("Text is required"),
});

export { adjustorMeetingSchema, overturnMeetingSchema, createAgreementSchema,readyToBuildSchema };
