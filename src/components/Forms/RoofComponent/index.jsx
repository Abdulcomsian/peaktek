import { ArrowFileIcon, Button, RenameFileUI } from "@components/UI";
import { UploaderInputs } from "@components/index";
import { createRoofComponent } from "@services/apiDesignMeeting";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function RoofComponent() {
  const { id: jobId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = async function (data) {
    const resp = await createRoofComponent(data, jobId);
    console.log(resp);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UploaderInputs
        register={register}
        id="pdfs"
        name="pdfs"
        icon={<ArrowFileIcon />}
        fileTypes={["application/pdf"]}
        error={errors.pdfs && formatErrorName(errors.pdfs.message)}
        setValue={setValue} // You may need to pass this prop if UploaderInputs does not manage its own state
      />
      <RenameFileUI />
      <Button variant="gradient" type="submit">
        Save
      </Button>
    </form>
  );
}
