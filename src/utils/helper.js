import { format, differenceInDays } from "date-fns";

export function formateErrorName(name) {
  return (
    name
      .slice(0, name.indexOf(" "))
      .replace(name[0], name[0].toUpperCase())
      .split("_")
      .join(" ") + name.slice(name.indexOf(" "), -1)
  );
}

export function mapToArray(Obj) {
  const hasLength = Object.values.length > 0;
  return hasLength ? Object.values(Obj) : [];
}

export function createSlug(string) {
  return string
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toLowerCase()))
    .join("-");
}

export function formateDate(date) {
  return new Intl.DateTimeFormat("en-US").format(date);
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const dateDifference = (createdDate) => {
  const today = new Date();
  const parsedCreatedDate = new Date(createdDate);
  const difference = differenceInDays(today, parsedCreatedDate);

  return difference;
};

export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const digits = value?.replace(/\D/g, "");

  // Format the phone number
  const formatted = digits?.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");

  // Return formatted value, or the original if it doesn't match the desired length
  return formatted;
};

export const formatePercentageInputValue = function (value) {
  const isValidWithPercent = /^(100|[1-9]?[0-9])%?$/.test(value);

  if (!isValidWithPercent) {
    return "Please enter a valid number between 0 and 100.";
  }

  // If it ends with '%', check the numeric part
  if (value.endsWith("%")) {
    const numberValue = parseInt(value.slice(0, -1), 10); // Extract the numeric part
    if (numberValue > 100) {
      return "Number should be less than or equal to 100.";
    }
  }
};

export const formateCurrencyInputValue = function (value) {
  const isValidWithPercent = /^\$?\d+$/.test(value);

  if (!isValidWithPercent) {
    return "Please enter a valid number.";
  }

  // If it ends with '%', check the numeric part
  if (value.endsWith("$")) {
    const numberValue = parseInt(value.slice(0, -1), 10); // Extract the numeric part
    // if (numberValue > 100) {
    //   return "Number should be less than or equal to 100.";
    // }
  }
};

export const handlePhoneChange = (e) => {
  let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
  console.log("Values", value);

  if (value.length > 3 && value.length <= 6) {
    value = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else if (value.length > 6) {
    value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
  return value;

  // setPhone(value);
  // setValue("phone", value); // Update form value in react-hook-form
};
