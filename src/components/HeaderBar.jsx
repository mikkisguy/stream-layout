/* TODO: Slots system, issue #5
          - Can include components like
            <Subscriber />
            <Host />
            <Follower />
            <Counter />
*/
import styled from "styled-components";
import mikkisGuyHead from "../assets/images/mikkisguy-head.png";

const HeaderBar = () => {
  return (
    <HeaderBarContainer>
      <MikkisGuyHead src={mikkisGuyHead} alt="" />
    </HeaderBarContainer>
  );
};

export default HeaderBar;

const HeaderBarContainer = styled.div({
  padding: "20px",
  alignSelf: "center",
});

const MikkisGuyHead = styled.img({
  height: "60px",
  width: "60px",
});
