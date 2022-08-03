import Countdown, { zeroPad } from "react-countdown";
import styled from "styled-components";
import { MINUTE } from "../../constants";
import { colors, fonts } from "../../styles/variables";
import MusicCredit from "../shared/MusicCredit";
import SceneBackground from "../shared/SceneBackground";
import { Box, SceneContainer, Title } from "../shared/Styled";

const Intro = ({ asCoding }) => {
  return (
    <SceneBackground asCoding={asCoding}>
      <MusicCredit />
      <SceneContainer>
        <Box>
          <Title className="big">Aloitetaan pian!</Title>
          <CountdownTimer>
            <Countdown
              date={Date.now() + MINUTE * 5}
              renderer={({ minutes, seconds }) =>
                `${zeroPad(minutes)}:${zeroPad(seconds)}`
              }
            />
          </CountdownTimer>
        </Box>
        <Box>{/* StreamElement chat goes here */}</Box>
      </SceneContainer>
    </SceneBackground>
  );
};

export default Intro;

const CountdownTimer = styled.p`
  font-family: ${fonts.title};
  color: ${colors.peach};
  font-size: 6rem;
`;
