import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../graphql/graphql";

export default async function getUser(): Promise<string | null> {
  const userItem = await AsyncStorage.getItem("userId");
  if (userItem) {
    return userItem;
  }
  return null;
}
