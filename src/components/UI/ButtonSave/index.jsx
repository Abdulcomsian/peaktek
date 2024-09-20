import { Button, Loader } from "..";

export default function ButtonSave({
  isLoading = false,
  disabled = false,
  text = "SAVE",
  className = "",
}) {
  return (
    <Button
      type="submit"
      variant="gradient"
      className={`${className} w-fit mt-2 text-sm`}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader width={"24px"} height={"24px"} color="#fff" />
        </div>
      ) : (
        text
      )}
    </Button>
  );
}
