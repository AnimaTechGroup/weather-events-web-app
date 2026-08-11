import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LocaleProvider } from "@/context/LocaleContext";
import { App } from "./App";
import "./styles/global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root is missing");
}

createRoot(root).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
