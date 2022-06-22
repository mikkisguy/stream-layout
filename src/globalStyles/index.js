import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraft-screenshot.png";
import cssReset from "./cssReset";

const GlobalStyle = createGlobalStyle({
  ...cssReset,
  body: {
    backgroundImage: `url('${minecraftScreenshot}')`,
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
  },
});

export default GlobalStyle;
