import { BodyText, Title } from "./Styled";

const EventToast = ({ latest }) => {
  const { type, displayName, otherData } = latest;

  return (
    <>
      <Title>Uusi {type}</Title>
      <BodyText>{displayName}</BodyText>
    </>
  );
};

export default EventToast;
