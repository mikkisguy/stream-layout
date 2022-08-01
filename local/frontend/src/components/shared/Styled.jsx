import styled from "styled-components";
import { colors, fonts } from "../../styles/variables";

export const Title = styled.p`
  font-family: ${fonts.title};
  color: ${colors.turquoiseLight};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const BodyText = styled.p`
  font-family: ${fonts.body};
  color: ${({ asSecondary }) =>
    asSecondary ? colors.grayLight : colors.peach};
  letter-spacing: 1px;
`;
