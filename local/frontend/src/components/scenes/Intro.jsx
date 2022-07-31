import Countdown, { zeroPad } from "react-countdown";
import { MINUTE } from "../../constants";

const Intro = () => {
  /**
   * intro scene with countdown clock
   */

  return (
    <Countdown
      date={Date.now() + MINUTE * 5}
      renderer={({ minutes, seconds }) =>
        `${zeroPad(minutes)}:${zeroPad(seconds)}`
      }
    />
  );
};

export default Intro;
