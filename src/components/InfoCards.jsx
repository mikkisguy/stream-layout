import styled from "styled-components";
import { colors } from "../styles/variables";
import infoJson from "../data/info.json";
import { useState, useEffect } from "react";

const InfoCards = () => {
  /* TODO: Fade in/out Twitter, YouTube etc info 
        - Not visible always
  */
  const infoKeys = Object.keys(infoJson);
  const [infoIndex, setInfoIndex] = useState(0);
  const [currentInfo, setCurrentInfo] = useState(infoJson[infoKeys[0]]);
  const [showCard, setShowCard] = useState(true);
  const milliseconds = showCard ? 2000 : 1000; // show: 8000, hide: 300000 = 5min

  useEffect(() => {
    const infoCardTimer = setTimeout(() => {
      setShowCard(!showCard);

      if (!showCard) {
        const nextIndex = () => {
          if (infoIndex === infoKeys.length - 1) {
            return 0;
          }

          return infoIndex + 1;
        };

        setInfoIndex(nextIndex());
        setCurrentInfo(infoJson[infoKeys[nextIndex()]]);
      }
    }, milliseconds);

    return () => clearTimeout(infoCardTimer);
  });

  return (
    <InfoCardContainer showCard={showCard}>
      <p>{currentInfo.title}</p>
    </InfoCardContainer>
  );
};

export default InfoCards;

const InfoCardContainer = styled.div`
  display: ${({ showCard }) => (showCard ? "block" : "none")};
  background-color: ${colors.peach};
  width: 250px;
  height: 100px;
  margin: 15px;
`;
