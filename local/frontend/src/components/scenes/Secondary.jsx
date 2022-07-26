import Countdown, { zeroPad } from "react-countdown";
import { MINUTE } from "../../constants";

const Secondary = ({ asOutro = false }) => {
  /**
   * Default: intro scene with countdown clock
   * asOutro: outro scene with thank yous
   */
  if (asOutro) {
    return "Outro scene";
  }

  return (
    <Countdown
      date={Date.now() + MINUTE * 5}
      renderer={({ minutes, seconds, completed }) => {
        if (completed) {
          return "Alkaa pian!";
        } else {
          return `${zeroPad(minutes)}:${zeroPad(seconds)}`;
        }
      }}
    />
  );
};

export default Secondary;
