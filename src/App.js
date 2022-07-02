import GlobalStyle from "./styles/globalStyle";
import HeaderBar from "./components/HeaderBar";
import InfoCards from "./components/InfoCards";
import styled from "styled-components";
import { resolution } from "./styles/variables";

const App = () => {
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
