import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraft-screenshot.png";
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
    font-size: 62.5%;
  }

  :root {
    --toastify-color-dark: ${colors.gray};
    --toastify-color-progress-dark: ${colors.turquoiseLight};
  }

  .Toastify__toast { 
    box-shadow: ${colors.turquoise}40 0px 0px 0px 3px;
    padding: 10px;
    width: 350px;

    &.info-toast {
      --toastify-color-dark: ${colors.blackLight};
      box-shadow: ${colors.blackLight}40 0px 0px 0px 3px;
    }
  }
  
  .Toastify__progress-bar {
    filter: opacity(10%);
  }
`;

export default GlobalStyle;
