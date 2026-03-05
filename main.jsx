import React from "react";
import { createRoot } from "react-dom/client";
import BloomPathChat from "./bloompath-chat-app";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BloomPathChat />
  </React.StrictMode>
);
