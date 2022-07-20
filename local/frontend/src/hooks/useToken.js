import { TOKEN_API_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useToken = () => {
  const { data, error, isError, isSuccess } = useQuery(["token-api"], () =>
    axios(TOKEN_API_URL)
  );

  if (isError) {
    throw new Error(error);
  }

  return { data, isSuccess };
};

export default useToken;
