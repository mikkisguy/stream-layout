import GlobalStyle from "./styles/globalStyle";
import styled from "styled-components";
import { resolution } from "./styles/variables";
import { Link, Outlet } from "react-router-dom";
import { IS_DEVELOPMENT, API_URL, JWT_TOKEN } from "./constants";
import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const getDesc = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest`, {
      headers: { Authorization: `Bearer ${JWT_TOKEN}` },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const socketYes = () => {
  const socket = io(`${API_URL}`, {
    auth: { token: `Bearer ${JWT_TOKEN}` },
    path: "/socket/",
  });

  socket.on("connect", () => {
    console.log("Socket.io connected with id:", socket.id);
  });
};

const App = () => {
  useEffect(() => {
    socketYes();
  }, []);

  return (
    <>
      <GlobalStyle />
      <StreamLayout>
        <Outlet />
      </StreamLayout>

      {IS_DEVELOPMENT && (
        <RouterLinks>
          <Link to="/">Main</Link>
          <Link to="fullwidth">Main full width</Link>
          <Link to="chatting">Just chatting</Link>
          <Link to="break">Break</Link>
          <Link to="break-fullwidth">Break full width</Link>
          <Link to="intro">Intro</Link>
          <Link to="outro">Outro</Link>
        </RouterLinks>
      )}
    </>
  );
};

export default App;

const StreamLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${resolution.w};
  height: ${resolution.h};
`;

const RouterLinks = styled.div`
  padding: 15px;

  a {
    color: #fff;
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #fff;
    margin-right: 15px;
    text-decoration: none;
    font-size: 20px;

    :hover {
      text-decoration: underline;
    }
  }
`;
