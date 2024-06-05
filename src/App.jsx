import { AppRoute } from "./Routes";
import { store } from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <AppRoute />;
    </Provider>
  );
}

export default App;
