import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraft-screenshot.png";
import cssReset from "./cssReset";
import { resolution } from "./variables";
import { ENV } from "../constants";

const GlobalStyle = createGlobalStyle`
  ${cssReset}

  body  {
    background-image: ${
      ENV === "development" ? `url('${minecraftScreenshot}')` : "none"
    };
    background-size: ${resolution.w} ${resolution.h};
    background-repeat: no-repeat;
    background-color: #000;
  }
`;

export default GlobalStyle;
