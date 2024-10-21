import { AppRoute } from "./Routes";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoute />
          <Toaster />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export default App;
