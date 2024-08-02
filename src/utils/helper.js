export function formateErrorName(name) {
  return (
    name
      .slice(0, name.indexOf(" "))
      .replace(name[0], name[0].toUpperCase())
      .split("_")
      .join(" ") + name.slice(name.indexOf(" "), -1)
  );
}
