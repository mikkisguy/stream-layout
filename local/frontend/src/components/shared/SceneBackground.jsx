import minecraftOne from "../../assets/images/screenshots/minecraft1.jpg";
import minecraftTwo from "../../assets/images/screenshots/minecraft2.jpg";
import minecraftThree from "../../assets/images/screenshots/minecraft3.jpg";
import minecraftFour from "../../assets/images/screenshots/minecraft4.jpg";
import coding from "../../assets/images/screenshots/coding.jpg";
import afterdark from "../../assets/images/screenshots/afterdark.jpg";
import styled from "styled-components";
import { resolution } from "../../styles/variables";
import useTheme from "../../hooks/useTheme";

const SceneBackground = ({ children }) => {
  const { isAfterDark, isCoding } = useTheme();

  const getMinecraftScreenshot = () => {
    const random = Math.floor(Math.random() * 4) + 1;

    if (random === 1) return minecraftOne;
    if (random === 2) return minecraftTwo;
    if (random === 3) return minecraftThree;
    if (random === 4) return minecraftFour;

    return "";
  };

  const getBackground = () => {
    if (isAfterDark) {
      return afterdark;
    }

    if (isCoding) {
      return coding;
    }

    return getMinecraftScreenshot();
  };

  return <Background screenshot={getBackground()}>{children}</Background>;
};

export default SceneBackground;

const Background = styled.div`
  width: ${resolution.w};
  height: ${resolution.h};
  background-image: url("${({ screenshot }) => screenshot}");
`;
