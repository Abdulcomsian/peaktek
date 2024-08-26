import { createRoofComponent as createRoofComponentApi } from "@services/apiDesignMeeting";

const initialState = {
  isAcknowledge: false,
  files: [],
  textContent: "",
  formError: "",
};

export default function rooferComponentReducer(state = initialState, action) {
  switch (action.type) {
    case "rooferComponent/createrooferComponent":
      return { ...state };

    case "rooferComponent/getrooferComponent":
      return { ...state };

    case "rooferComponent/formError":
      return { ...state, formError: action.payload };

    default:
      return state;
  }
}

export const getrooferComponent = function (jobId) {
  return async function () {};
};

export const createrooferComponent = function (data, jobId) {
  const { selectedOption, acknowledge, content, pdfs } = data;

  const fileImages = [];
  for (let file of Object.values(pdfs)) {
    fileImages.push(file);
  }
  const formData = new FormData();
  formData.append("acknowledge", Number(acknowledge));
  formData.append(
    "title",
    selectedOption === 1 ? "Single Use PDFs" : "Text Page"
  );
  formData.append("content", content || "");

  fileImages.forEach((file) => {
    formData.append("pdfs[]", file);
  });

  return async function (dispatch, getState) {
    try {
      const resp = await createRoofComponentApi(formData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        const { data } = resp.data;
        dispatch({
          type: "paymentSchedule/createPaymentSchedule",
          payload: data,
        });
      } else {
        dispatch({
          type: "rooferComponent/formError",
          payload: "Something went wrong",
        });
      }
    } catch (error) {}
  };
};
