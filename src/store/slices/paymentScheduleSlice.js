import { createPaymentSchedule as createPaymentScheduleApi } from "@services/apiDesignMeeting";
import { Form } from "react-router-dom";

const initialState = {
  isAcknowledge: false,
  files: [],
  textContent: "",
  formError: "",
};

export default function paymentScheduleReducer(state = initialState, action) {
  switch (action.type) {
    case "paymentSchedule/createPaymentSchedule":
      return { ...state };

    case "paymentSchedule/formError":
      return { ...state, formError: action.payload };
    default:
      return state;
  }
}

export const createPaymentSchedule = function (data, jobId) {
  const { selectedOption, content, pdfs } = data;
  const fileImages = [];
  for (let file of Object.values(pdfs)) {
    fileImages.push(file);
  }
  const formData = new FormData();
  formData.append("acknowledge", selectedOption);
  formData.append("content", content);

  fileImages.forEach((file) => {
    formData.append("pdfs[]", file);
  });

  return async function (dispatch, getState) {
    try {
      const resp = await createPaymentScheduleApi(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        const { data } = resp.data;
        dispatch({
          type: "paymentSchedule/createPaymentSchedule",
          payload: data,
        });
      }
    } catch (error) {}
  };
};
