import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EVENT_TYPE, STREAM_API_URL } from "../../constants";
import useToken from "../../hooks/useToken";
import axios from "axios";

const Outro = () => {
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
    <div>
      {subs?.map(({ id, displayName }) => {
        return <p key={id}>{displayName}</p>;
      })}
      {followers?.map(({ id, displayName }) => {
        return <p key={id}>{displayName}</p>;
      })}
    </div>
  );
};

export default Outro;
