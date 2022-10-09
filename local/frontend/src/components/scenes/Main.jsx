import HeaderBar from "../shared/HeaderBar";
import { Box, SceneContainer, Title } from "../shared/Styled";
import styled from "styled-components";
import MusicCredit from "../shared/MusicCredit";

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

      {(justChatting || onBreak) && (
        <>
          <SceneContainer
            className={
              fullWidthBar ? "with-fullwidth-headerbar" : "with-headerbar"
            }
          >
            <BreakBox hidden={justChatting}>
              <BreakTitle className="big">Tauko, palaan pian!</BreakTitle>
            </BreakBox>
            <Box>{/* StreamElement chat goes here */}</Box>
          </SceneContainer>

          {onBreak && <MusicCredit />}
        </>
      )}
    </>
  );
};

export default Main;

const BreakBox = styled(Box)`
  visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};
`;

const BreakTitle = styled(Title)`
  margin-bottom: 30px;
`;
