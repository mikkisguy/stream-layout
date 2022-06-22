/* TODO: Slots system, issue #5
          - Can include components like
            <Subscriber />
            <Host />
            <Follower />
            <Counter />
*/
import styled from "styled-components";

const HeaderBar = () => {
  return (
    <HeaderBarContainer>
      <p>lorem ipsum</p>
    </HeaderBarContainer>
  );
}

export default HeaderBar;

const HeaderBarContainer = styled.div({
  backgroundColor: "#dedede",
  padding: "20px", 
  alignSelf: "center"
})
