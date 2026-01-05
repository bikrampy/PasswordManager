import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import './index.css';
import App from "./App";
import GeneratePassword from "./pages/GeneratePassword";
import SavedPasswords from "./pages/SavedPasswords";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<GeneratePassword />} />
      <Route path="saved" element={<SavedPasswords />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);