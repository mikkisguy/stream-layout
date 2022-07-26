import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraftScreenshot.png";
import cssReset from "./cssReset";
import { colors, resolution } from "./variables";
import { IS_DEVELOPMENT } from "../constants";

const GlobalStyle = createGlobalStyle`
  ${cssReset}

  body  {
    background-image: ${IS_DEVELOPMENT ? `url('${minecraftScreenshot}')` : "none"
  };
    background-size: ${resolution.w} ${resolution.h};
    background-repeat: no-repeat;
    background-color: #000;
    color: ${colors.peach};
  }
`;

export default GlobalStyle;
