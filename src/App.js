import GlobalStyle from "./styles/globalStyle";
import HeaderBar from "./components/HeaderBar";
import InfoCards from "./components/InfoCards";
import styled from "styled-components";

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

const StreamLayout = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
});
