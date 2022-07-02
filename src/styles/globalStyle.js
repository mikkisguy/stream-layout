import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraft-screenshot.png";
import cssReset from "./cssReset";
import { resolution } from "./variables";

const GlobalStyle = createGlobalStyle`
  ${cssReset}

  body  {
    background-image: url('${minecraftScreenshot}');
    background-size: ${resolution.w} ${resolution.h};
    background-repeat: no-repeat;
    background-color: #000;
    width: ${resolution.w};
    height: ${resolution.h};
  }
`;

export default GlobalStyle;
