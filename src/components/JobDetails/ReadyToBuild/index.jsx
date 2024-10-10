import React, { useState, useEffect, Fragment } from "react";
import { CheckBox, Input } from "@components/FormControls";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { CustomDatePicker } from "@components";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { Button, Loader, RenameFileUI } from "@components/UI";
import SimpleFileUploader from "@components/FormControls/SimpleFileUploader";
import {
  createReadyToBuild,
  getReadyToBuild,
  updateReadyToBuildStatus,
} from "@services/apiReadyToBuild";
import { useAuth } from "@context/AuthContext";
import toast from "react-hot-toast";

const ReadyToBuild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { id: jobId } = useParams();
  const [showRenameBox, setShowRenameBox] = useState(false);
  const [attachements, setAttachements] = useState([]);
  const [isChangeStatus, setIsChangeStatus] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getReadyToBuild(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        setShowRenameBox(true);
        setAttachements(resp.data.documents);
        return { ...resp.data, status: resp.data.status === "true" };
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
      console.log(resp);
    },
  });

  const onSubmit = async function (data) {
    const { home_owner, home_owner_email, date, notes, attachements, status } =
      data;
    console.log(data);

    const formData = new FormData();
    formData.append("home_owner", home_owner);
    formData.append("home_owner_email", home_owner_email);
    formData.append("date", date);
    formData.append("notes", notes);
    formData.append("status", status);

    if (attachements.length > 0) {
      for (let x = 0; x < attachements.length; x++) {
        formData.append("attachements[]", attachements[x]);
      }
    }

    console.log(Object.fromEntries(formData));
    try {
      const resp = await createReadyToBuild(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async function (e) {
    const status = e.target.checked;
    const formData = new FormData();
    formData.append("status", status);
    setIsChangeStatus(true);
    try {
      const resp = await updateReadyToBuildStatus(formData, jobId);
      console.log("STATUS RESP", resp);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
      }
    } finally {
      setIsChangeStatus(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-3">
        <CheckBox
          name="status"
          id="status"
          register={register}
          onChange={handleStatusChange}
          label="build confirmed"
          disabled={isChangeStatus}
        />
        {isChangeStatus && (
          <Loader width={"24px"} height={"24px"} color="#000" />
        )}
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <div className="flex gap-3 mb-3">
          <Input
            label="Home Owner"
            placeholder="John Doe"
            name="home_owner"
            id="home_owner"
            className="md:mr-4 mb-4 md:mb-0"
            register={register}
          />
          <Input
            label="Home Owner Email"
            placeholder="example@gmail.com"
            name="home_owner_email"
            id="home_owner_email"
            type="email"
            className="md:mr-4 mb-4 md:mb-0"
            register={register}
          />
        </div>
        <CustomDatePicker
          label="Date sent:"
          className="mb-4"
          control={control}
          name="date"
          error={errors.date && formateErrorName(errors?.date_sent?.message)}
        />

        <CkeditorControlled
          control={control}
          name="notes"
          id="notes"
          className="mb-3"
        />

        <SimpleFileUploader
          label="Attachments"
          register={register}
          name="attachements"
          id="attachments"
          fileTypes={["application/pdf"]}
          multiple={true}
        />
        {showRenameBox && (
          <RenameFileUI
            files={attachements}
            apiDeleteFileEndpoint="/api/delete/ready-to-build/media"
            apiUpdateFileEndPoint="/api/change/ready-to-build/file-name"
          />
        )}

        <Button
          variant="gradient"
          disabled={isSubmitting}
          type="submit"
          className="w-full max-w-28 text-white btn-gradient px-4 py-1 mt-3"
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader width={"24px"} height={"24px"} color="#fff" />
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReadyToBuild;
