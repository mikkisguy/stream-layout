import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraft-screenshot.png";
import cssGrid from "./cssGrid";

const GlobalStyle = createGlobalStyle`
${cssGrid}

body {
  background-image: url("${minecraftScreenshot}");
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
}
`;

export default GlobalStyle;
