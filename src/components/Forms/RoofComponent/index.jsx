import { useForm, Controller } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { SingleUsePdf, TextPage } from "@components/Payment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRooferComponent } from "@services/apiDesignMeeting";
import { createRoofComponent as createRoofComponentApi } from "@services/apiDesignMeeting";
import { RenameFileUI, Button } from "@components/UI";
import { UploaderInputs } from "@components/index";
import { ArrowFileIcon } from "@components/UI";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export default function RoofComponent() {
  const [defaultImages, setDefaultImages] = useState([]);
  const { id: jobId } = useParams();
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: async function () {
      const resp = await getRooferComponent(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        if (resp.data.data.pdfs.length > 0)
          setDefaultImages(resp.data.data.pdfs);
        return { ...resp.data.data, selectedOption: 1 };
      } else {
        return { selectedOption: 1, content: "", acknowledge: false };
      }
    },
  });

  const [selectedOption, setSelectedOption] = useState(1);
  const dispatch = useDispatch();
  const { formError } = useSelector((store) => store.roofer);

  const onsubmit = async (data) => {
    const { selectedOption, acknowledge, content, pdfs } = data;

    const formData = new FormData();
    formData.append("acknowledge", Number(acknowledge));
    formData.append(
      "title",
      selectedOption === 1 ? "Single Use PDFs" : "Text Page"
    );
    formData.append("content", content || "");

    // Ensure that pdfs are included in the payload, even if empty
    if (selectedOption === 1) {
      if (Object.keys(pdfs).length > 0) {
        for (let file of Object.values(pdfs)) {
          formData.append("pdfs[]", file);
        }
      } else {
      }
    } else {
      formData.append("pdfs[]", ""); // Append an empty string or null to indicate no PDFs
    }

    console.log("FORMDATA", Object.fromEntries(formData));

    try {
      const resp = await createRoofComponentApi(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#18faf8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="flex item-center justify-center"
      />
    );
  }

  return (
    <>
      <Controller
        name="acknowledge"
        control={control}
        render={({ field }) => (
          <Header
            onClick={(checked) => field.onChange(checked)}
            wrapperClass="pb-6 border-b border-gray-200"
            defaultChecked={field.value}
          />
        )}
      />
      <form className="py-8 md:py-0" onSubmit={handleSubmit(onsubmit)}>
        <PdfOptions
          control={control}
          name="selectedOption"
          verticle={true}
          onOptionSelected={setSelectedOption}
          className="py-6 border-b border-gray-200"
        />
        {selectedOption === 1 ? (
          <>
            <UploaderInputs
              register={register}
              id="pdfs"
              name="pdfs"
              icon={<ArrowFileIcon />}
              fileTypes={["application/pdf"]}
            />
            {defaultImages?.length > 0 ? (
              <RenameFileUI
                files={defaultImages}
                apiUpdateFileEndPoint="/api/change/roof-component/file-name"
                apiDeleteFileEndpoint="/api/delete/roof-component/media"
              />
            ) : null}
          </>
        ) : (
          <TextPage control={control} name="content" errors={errors} />
        )}
        <Button type="submit" variant="gradient" className="mt-4">
          {isSubmitting ? (
            <Loader width={"24px"} height={"24px"} color="#fff" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </>
  );
}
