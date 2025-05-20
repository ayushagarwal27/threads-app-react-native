import { FlatList } from "react-native";
import { posts } from "@/dummyData";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return <PostListItem post={item} />;
        }}
        ListFooterComponent={() => (
          <Link
            href="/(auth)/login"
            className="text-blue-300 bg-blue-300 p-4 text-center text-3xl"
          >
            New Post
          </Link>
        )}
      />
    </>
  );
}
