import { SECOND, STREAM_API_URL } from "../constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useToken from "./useToken";

const useLatest = () => {
  let latestSub;
  let latestFollow;

  const { data: tokenData, isSuccess: tokenIsSuccess } = useToken();

  const { data, error, isError, isSuccess } = useQuery(
    ["stream-api-latest"],
    () =>
      axios(`${STREAM_API_URL}/latest`, {
        headers: { Authorization: `Bearer ${tokenData.data.token}` },
      }),
    {
      enabled: tokenIsSuccess,
      refetchInterval: SECOND * 2,
      refetchIntervalInBackground: true,
    }
  );

  if (isError) {
    throw new Error(error);
  }

  if (data && isSuccess) {
    latestSub = data.data.latestSub;
    latestFollow = data.data.latestFollow;
  }

  return { latestSub, latestFollow };
};

export default useLatest;
