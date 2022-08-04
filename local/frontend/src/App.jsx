import GlobalStyle from "./styles/globalStyle";
import styled from "styled-components";
import { colors, resolution } from "./styles/variables";
import { Link, Outlet } from "react-router-dom";
import { IS_DEVELOPMENT, MINUTE, SECOND } from "./constants";
import infoJson from "./data/info.json";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InfoToast from "./components/shared/InfoToast";

const App = () => {
  const visibleFor = SECOND * 8;
  const infoKeys = Object.keys(infoJson);
  const [infoIndex, setInfoIndex] = useState(-1);
  const [toggleInfo, setToggleInfo] = useState(true);
  const milliseconds = toggleInfo ? MINUTE * 8 : visibleFor;

  useEffect(() => {
    const infoTimer = setTimeout(() => {
      setToggleInfo(!toggleInfo);

      if (toggleInfo) {
        const nextIndex = () => {
          if (infoIndex === infoKeys.length - 1) {
            return 0;
          }

          return infoIndex + 1;
        };

        setInfoIndex(nextIndex());

        const currentInfo = infoJson[infoKeys[nextIndex()]];

        toast(<InfoToast info={currentInfo} />, {
          autoClose: visibleFor,
          className: "info-toast",
        });
      }
    }, milliseconds);

    return () => clearTimeout(infoTimer);
  });

  return (
    <>
      <GlobalStyle />
      <StreamLayout>
        <Outlet />
      </StreamLayout>

      {IS_DEVELOPMENT && (
        <RouterLinks>
          <Link to="/">Main</Link>
          <Link to="fullwidth">Main full width</Link>
          <Link to="chatting">Just chatting</Link>
          <Link to="break">Break</Link>
          <Link to="break-fullwidth">Break full width</Link>
          <Link to="intro">Intro</Link>
          <Link to="outro">Outro</Link>
        </RouterLinks>
      )}
    </>
  );
};

export default App;

const StreamLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${resolution.w};
  height: ${resolution.h};
`;

const RouterLinks = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;

  a {
    background-color: ${colors.black}90;
    font-family: sans-serif;
    color: ${colors.grayLight};
    display: inline-block;
    padding: 2px 5px;
    border: 1px solid ${colors.gray};
    margin-right: 15px;
    text-decoration: none;
    font-size: 1.2rem;

    :hover {
      text-decoration: underline;
    }
  }
`;
