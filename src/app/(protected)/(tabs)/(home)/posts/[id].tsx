import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
import { getPostById, getPostReplies } from "@/services/post";
import PostDetails from "@/components/PostDetails";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  const {
    data: replies,
    isLoading: isLoadingReplies,
    error,
  } = useQuery({
    queryKey: ["posts", id, "replies"],
    queryFn: () => getPostReplies(id),
  });

  // console.log(replies);

  if (isLoadingPost || isLoadingReplies) {
    return <ActivityIndicator />;
  }

  if (postError) {
    return <Text className="text-white">{postError.message}</Text>;
  }
  if (error) {
    return <Text className="text-white">{error.message}</Text>;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={replies?.data}
        renderItem={({ item }) => <PostListItem post={item} />}
        ListHeaderComponent={
          <>
            <PostDetails post={post?.data} />
            <Text className="text-white text-lg font-bold p-4 border-b border-neutral-800">
              Replies
            </Text>
          </>
        }
      />
      <PostReplyInput postId={id} />
    </View>
  );
}
