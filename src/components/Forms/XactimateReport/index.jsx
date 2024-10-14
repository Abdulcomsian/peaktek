import { useForm, Controller } from "react-hook-form";
import Header from "../Sidebar/PaymentSchedule/Header";
import PdfOptions from "../Sidebar/PaymentSchedule/PdfOptions";
import { SingleUsePdf, TextPage } from "@components/Payment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRooferComponent,
  getXactimatereport,
} from "@services/apiDesignMeeting";
import { createXactimatereport as createXactimatereportApi } from "@services/apiDesignMeeting";
import { RenameFileUI, Button } from "@components/UI";
import { UploaderInputs } from "@components/index";
import { ArrowFileIcon, Loader } from "@components/UI";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "@context/AuthContext";

export default function RoofComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
      const resp = await getXactimatereport(jobId);
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
      // formData.append("pdfs[]", ""); // Append an empty string or null to indicate no PDFs
    }

    try {
      const resp = await createXactimatereportApi(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
          className="py-6 border-b border-gray-200 mb-5"
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
                apiUpdateFileEndPoint="/api/change/xactimate-report/file-name"
                apiDeleteFileEndpoint="/api/delete/xactimate-report/media"
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
