import styled from "styled-components";
import mikkisGuyHead from "../../assets/images/mikkisguy-head.png";
import { colors } from "../../styles/variables";

const HeaderBar = () => {
  /* TODO: Slots system, issue #5
          - Can include components like
            <Subscriber />
            <Host />
            <Follower />
            <Counter />
  */

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
