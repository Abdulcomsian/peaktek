import { Input } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { UploaderInputs } from "@components/index";
import { Ckeditor } from "@components/FormControls";
import { ImageIcon, Loader, RenameFileUI } from "@components/UI";

export default function COCInsuranceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataChange = (dataToMap, id) => {
    // Update the receivedData based on the id
    setReceivedData((prevData) => {
      const newData = [...prevData];
      newData[id] = dataToMap;
      return newData;
    });
  };

  const onSubmit = function (data) {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          register={register}
          label="Sent to:"
          type="email"
          placeholder="insurance@email.com"
        />
        <Input
          register={register}
          label="Subject"
          type="email"
          placeholder="Claim # number"
        />
        {/* <Ckeditor
          className=" md:col-start-1 col-span-2 md:col-span-1"
          onChange={(data) => handleDataChange(data, index)}
          initialData="test"
        /> */}
        {/* <div>
          <UploaderInputs
            wrapperClass="col-span-2 md:col-span-1"
            name="attachments"
            register={register}
            icon={<ImageIcon />}
            require={false}
            fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          />
          {row?.attachment && (
            <RenameFileUI
              files={row.attachment}
              apiUpdateFileEndPoint="/api/change/project-design-inspection/file-name"
              apiDeleteFileEndpoint="/api/delete/project-design-inspection/media"
            />
          )}
        </div> */}
      </div>
    </form>
  );
}
