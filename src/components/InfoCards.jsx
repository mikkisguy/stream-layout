import styled from "styled-components";
import { colors } from "../styles/variables";
import infoJson from "../data/info.json";
import { useState, useEffect } from "react";

const InfoCards = () => {
  /* TODO: Fade in/out Twitter, YouTube etc info 
        - Not visible always
  */
  const infoKeys = Object.keys(infoJson);
  const [currentInfo, setCurrentInfo] = useState(infoJson[infoKeys[0]]);
  const [showCard, setShowCard] = useState(true);
  const milliseconds = showCard ? 2000 : 3000; // show: 8000, hide: 300000 = 5min
  const random = Math.floor(Math.random() * infoKeys.length);

  useEffect(() => {
    setTimeout(() => {
      setShowCard(!showCard);

      if (!showCard) {
        setCurrentInfo(infoJson[infoKeys[random]]);
      }
    }, milliseconds);
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
