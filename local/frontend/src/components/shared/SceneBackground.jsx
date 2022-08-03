import minecraftOne from "../../assets/images/screenshots/minecraft1.jpg";
import minecraftTwo from "../../assets/images/screenshots/minecraft2.jpg";
import minecraftThree from "../../assets/images/screenshots/minecraft3.jpg";
import minecraftFour from "../../assets/images/screenshots/minecraft4.jpg";
import coding from "../../assets/images/screenshots/coding.jpg";
import styled from "styled-components";
import { resolution } from "../../styles/variables";

const SceneBackground = ({ asCoding, children }) => {
  const getMinecraftScreenshot = () => {
    const random = Math.floor(Math.random() * 4) + 1;

    if (random === 1) return minecraftOne;
    if (random === 2) return minecraftTwo;
    if (random === 3) return minecraftThree;
    if (random === 4) return minecraftFour;

    return "";
  };

  return (
    <Background screenshot={asCoding ? coding : getMinecraftScreenshot()}>
      {children}
    </Background>
  );
};

export default SceneBackground;

const Background = styled.div`
  width: ${resolution.w};
  height: ${resolution.h};
  background-image: url("${({ screenshot }) => screenshot}");
`;
