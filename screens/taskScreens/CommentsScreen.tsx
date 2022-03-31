import { FlatList, Text, View } from "react-native";
import { useGetCommentsByTaskQuery } from "../../graphql/graphql";

export default function CommentsScreen({props}: any) {

  const { data : comments } = useGetCommentsByTaskQuery({variables: {taskId: props}})
  
  return (
    <View>
      <FlatList 
        data={comments?.getCommentsByTask}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
            <Text>{item.user?.email}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
