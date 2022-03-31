import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getUser(): Promise<string | null> {
  const userItem = await AsyncStorage.getItem("@userToken");
  if (userItem) {
    return userItem;
  }
  return null;
}
