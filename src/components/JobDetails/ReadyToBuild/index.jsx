import React, { useState, useEffect, Fragment } from "react";
import {
  CheckBox,
  Ckeditor,
  CustomTimePicker,
  DateSelector,
  Form,
  Input,
  SelectBox,
  TextBox,
} from "@components/FormControls";
import { useFormik } from "formik";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { InputContainer } from "@components/index";
import { useParams } from "react-router-dom";
import { readyToBuildSchema } from "@services/schema";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubContractors } from "@store/slices/subContractorSlice";
import { Scheduling } from "@components/JobDetails";
import { useForm } from "react-hook-form";
import { CustomDatePicker } from "@components";
import CkeditorControlled from "@components/FormControls/CkeditorControlled";
import { UploaderInputs } from "@components/index";
import { Button, ImageIcon, Loader, RenameFileUI } from "@components/UI";
import SimpleFileUploader from "@components/FormControls/SimpleFileUploader";
import { createReadyToBuild, getReadyToBuild } from "@services/apiReadyToBuild";

const ReadyToBuild = () => {
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const resp = await getReadyToBuild(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
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
        formData.append("attachments[]", attachements[x]);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CheckBox
        name="status"
        id="status"
        register={register}
        label="build confirmed"
      />
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
          register={register}
          name="attachements"
          id="attachments"
          fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          multiple={true}
        />

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
