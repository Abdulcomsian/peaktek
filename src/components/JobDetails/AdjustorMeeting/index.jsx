import React, { Fragment, useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { adjustorMeetingSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Ckeditor, FileUploader, Form } from "@components/FormControls";
import Button from "@components/JobDetails/Button";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { AdjustorForm } from "@components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import {
  ArrowFileIcon,
  CheckBox,
  ImageIcon,
  Loader,
  RadioButton,
} from "@components/UI";
import { useAuth } from "@context/AuthContext";
import RenameFiles from "@components/Forms/Overturn/RenameFiles";
import { updateAdjustorMeetingStatus } from "@services/apiAdjustorMeeting";

const AdjustorMeeting = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [adjustorMeetingData, setAdjustorMeetingData] = useState(null);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notes, setNotes] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [status, setStatus] = useState("overturn");
  const { logout } = useAuth();
  const navigate = useNavigate();

  console.log(notes);

  // useEffect(() => {
  //   const setSentStatus = async () => {
  //     const token = localStorage.getItem("token");
  //     try{
  //       const resp = await clientBaseURL.post(`${}`)
  //     }
  //   };
  // }, [isSent]);
  const getAdjustorMeetingData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await clientBaseURL.get(
        `${clientEndPoints?.getAdjustorMeeting}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ADJUSTOR MEETING REP", response);

      if (response?.status >= 200 && response?.status < 300) {
        setAdjustorMeetingData(response?.data?.data);
        setNotes(response.data.data.notes);
      }
    } catch (error) {
      if (error.response.status === 401) {
        logout();
        navigate("/");
      }
      if (error?.response) {
        console.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getAdjustorMeetingData();
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      time: null,
      date: null,
      complete_box: false,
    },
    enableReinitialize: true,
    validationSchema: adjustorMeetingSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("images[]", file.file);
      });
      documents.forEach((file) => {
        formData.append("attachments[]", file.file);
      });
      const formatPhone = values?.phone.toString();

      const formattedTime = values.time
        ? dayjs(values.time).format("hh:mm A")
        : "Invalid Time";

      const formattedDate = dayjs(values.date).format("MM/DD/YYYY");

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", formatPhone);
      formData.append("time", formattedTime);
      formData.append("date", formattedDate);
      formData.append("notes", notes);

      // const formattedValues = {
      //   ...values,
      //   phone: formatPhone,
      //   time: formattedTime,
      //   date: formattedDate,
      // };

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await clientBaseURL.post(
          `${clientEndPoints?.createAdjustorMeeting}/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status >= 200 && response?.status < 300) {
          toast.success(response?.data?.message);
          // actions.resetForm();
        }
      } catch (error) {
        if (error?.response) {
          toast.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      }
    },
  });

  useEffect(() => {
    if (adjustorMeetingData) {
      const formattedInitialDate = adjustorMeetingData?.date
        ? dayjs(adjustorMeetingData?.date, "MM/DD/YYYY")
        : null;

      const formattedInitialTime = adjustorMeetingData?.time
        ? dayjs(adjustorMeetingData?.time, "hh:mm A")
        : null;

      formik.setValues({
        name: adjustorMeetingData.name || "",
        phone: adjustorMeetingData.phone || "",
        email: adjustorMeetingData.email || "",
        complete_box: adjustorMeetingData.complete_box || false,
        time: formattedInitialTime,
        date: formattedInitialDate,
      });
    }
  }, [adjustorMeetingData]);

  useEffect(() => {
    const updateStatus = async () => {
      const data = await updateAdjustorMeetingStatus(status, id);
      console.log(data);
    };
    updateStatus();
  }, [status]);

  const inputRefs = {
    name: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    time: useRef(null),
    date: useRef(null),
    complete_box: useRef(null),
  };
  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      const firstErrorField = Object.keys(formik.errors).find(
        (field) => formik.errors[field]
      );
      if (firstErrorField && inputRefs[firstErrorField]?.current) {
        const fieldElement = inputRefs[firstErrorField].current;
        fieldElement.focus();
        fieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // Set the cursor inside the input field if it supports setSelectionRange
        if (
          fieldElement.setSelectionRange &&
          ["text", "search", "url", "tel", "password"].includes(
            fieldElement.type
          )
        ) {
          const length = fieldElement.value.length;
          fieldElement.setSelectionRange(length, length);
        }
      }
    }
  }, [formik.isSubmitting, formik.isValid, formik.errors]);

  const refreshData = () => {
    getAdjustorMeetingData();
  };

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} delay={0} />}
      {/* <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Adjustor Meeting
      </h1> */}
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <Form onSubmit={formik.handleSubmit}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2  mb-4 md:mb-0">
              <label
                htmlFor="complete_box"
                className="text-base font-medium text-gray-900"
              >
                BUILD CONFIRMED
              </label>
              <input
                type="checkbox"
                className="h-6 w-6 border border-gray-300 bg-gray-50"
                id="complete_box"
                name="complete_box"
                checked={formik.values.complete_box}
                onChange={() =>
                  formik.setFieldValue(
                    "complete_box",
                    !formik.values.complete_box
                  )
                }
              />
            </div>
            <div>
              <RadioButton
                items={[
                  { label: "OVERTURN", value: "overturn" },
                  { label: "APPRAISAL", value: "appraisal" },
                  { label: "APPROVED", value: "approved" },
                ]}
                value={status}
                onChange={(e) => {
                  console.log("radio checked", e.target.value);
                  setStatus(e.target.value);
                }}
              />
            </div>
          </div>

          <AdjustorForm
            className="mb-8"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            inputRefs={inputRefs}
          />

          <div className="flex flex-col md:flex-row">
            <Ckeditor
              className="w-full mb-4"
              label="Notes"
              id="notes"
              value={notes}
              onChange={setNotes}
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:mr-4">
              <FileUploader
                label="Images"
                id="images"
                icon={<ImageIcon />}
                className="mb-4"
                fileTypes={[
                  "image/png",
                  "image/jpeg",
                  "image/jpg",
                  "image/gif",
                ]}
                text="Drop your image here, or"
                files={images}
                setFiles={setImages}
                handleDelete={(index) =>
                  setImages(images.filter((_, i) => i !== index))
                }
              />
              {showRenameBox &&
                overturnData?.images?.map((file) => (
                  <RenameFiles
                    file={file}
                    key={file?.id}
                    id={file?.id}
                    refreshData={refreshData}
                  />
                ))}
            </div>
            <div className="w-full mr-4">
              <FileUploader
                label="Documents"
                id="documents"
                icon={<ArrowFileIcon />}
                className="w-full mb-4"
                fileTypes={["application/pdf"]}
                text="Drop your documents here, or"
                files={documents}
                setFiles={setDocuments}
                handleDelete={(index) =>
                  setDocuments(documents.filter((_, i) => i !== index))
                }
              />

              {showRenameBox &&
                overturnData?.attachments?.map((file) => (
                  <RenameFiles
                    file={file}
                    key={file?.id}
                    id={file?.id}
                    refreshData={refreshData}
                  />
                ))}
            </div>
          </div>
          <div className="flex">
            <Button className="text-black mr-4 border border-gray-300 px-4 py-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formik?.isSubmitting}
              className={`w-full max-w-24 text-white btn-gradient px-4 py-1`}
            >
              {formik?.isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Loader width={"24px"} height={"24px"} color="#fff" />
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default AdjustorMeeting;
