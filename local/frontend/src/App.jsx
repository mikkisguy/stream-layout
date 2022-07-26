import GlobalStyle from "./styles/globalStyle";
import styled from "styled-components";
import { resolution } from "./styles/variables";
import { Link, Outlet } from "react-router-dom";
import { IS_DEVELOPMENT, MINUTE, SECOND } from "./constants";
import infoJson from "./data/info.json";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const App = () => {
  const infoKeys = Object.keys(infoJson);
  const [infoIndex, setInfoIndex] = useState(-1);
  const [toggleInfo, setToggleInfo] = useState(true);
  const milliseconds = toggleInfo ? SECOND * 5 : SECOND * 8;

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

        toast(currentInfo.title);
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
  padding: 15px;

  a {
    color: #fff;
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #fff;
    margin-right: 15px;
    text-decoration: none;
    font-size: 20px;

    :hover {
      text-decoration: underline;
    }
  }
`;
