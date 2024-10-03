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
import Button from "@components/JobDetails/Button";
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
import { ImageIcon, Loader, RenameFileUI } from "@components/UI";

const Test = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
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
        <Input
          label="Home Owner"
          placeholder="John Doe"
          name="name"
          id="name"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
          applyMarginBottom={true}
        />
        <Input
          label="Home Owner Email"
          placeholder="example@gmail.com"
          name="email"
          id="email"
          type="email"
          className="md:mr-4 mb-4 md:mb-0"
          register={register}
          applyMarginBottom={true}
        />
        <CustomDatePicker
          label="Date sent:"
          className="mb-4"
          control={control}
          name="date_sent"
          error={errors.date && formateErrorName(errors?.date_sent?.message)}
        />

        <CkeditorControlled control={control} name="notes" id="notes" />

        <UploaderInputs
          wrapperClass="col-span-2 md:col-span-1 mt-4"
          name={`attachments`}
          id={`attachments`}
          register={register}
          icon={<ImageIcon />}
          require={false}
          fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
        />
        {/* {row?.attachment && (
              <RenameFileUI
                files={row.attachment}
                apiUpdateFileEndPoint="/api/change/project-design-inspection/file-name"
                apiDeleteFileEndpoint="/api/delete/project-design-inspection/media"
              />
            )} */}

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full max-w-28 text-white btn-gradient px-4 py-1"
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

export default Test;
