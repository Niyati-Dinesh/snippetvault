import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";

// Context
import { SnippetProvider } from "./context/SnippetContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnippetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnippetProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
