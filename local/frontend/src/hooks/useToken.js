import { MINUTE, TOKEN_API_URL } from "../constants";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useToken = () => {
  const [token, setToken] = useState("");

  const { isError, isSuccess, error, data } = useQuery(
    ["token"],
    () => axios(TOKEN_API_URL),
    {
      refetchInterval: MINUTE * 1.75,
      refetchIntervalInBackground: true,
    }
  );

  if (isError) {
    throw new Error(error);
  }

  if (isSuccess) {
    setToken(data.data.token);
  }

  return token;
};

export default useToken;
