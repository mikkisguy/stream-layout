import styled from "styled-components";
import mikkisGuyHead from "../../assets/images/mikkisguy-head.png";
import { colors } from "../../styles/variables";
import useLatest from "../../hooks/useLatest";
import { Title, BodyText } from "./Styled";

const HeaderBar = (props) => {
  const { latestSub, latestFollow } = useLatest();

  return (
    <HeaderBarContainer className={props.fullWidth && "full-width"}>
      <Slot className="left-side">
        <Title>Viimeisin tilaaja</Title>
        <BodyText>{latestSub && latestSub.displayName}</BodyText>
      </Slot>
      <Slot className="left-side">
        <Title>Viimeisin hosti</Title>
        <BodyText>{/* Comes from StreamElements for now */}</BodyText>
      </Slot>
      <div>
        <MikkisGuyHead src={mikkisGuyHead} alt="" />
      </div>
      <Slot>
        <Title>Viimeisin seuraaja</Title>
        <BodyText>{latestFollow && latestFollow.displayName}</BodyText>
      </Slot>
      <Slot>
        <Title>Seuraajatavoite</Title>
        <BodyText>
          {latestFollow && latestFollow.otherData.count} / 200
        </BodyText>
      </Slot>
    </HeaderBarContainer>
  );
};

export default HeaderBar;

const HeaderBarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) 150px repeat(2, 1fr);
  gap: 5px;
  position: relative;
  align-self: center;
  width: 1300px;
  margin-top: 30px;
  background-color: ${colors.gray};
  padding: 2px 10px;
  border-radius: 10px;
  box-shadow: ${colors.turquoise}40 0px 0px 0px 3px;
  z-index: 1;

  &.full-width {
    grid-template-columns: repeat(2, 1fr) 250px repeat(2, 1fr);
    width: 100%;
    border-radius: initial;
    margin-top: initial;
  }
`;

const Slot = styled.div`
  padding: 5px 15px;
  border-left: 1px solid ${colors.turquoiseDark};

  &.left-side {
    text-align: right;

    border-right: 1px solid ${colors.turquoiseDark};
    border-left: none;
  }
`;

const MikkisGuyHead = styled.img`
  position: absolute;
  top: -12.5%;
  left: 0;
  right: 0;
  margin: auto;
  height: 90px;
  z-index: 2;
`;

// const HeadBackground = styled.div`
//   position: absolute;
//   top: -25%;
//   left: 0;
//   right: 0;
//   margin: auto;
//   height: 100px;
//   width: 100px;
//   background-color: ${colors.blackLight}90;
//   border-radius: 50%;
// `;
