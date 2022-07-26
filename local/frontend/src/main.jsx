import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/scenes/Main";
import Secondary from "./components/scenes/Secondary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="fullwidth" element={<Main fullWidthBar />} />
          <Route path="chatting" element={<Main justChatting />} />
          <Route path="break" element={<Main onBreak />} />
          <Route
            path="break-fullwidth"
            element={<Main fullWidthBar onBreak />}
          />
          <Route path="intro" element={<Secondary />} />
          <Route path="outro" element={<Secondary asOutro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routing />
      <ToastContainer
        closeButton={false}
        position="bottom-left"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        limit={3}
        transition={Slide}
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
