import Countdown, { zeroPad } from "react-countdown";
import styled, { css } from "styled-components";
import { MINUTE } from "../../constants";
import { colors, resolution, fonts } from "../../styles/variables";
import minecraftOne from "../../assets/images/screenshots/minecraft1.jpg";
import minecraftTwo from "../../assets/images/screenshots/minecraft2.jpg";
import minecraftThree from "../../assets/images/screenshots/minecraft3.jpg";
import minecraftFour from "../../assets/images/screenshots/minecraft4.jpg";
import { Title } from "../shared/Styled";

const Intro = () => {
  /**
   * intro scene with countdown clock
   */

  const getScreenshot = () => {
    const random = Math.floor(Math.random() * 4) + 1;

    if (random === 1) return minecraftOne;
    if (random === 2) return minecraftTwo;
    if (random === 3) return minecraftThree;
    if (random === 4) return minecraftFour;

    return "";
  };

  return (
    <IntroBackground minecraftScreenshot={getScreenshot()}>
      <marquee>
        <MusicCredit>
          Striimin musiikki: StreamBeats by Harris Heller
        </MusicCredit>
      </marquee>
      <IntroContainer>
        <CountdownWrapper>
          <StartingSoon>Aloitetaan pian!</StartingSoon>
          <CountdownTimer>
            <Countdown
              date={Date.now() + MINUTE * 5}
              renderer={({ minutes, seconds }) =>
                `${zeroPad(minutes)}:${zeroPad(seconds)}`
              }
            />
          </CountdownTimer>
        </CountdownWrapper>
        <ChatWrapper>{/* StreamElement chat goes here */}</ChatWrapper>
      </IntroContainer>
    </IntroBackground>
  );
};

export default Intro;

const IntroBackground = styled.div`
  width: ${resolution.w};
  height: ${resolution.h};
  background-image: url("${({ minecraftScreenshot }) => minecraftScreenshot}");
`;

const MusicCredit = styled(Title)`
  filter: opacity(50%);
`;

const IntroContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin: 230px auto;
  width: 1300px;
`;

const sharedStyles = css`
  background-color: ${colors.gray}30;
  box-shadow: ${colors.turquoise}40 0px 0px 0px 3px;
  border-radius: 10px;
`;

const CountdownWrapper = styled.div`
  ${sharedStyles}

  padding: 0 40px;
  height: 500px;
  text-align: center;
  padding-top: 130px;
`;

const StartingSoon = styled.p`
  font-family: ${fonts.title};
  color: ${colors.turquoise};
  font-size: 3.5rem;
  text-transform: uppercase;
`;

const CountdownTimer = styled.p`
  font-family: ${fonts.title};
  color: ${colors.peach};
  font-size: 6rem;
`;

const ChatWrapper = styled.div`
  ${sharedStyles}
`;
