import { BodyText, Title } from "./Styled";

const EventToast = ({ latest }) => {
  const { type, displayName, otherData } = latest;

  const getTitle = () => {
    if (type === "SUB") return "tilaaja 💜";
    if (type == "FOLLOW") return "seuraaja 👋";

    return "";
  };

  return (
    <>
      <Title>Uusi {getTitle()} </Title>
      <BodyText>
        {displayName}{" "}
        {otherData.tier && `(Taso ${otherData.tier.split("")[0]})`}
      </BodyText>

      {otherData.isGift && (
        <BodyText asSecondary>
          Lahja käyttäjältä {otherData.gifterDisplayName}
        </BodyText>
      )}
    </>
  );
};

export default EventToast;
