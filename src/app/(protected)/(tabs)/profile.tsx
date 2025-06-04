import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "@/services/post";
import PostListItem from "@/components/PostListItem";
import ProfileHeader from "@/components/ProfileHeader";

export default function ProfileScreen() {
  const { user } = useAuth();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", { user_id: user?.id }],
    queryFn: () => getPostsByUserId(user?.id!),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-red-400">{error.message}</Text>;
  }

  return (
    <View className="flex-1 justify-center">
      <FlatList
        data={posts?.data}
        renderItem={({ item }) => {
          return <PostListItem post={item} />;
        }}
        ListHeaderComponent={
          <>
            <ProfileHeader />
            <Text className="text-white text-lg font-bold p-4 border-b border-neutral-800">
              Threads
            </Text>
          </>
        }
      />

      {/* <Text
        className="text-white text-xl"
        onPress={() => supabase.auth.signOut()}
      >
        Sign Out
      </Text> */}
    </View>
  );
}
