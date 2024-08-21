import { ArrowFileIcon } from "@components/UI";
import { UploaderInputs } from "@components/index";
import { useForm } from "react-hook-form";

export default function XactimateReport() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        error={errors.pdfs && formateErrorName(errors?.pdfs?.message)}
      />
    </form>
  );
}
