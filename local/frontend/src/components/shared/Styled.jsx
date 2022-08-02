import styled from "styled-components";
import { colors, fonts } from "../../styles/variables";

export const Title = styled.p`
  font-family: ${fonts.title};
  color: ${colors.turquoiseLight};
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 1px;
`;

export const BodyText = styled.p`
  font-family: ${fonts.body};
  color: ${colors.peach};
  font-size: 1.1rem;
  letter-spacing: 1px;

  &.secondary {
    color: ${colors.grayLight};
    font-size: 1.05rem;
  }

  &.top-padded {
    padding-top: 10px;
  }
`;
