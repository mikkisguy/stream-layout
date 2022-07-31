import { Title, BodyText } from "./Styled";

const InfoToast = ({ info }) => {
  const { title, content } = info;

  return (
    <>
      <Title>{title}</Title>
      <BodyText>{content}</BodyText>
    </>
  );
};

export default InfoToast;
