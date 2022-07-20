import styled from "styled-components";
import mikkisGuyHead from "../../assets/images/mikkisguyHead.png";
import { colors } from "../../styles/variables";
import useLatest from "../../hooks/useLatest";

const HeaderBar = () => {
  /* TODO: Slots system, issue #5
  - Can include components like
  <Subscriber />
  <Host />
  <Follower />
  <Counter />
  */
  const { latestSub, latestFollow } = useLatest();
  console.log(JSON.stringify(latestSub, null, 2));
  console.log(JSON.stringify(latestFollow, null, 2));

  return (
    <HeaderBarContainer>
      <MikkisGuyHead src={mikkisGuyHead} alt="" />
    </HeaderBarContainer>
  );
};

export default HeaderBar;

const HeaderBarContainer = styled.div`
  position: relative;
  align-self: center;
  height: 50px;
  width: 1100px;
  margin-top: 30px;
  background-color: ${colors.gray};
`;

const MikkisGuyHead = styled.img`
  position: absolute;
  top: -25%;
  left: 47%;
  height: 78px;
`;
