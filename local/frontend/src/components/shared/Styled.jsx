import styled from "styled-components";
import { colors, fonts } from "../../styles/variables";

export const Title = styled.p`
  font-family: ${fonts.title};
  color: ${colors.turquoiseLight};
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 1px;

  &.big {
    font-size: 3.5rem;
  }
`;

export const BodyText = styled.p`
  font-family: ${fonts.body};
  color: ${colors.peach};
  font-size: 1.2rem;
  letter-spacing: 1px;

  &.secondary {
    color: ${colors.grayLight};
    font-size: 1.15rem;
  }

  &.top-padded {
    padding-top: 10px;
  }
`;

export const SceneContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin: auto;
  margin-top: 230px;
  width: 1300px;

  &.with-headerbar {
    margin-top: 160px;
  }

  &.with-fullwidth-headerbar {
    margin-top: 190px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: ${colors.gray}45;
  box-shadow: ${colors.turquoise}40 0px 0px 0px 3px;
  border-radius: 10px;
  padding: 0 40px;
  height: 500px;
`;
