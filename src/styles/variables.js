export const cssReset = {
  /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/

    Converted to JS object
  */
  "*, *::before, *::after": { boxSizing: "border-box" },
  "*": { margin: "0" },
  "html, body": { height: "100%" },
  body: { lineHeight: 1.5, WebkitFontSmoothing: "antialiased" },
  "img, picture, video, canvas, svg": { display: "block", maxWidth: "100%" },
  "input, button, textarea, select": { font: "inherit" },
  "p, h1, h2, h3, h4, h5, h6": { overflowWrap: "break-word" },
  "#root, #__next": { isolation: "isolate" },
};

export const colors = {
  black: "#0b0c10",
  blackLight: "#1f2833",
  gray: "#2c3531",
  grayLight: "#c5c6c7",
  turquoise: "#45a29e",
  turquoiseLight: "#66fcf1",
  turquoiseDark: "#116466",
  cyan: "#d1e8e2",
  peach: "#ffcb9a",
  peachDark: "#d9b08c",
};
