import GlobalStyle from "./globalStyles";
import HeaderBar from "./components/HeaderBar";
import SocialCards from "./components/SocialCards";

const App = () => {
  return (
    <>
      <GlobalStyle />
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
    </>
  );
};

export default App;
