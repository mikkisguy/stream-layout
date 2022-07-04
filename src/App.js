import GlobalStyle from "./styles/globalStyle";
import HeaderBar from "./components/HeaderBar";
import InfoCards from "./components/InfoCards";
import styled from "styled-components";
import { resolution } from "./styles/variables";
import { useEffect } from "react";
import { RefreshingAuthProvider } from "@twurple/auth";
import { TOKEN_DATA_KEY, CLIENT_ID, CLIENT_SECRET } from "./constants.js";
import { ApiClient } from "@twurple/api";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem(TOKEN_DATA_KEY) === null) {
      const initialTokenData = {
        accessToken: "INITIAL_ACCESS_TOKEN",
        refreshToken: "INITIAL_REFRESH_TOKEN",
        expiresIn: 0,
        obtainmentTimestamp: 0,
      };

      localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(initialTokenData));
    }

    const testRefreshToken = async () => {
      const tokenData = JSON.parse(localStorage.getItem(TOKEN_DATA_KEY));
      const authProvider = new RefreshingAuthProvider(
        {
          CLIENT_ID,
          CLIENT_SECRET,
          onRefresh: (newTokenData) =>
            localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(newTokenData)),
        },
        tokenData
      );

      const apiClient = new ApiClient({ authProvider });

      const user = await apiClient.users.getUserByName("MikkisGuy");

      console.log(user);
    };

    testRefreshToken();
  }, []);

  return (
    <>
      <GlobalStyle />
      <StreamLayout>
        <HeaderBar />
        <InfoCards />
      </StreamLayout>
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
