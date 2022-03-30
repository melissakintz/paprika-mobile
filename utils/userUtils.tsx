import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../graphql/graphql";

export default async function getUser(): Promise<User | null> {
  const userItem = await AsyncStorage.getItem("user");

  if (userItem) {
    return JSON.parse(userItem);
  }
  return null;
}
