import GlobalStyle from "./styles/globalStyle";
import styled from "styled-components";
import { resolution } from "./styles/variables";
import { useEffect } from "react";
import { RefreshingAuthProvider } from "@twurple/auth";
import {
  TOKEN_DATA_KEY,
  CLIENT_ID,
  CLIENT_SECRET,
  INITIAL_ACCESS_TOKEN,
  INITIAL_REFRESH_TOKEN,
} from "./constants.js";
import { ApiClient } from "@twurple/api";
import { Link, Outlet } from "react-router-dom";
import { IS_DEVELOPMENT } from "./constants";

const App = () => {
  useEffect(() => {
    const runTokenTest = false;

    if (localStorage.getItem(TOKEN_DATA_KEY) === null) {
      const initialTokenData = {
        accessToken: INITIAL_ACCESS_TOKEN,
        refreshToken: INITIAL_REFRESH_TOKEN,
        expiresIn: 0,
        obtainmentTimestamp: 0,
      };

      localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(initialTokenData));
    }

    if (runTokenTest) {
      const testRefreshToken = async () => {
        const tokenData = JSON.parse(localStorage.getItem(TOKEN_DATA_KEY));
        const authProvider = new RefreshingAuthProvider(
          {
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            onRefresh: (newTokenData) =>
              localStorage.setItem(
                TOKEN_DATA_KEY,
                JSON.stringify(newTokenData)
              ),
          },
          tokenData
        );

        const apiClient = new ApiClient({ authProvider });

        const user = await apiClient.users.getUserByName("MikkisGuy");

        console.log(user);
      };

      testRefreshToken();
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <StreamLayout>
        <Outlet />
      </StreamLayout>
      <RouterLinks isDevelopment={IS_DEVELOPMENT}>
        <Link to="/">Main</Link>
        <Link to="fullwidth">Main full width</Link>
        <Link to="chatting">Just chatting</Link>
        <Link to="break">Break</Link>
        <Link to="break-fullwidth">Break full width</Link>
        <Link to="intro">Intro</Link>
        <Link to="outro">Outro</Link>
      </RouterLinks>
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
  display: ${({ isDevelopment }) => (isDevelopment ? "block" : "none")};
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
