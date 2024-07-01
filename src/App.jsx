import { AppRoute } from "./Routes";
import { store } from "./store";
import { Provider } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");
function App() {
  return (
    <Provider store={store}>
      <AppRoute />
      <Toaster />
    </Provider>
  );
}

export default App;
