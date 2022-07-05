import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/scenes/Main";
import Secondary from "./components/scenes/Secondary";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="fullwidth" element={<Main fullWidthBar />} />
        <Route path="chatting" element={<Main justChatting />} />
        <Route path="break" element={<Main onBreak />}>
          <Route path="fullwidth" element={<Main fullWidthBar onBreak />} />
        </Route>
        <Route path="intro" element={<Secondary />} />
        <Route path="outro" element={<Secondary asOutro />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
