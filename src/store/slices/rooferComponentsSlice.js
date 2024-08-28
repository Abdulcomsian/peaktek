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
