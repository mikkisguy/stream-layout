import HeaderBar from "../shared/HeaderBar";
import InfoCards from "../shared/InfoCards";

const Main = ({
  fullWidthBar = false,
  justChatting = false,
  onBreak = false,
}) => {
  /**
   * Default: scene mainly for Minecraft/gaming (headerbar floating)
   * fullWidthBar: scene mainly for development/drawing (headerbar full width)
   * justChatting: scene for hanging out, background image and place for webcam, right side chat with StreamElements for now? (headerbar floating)
   * onBreak: shows break text in center of the screen (headerbar floating or full width)
   */
  console.log("fullWidthBar", fullWidthBar);
  console.log("justChatting", justChatting);
  console.log("onBreak", onBreak);

  return (
    <>
      <HeaderBar />
      <InfoCards />
    </>
  );
};

export default Main;
