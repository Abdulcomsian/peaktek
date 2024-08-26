const initialState = {
  user: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/updateUser":
      return { ...state, user: action.payload };

    default:
      return state;
  }
}

export const updateUser = function (user) {
  return { type: "user/updateUser", payload: user };
};
