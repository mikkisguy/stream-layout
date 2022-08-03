import HeaderBar from "../shared/HeaderBar";
import { Box, SceneContainer } from "../shared/Styled";
import styled from "styled-components";

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

  return (
    <>
      <HeaderBar fullWidth={fullWidthBar} />

      {justChatting && (
        <SceneContainer className="with-headerbar">
          <div>{/* Empty */}</div>
          <Box>{/* StreamElement chat goes here */}</Box>
        </SceneContainer>
      )}
    </>
  );
};

export default Main;
