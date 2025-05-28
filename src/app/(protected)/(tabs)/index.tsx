import { ActivityIndicator, FlatList } from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*)")
    .throwOnError();
  return data;
}

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
