import { Input } from "@components/FormControls";
import { Button } from "@components/UI";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function NamedImageItems({ files, register, isSubmitting }) {
  // if(files.length > 0) return null;
  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${files?.media_url}`;
    window.open(fullFileUrl, "_blank");
  };

  const deleteFilehandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.post(
        `${clientEndPoints?.deleteOverturnFiles}/${id}`,
        { media_url: files?.media_url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (refreshData) {
          await refreshData(); // Refresh the data after deletion
        }
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    }
  };

  return (
    <>
      {files?.map((file, index) => (
        <div>
          <div className="w-full flex justify-center md:justify-start">
          <Input
            placeholder="Enter image name."
            register={register}
            name={`imagesName.${index}`}
          />
            <Button
              type="button"
              className="w-full max-w-24 text-center bg-green-500 hover:bg-green-700 px-2 py-1 mr-4 h-11 text-white"
              onClick={openFileHandler}
            >
              View File
            </Button>

            <Button variant="gradient" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Loader width={"24px"} height={"24px"} color="#fff" />
                </div>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              type="button"
              variant="deleteBtn"
              onClick={deleteFilehandler}
            >
              <RiDeleteBin6Line size={20} className="text-inherit" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
