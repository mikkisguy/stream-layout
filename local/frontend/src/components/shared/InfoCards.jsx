import styled from "styled-components";
import { colors } from "../../styles/variables";
import infoJson from "../../data/info.json";
import { useState, useEffect } from "react";
import { MINUTE, SECOND } from "../../constants";

const InfoCards = () => {
  /* TODO: Fade in/out Twitter, YouTube etc info 
        - Not visible always
  */
  const infoKeys = Object.keys(infoJson);
  const [infoIndex, setInfoIndex] = useState(0);
  const [currentInfo, setCurrentInfo] = useState(infoJson[infoKeys[0]]);
  const [showCard, setShowCard] = useState(true);
  const milliseconds = showCard ? SECOND * 8 : MINUTE * 5;

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
  width: 400px;
  height: 200px;
  margin: 15px;
`;
