import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraftScreenshot.png";
import cssReset from "./cssReset";
import { resolution } from "./variables";
import { IS_DEVELOPMENT } from "../constants";

const GlobalStyle = createGlobalStyle`
  ${cssReset}

  body  {
    background-image: ${
      IS_DEVELOPMENT ? `url('${minecraftScreenshot}')` : "none"
    };
    background-size: ${resolution.w} ${resolution.h};
    background-repeat: no-repeat;
    background-color: #000;
  }
`;

export default GlobalStyle;
