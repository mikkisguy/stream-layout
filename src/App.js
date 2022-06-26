import GlobalStyle from "./styles/globalStyle";
import HeaderBar from "./components/HeaderBar";
import SocialCards from "./components/SocialCards";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StreamLayout>
        <HeaderBar>
          {/* TODO: Slots system, issue #5
        - Can include components like
          <Subscriber />
          <Host />
          <Follower />
          <Counter />
        */}
        </HeaderBar>
        <SocialCards>
          {/* TODO: Fade in/out Twitter, YouTube etc info 
        - Not visible always
        */}
        </SocialCards>
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
