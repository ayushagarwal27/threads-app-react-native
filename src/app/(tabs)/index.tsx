import { FlatList } from "react-native";
import { posts } from "@/dummyData";
import PostListItem from "@/components/PostListItem";
// import "./global.css";

export default function HomeScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => {
        return <PostListItem post={item} />;
      }}
    />
  );
}
