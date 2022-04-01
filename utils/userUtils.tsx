import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetCurrentUserQuery } from "../graphql/graphql";

async function getUserToken(): Promise<string | null> {
  const userItem = await AsyncStorage.getItem("@userToken");
  if (userItem) {
    return userItem;
  }
  return null;
}

function getCurrentUser() {
  const { data: currentUser, error: errorUser } = useGetCurrentUserQuery();
  return currentUser
}

export default {getUserToken, getCurrentUser};