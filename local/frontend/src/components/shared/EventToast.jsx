const EventToast = ({ latest }) => {
  const { type, displayName, otherData } = latest;

  return (
    <>
      <p>Uusi {type}</p>
      <p>{displayName}</p>
    </>
  );
};

export default EventToast;
