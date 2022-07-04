import { ApiClient } from "@twurple/api";
import useAuthProvider from "./useAuthProvider";

const useApiClient = async () => {
  const authProvider = useAuthProvider();

  const apiClient = new ApiClient({ authProvider });

  const user = await apiClient.users.getUserByName("MikkisGuy");

  return user;
};

export default useApiClient;
