import { ActivityIndicator, FlatList } from "react-native";
import PostListItem from "@/components/PostListItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/post";

export default function HomeScreen() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // console.log(JSON.stringify(posts, null, 2));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return <PostListItem post={item} />;
        }}
      />
    </>
  );
}
