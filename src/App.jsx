import { AppRoute } from "./Routes";
import { store } from "./store";
import { Provider } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const notify = () => toast("Here is your toast.");
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
