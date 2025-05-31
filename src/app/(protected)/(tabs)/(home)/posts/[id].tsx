import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PostListItem from "@/components/PostListItem";

async function getPostById(id: string) {
  const data = await supabase
    .from("posts")
    .select("*, user:profiles(*)")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
}

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-white">{error.message}</Text>;
  }

  return (
    <View>
      <PostListItem post={data.data} />
    </View>
  );
}
