import { Title, BodyText } from "./Styled";
import YouTubeIcon from "../../assets/images/icons/youtube.svg";
import DiscordIcon from "../../assets/images/icons/discord.svg";
import TwitchIcon from "../../assets/images/icons/twitch.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import styled from "styled-components";

const InfoToast = ({ info }) => {
  const { slug, title, content } = info;

  const getIcon = () => {
    if (slug === "youtube") return YouTubeIcon;
    if (slug === "discord") return DiscordIcon;
    if (slug === "twitch") return TwitchIcon;
    if (slug === "twitter") return TwitterIcon;

    return "";
  };

  return (
    <InfoContent>
      <InfoIcon src={getIcon()} />
      <div>
        <Title>{title}</Title>
        <BodyText asSecondary>{content}</BodyText>
      </div>
    </InfoContent>
  );
};

export default InfoToast;

const InfoContent = styled.div`
  display: flex;
`;

const InfoIcon = styled.img`
  width: 60px;
  padding-right: 20px;
`;
