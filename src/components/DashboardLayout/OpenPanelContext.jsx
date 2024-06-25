const { createContext, useReducer, useContext } = require("react");

const PanelContext = createContext();

const initialState = {
  isShowNav: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "panel/open":
      return { ...state, isShowNav: true };

    case "panel/close":
      return { ...state, isShowNav: false };
  }
}

const PanelProvider = function ({ children }) {
  const [{ isShowNav }, dispatch] = useReducer(reducer, initialState);

  return (
    <PanelContext.Provider value={(isShowNav, dispatch)}>
      {children}
    </PanelContext.Provider>
  );
};

const usePanel = function () {
  const context = useContext(PanelContext);
  if (!context)
    throw new Error("Panel provider was called outside the Panel context");

  return context;
};

export { PanelProvider, usePanel };
