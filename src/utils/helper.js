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
