import { BodyText, Title } from "./Styled";

const EventToast = ({ latest }) => {
  const { type, displayName, otherData } = latest;

  const getTitle = () => {
    if (type === "SUB") {
      return `tason ${otherData.tier.split("")[0]} tilaaja 💜`;
    }
    if (type == "FOLLOW") return "seuraaja 👋";

    return "";
  };

  return (
    <>
      <Title>Uusi {getTitle()} </Title>
      <BodyText>{displayName}</BodyText>

      {otherData.isGift && (
        <BodyText className="secondary top-padded">
          Lahja käyttäjältä {otherData.gifterDisplayName}
        </BodyText>
      )}
    </>
  );
};

export default EventToast;
