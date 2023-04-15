import { Title } from "../shared/Styled";
import styled from "styled-components";
import useTheme from "../../hooks/useTheme";

const MusicCredit = () => {
  const { isAfterDark } = useTheme();

  if (isAfterDark) {
    return null;
  }

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
