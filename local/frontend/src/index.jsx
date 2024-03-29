import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/scenes/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.min.css";
import { IS_DEVELOPMENT } from "./constants";
import Intro from "./components/scenes/Intro";
import Outro from "./components/scenes/Outro";
import Toasts from "./components/shared/Toasts";

const queryClient = new QueryClient();

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="toasts" element={<Toasts />} />
          <Route path="fullwidth" element={<Main fullWidthBar />} />
          <Route path="chatting" element={<Main justChatting />} />
          <Route path="break" element={<Main onBreak />} />
          <Route
            path="break-fullwidth"
            element={<Main fullWidthBar onBreak />}
          />
          <Route path="intro" element={<Intro />} />
          <Route path="outro" element={<Outro />} />
          <Route path="intro-coding" element={<Intro asCoding />} />
          <Route path="outro-coding" element={<Outro asCoding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routing />
      {IS_DEVELOPMENT && (
        <ReactQueryDevtools
          position="bottom-right"
          closeButtonProps={{
            style: { fontFamily: "sans-serif", fontSize: "1rem" },
          }}
        />
      )}
    </QueryClientProvider>
  </React.StrictMode>
);
