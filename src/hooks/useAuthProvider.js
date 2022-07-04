import { RefreshingAuthProvider } from "@twurple/auth";
import { TOKEN_DATA_KEY, CLIENT_ID, CLIENT_SECRET } from "../constants.js";

const useAuthProvider = () => {
  const tokenData = JSON.parse(localStorage.getItem(TOKEN_DATA_KEY));
  const authProvider = new RefreshingAuthProvider(
    {
      CLIENT_ID,
      CLIENT_SECRET,
      onRefresh: (newTokenData) => console.log(newTokenData),
      //localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(newTokenData)),
    },
    tokenData
  );

  return authProvider;
};

export default useAuthProvider;
