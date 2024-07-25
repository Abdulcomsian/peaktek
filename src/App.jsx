import { AppRoute } from "./Routes";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppRoute />
        <Toaster />
      </Provider>
    </AuthProvider>
  );
}

export default App;
