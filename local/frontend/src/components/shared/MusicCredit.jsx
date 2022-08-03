import { Title } from "../shared/Styled";
import styled from "styled-components";

const MusicCredit = () => {
  return (
    <marquee>
      <CreditText>Striimin musiikki: StreamBeats by Harris Heller</CreditText>
      {/* https://www.streambeats.com/ */}
    </marquee>
  );
};

export default MusicCredit;

const CreditText = styled(Title)`
  filter: opacity(50%);
`;
