import styled from "styled-components";
// import mikkisGuyHead from "../../assets/images/mikkisguy-head.png";
// import mikkisGuyHeadAfterDark from "../../assets/images/mikkisguy-head-afterdark.png";
import mikkisGuyText from "../../assets/images/mikkisguy-text.png";
import { colors } from "../../styles/variables";
// import useLatest from "../../hooks/useLatest";
import { Title, BodyText } from "./Styled";
import useTheme from "../../hooks/useTheme";

const HeaderBar = (props) => {
  // const { latestSub, latestFollow } = useLatest();
  const { isAfterDark } = useTheme();

  return (
    <HeaderBarContainer
      className={props.fullWidth && "full-width"}
      isAfterDark={isAfterDark}
    >
      <Slots>
        <Slot className="no-border">
          <Title>Viimeisin raidi</Title>
          <BodyText>{/* Comes from StreamElements for now */}</BodyText>
        </Slot>
        <Slot>
          <Title>Viimeisin seuraaja</Title>
          <BodyText>{/* Comes from StreamElements for now */}</BodyText>
        </Slot>
      </Slots>
    </HeaderBarContainer>
  );
};

export default HeaderBar;

const HeaderBarContainer = styled.div`
  display: flex;
  gap: 5px;
  position: relative;
  align-self: center;
  width: 600px;
  height: 60px;
  margin-top: 20px;
  background-color: ${({ isAfterDark }) =>
    isAfterDark ? `${colors.gray}90` : colors.gray};
  padding: 2px 5px;
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
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;

  &.left-side {
    text-align: right;

    border-right: 1px solid ${colors.turquoiseDark};
    border-left: none;
  }

  &.no-border {
    border: none;
  }
`;

const Slots = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
