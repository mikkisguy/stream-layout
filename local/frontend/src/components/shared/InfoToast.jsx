const InfoToast = ({ info }) => {
  const { title, content } = info;

  return (
    <>
      <p>{title}</p>
      <p>{content}</p>
    </>
  );
};

export default InfoToast;
