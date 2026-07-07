import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { redirectLegacyAdminHash } from "./admin/bootstrap";
import { RootRoutes } from "./RootRoutes";
import "./styles/index.css";

if (!redirectLegacyAdminHash()) {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  );
}
