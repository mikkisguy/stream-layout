import { useQuery } from "@tanstack/react-query";
import { EVENT_TYPE, STREAM_API_URL } from "../../constants";
import useToken from "../../hooks/useToken";
import axios from "axios";
import SceneBackground from "../shared/SceneBackground";
import { BodyText, Box, SceneContainer, Title } from "../shared/Styled";
import MusicCredit from "../shared/MusicCredit";
import { colors } from "../../styles/variables";
import styled from "styled-components";

const Outro = ({ asCoding }) => {
  let subs;
  let followers;

  const { data: tokenData, isSuccess: tokenIsSuccess } = useToken();
  const { data, error, isError, isSuccess } = useQuery(
    ["stream-api-thanks"],
    () =>
      axios(`${STREAM_API_URL}/thanks-mock`, {
        headers: { Authorization: `Bearer ${tokenData.data.token}` },
      }),
    {
      enabled: tokenIsSuccess,
    }
  );

  if (isError) {
    throw new Error(error);
  }

  if (data && isSuccess) {
    const thanks = data.data;
    subs = thanks.filter((event) => event.type === EVENT_TYPE.SUB);
    followers = thanks.filter((event) => event.type === EVENT_TYPE.FOLLOW);
  }

  return (
    <SceneBackground asCoding={asCoding}>
      <MusicCredit />
      <SceneContainer>
        <Box>
          <Title className="big">Kiitos katsomisesta!</Title>

          {subs.length > 0 && (
            <Section>
              <Title>Uudet tilaajat</Title>
              <BodyText>
                {subs.map(({ id, displayName }) => {
                  return <Nickname key={id}>{displayName}</Nickname>;
                })}
              </BodyText>
            </Section>
          )}

          {followers.length > 0 && (
            <Section>
              <Title>Uudet seuraajat</Title>
              <BodyText>
                {followers?.map(({ id, displayName }) => {
                  return <Nickname key={id}>{displayName}</Nickname>;
                })}
              </BodyText>
            </Section>
          )}
        </Box>
        <Box>{/* StreamElement chat goes here */}</Box>
      </SceneContainer>
    </SceneBackground>
  );
};

export default Outro;

const Nickname = styled.span`
  display: inline-block;
  background-color: ${colors.gray}90;
  padding: 3px 5px;
  margin-right: 10px;
  border-radius: 5px;
`;

const Section = styled.div`
  margin-top: 20px;
`;
