import * as Yup from "yup";
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});
const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
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
const readyToBuildSchema = Yup.object().shape({
  recipient: Yup.string().required("Recipient is required"),
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.date().nullable().required("Time is required"),
  text: Yup.string().required("Text is required"),
  sub_contractor_id: Yup.number().required("Sub Contractor Id is required"), // Add validation for sub_contractor_id
});
const cocSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.number().required("Phone is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.number().required("Zip Code is required"),
  insurance: Yup.string().required("Insurance is required"),
  claim_number: Yup.number().required("Claim Number is required"),
  policy_number: Yup.number().required("Policy Number is required"),
  awarded_to: Yup.string().required("Awarded To is required"),
  released_to: Yup.string().required("Released To is required"),
  job_total: Yup.number().required("Job Total is required"),
  customer_paid_upgrades: Yup.number().required(
    "Customer Paid Upgrades is required"
  ),
  deductible: Yup.string().required("Deductible is required"),
  acv_check: Yup.string().required("ACV Check is required"),
  rcv_check: Yup.string().required("RCV Check is required"),
  supplemental_items: Yup.string().required("Supplemental Items are required"),
  company_representative: Yup.string().required(
    "Company Representative is required"
  ),
  company_printed_name: Yup.string().required(
    "Company Printed Name is required"
  ),
  company_signed_date: Yup.date().required("Company Signed Date is required"),
});
const schedulingSchema = Yup.object().shape({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.string()
    .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
    .required("Zip code is required"),
  insurance: Yup.string().required("Insurance is required"),
  claim_number: Yup.string().required("Claim number is required"),
  policy_number: Yup.string().required("Policy number is required"),
  date_needed: Yup.date().nullable().required("Delivery Date is required"),
  square_count: Yup.number()
    .positive("Square count must be positive")
    .required("Square count is required"),
  total_perimeter: Yup.number()
    .positive("Total perimeter must be positive")
    .required("Total perimeter is required"),
  build_date: Yup.date().nullable().required("Build date is required"),
  ridge_lf: Yup.number()
    .positive("Ridge LF must be positive")
    .required("Ridge LF is required"),
  valley_sf: Yup.number()
    .positive("Valley SF must be positive")
    .required("Valley SF is required"),
  hip_and_ridge_lf: Yup.number()
    .positive("Hip and Ridge LF must be positive")
    .required("Hip and Ridge LF is required"),
  drip_edge_lf: Yup.number()
    .positive("Drip Edge LF must be positive")
    .required("Drip Edge LF is required"),
  materials: Yup.array()
    .of(
      Yup.object().shape({
        material: Yup.string().required("Material is required"),
        quantity: Yup.number()
          .positive("Quantity must be positive")
          .required("Quantity is required"),
        color: Yup.string().required("Color is required"),
        order_key: Yup.string().required("Order key is required"),
      })
    )
    .min(1, "At least one material must be added"),
  supplier_id: Yup.number().required("Supplier Id is required"),
});

const inProgressSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"), // Changed to string to handle phone numbers properly
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.string().required("Zip code is required"), // Changed to string to handle zip codes properly
  claim_number: Yup.string().required("Claim number is required"),
  policy_number: Yup.string().required("Policy number is required"),
  insurance: Yup.string().required("Insurance is required"),
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

  materials: Yup.array()
    .of(
      Yup.object().shape({
        material: Yup.string().required("Material is required"),
        damaged: Yup.boolean(),
        notes: Yup.string().required("Notes is required"),
      })
    )
    .min(1, "At least one material is required"),
});

const renameFilesSchema = Yup.object().shape({
  file_name: Yup.string()
    .required("File name is required")
    .matches(
      /^[a-zA-Z0-9_\- ]+$/,
      "File name can only contain letters, numbers, underscores, hyphens, and spaces"
    )
    .min(3, "File name must be at least 3 characters long")
    .max(50, "File name cannot exceed 50 characters"),
});
export {
  loginValidationSchema,
  addUserSchema,
  adjustorMeetingSchema,
  overturnMeetingSchema,
  createAgreementSchema,
  readyToBuildSchema,
  cocSchema,
  inProgressSchema,
  schedulingSchema,
  renameFilesSchema,
};
