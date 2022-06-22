import { createGlobalStyle } from "styled-components";
import minecraftScreenshot from "../assets/images/minecraft-screenshot.png";

const GlobalStyle = createGlobalStyle({
  "*": { boxSizing: "border-box" },

  body: {
    backgroundImage: `url('${minecraftScreenshot}')`,
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
  },
});

export default GlobalStyle;
