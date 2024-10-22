import React, { useEffect, useState } from "react";
import { InputContainer } from "@components";
import { DateSelector, FileUploader, TextBox } from "@components/FormControls";
import { ImageIcon } from "@components/UI";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@store/slices/activeTabSlice";
import toast from "react-hot-toast";

const EstimatePreparedForm = ({
  className,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  setFieldValue,
  images,
  setImages,
}) => {
  const { id: jobId } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingStatus, setSettingStatus] = useState(false);
  const handleCompleteStatus = function (e) {
    console.log(e.target.checked);
    setIsCompleted(e.target.checked);
  };

  console.log("v", values.status, values.date);

  async function fetchStatus(e) {
    const token = localStorage.getItem("token");
    const isCompleted = e.target.checked;

    const formData = new FormData();
    formData.append("status", isCompleted);
    setSettingStatus(true);
    try {
      const resp = await clientBaseURL.post(
        `/api/estimate-prepared-status/${jobId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("status resp", resp);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        if (resp.data.data.status === "true") {
          dispatch(setActiveTab("adjustor-meeting"));
          navigate(`/job-details/${jobId}/adjustor-meeting`);
        }
      }
    } catch (err) {
      if (err.status === 401) {
        logout();
        navigate("/");
      }
    } finally {
      setSettingStatus(false);
    }
  }

  return (
    <div className={className}>
      <InputContainer className="flex flex-col md:flex-row justify-between items md:mb-4">
        <TextBox
          label="Prepared By"
          placeholder="Enter Sales rep name"
          type="text"
          name="prepared_by"
          className="md:mr-4 mb-4 md:mb-0"
          value={values.prepared_by}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.prepared_by}
          touched={touched.prepared_by}
        />
        <div className="w-full flex flex-col items-start md:items-center justify-center mb-4 md:mb-0">
          <label
            htmlFor="complete_box"
            className="w-full flex justify-start md:justify-center text-sm font-medium text-gray-900 mb-2"
          >
            Completed
          </label>
          <input
            type="checkbox"
            className="h-9 w-9 border border-gray-300 bg-gray-50"
            id="status"
            name="status"
            disabled={settingStatus}
            checked={values.status} // Use checked to bind to Formik state
            onChange={(e) => {
              const isChecked = e.target.checked;
              setFieldValue("status", isChecked);
              fetchStatus(e);
            }}
          />
        </div>
        <DateSelector
          label="Select a Date"
          className="mb-4 md:mb-0"
          name="date"
          value={values.date}
          onBlur={handleBlur}
          onChange={(dateString) => setFieldValue("date", dateString)}
          error={errors.date}
          touched={touched.date}
        />
      </InputContainer>

      <FileUploader
        icon={<ImageIcon />}
        fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
        text="Drop your image here, or"
        files={images}
        setFiles={setImages}
        handleDelete={(index) =>
          setImages(images.filter((_, i) => i !== index))
        }
      />
    </div>
  );
};

export default EstimatePreparedForm;
