import { FlatList } from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*, user:profiles(*)");
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return <PostListItem post={item} />;
        }}
        ListFooterComponent={() => (
          <Link
            href="/new"
            className="text-blue-300 bg-blue-300 p-4 text-center text-3xl"
          >
            New Post
          </Link>
        )}
      />
    </>
  );
}
