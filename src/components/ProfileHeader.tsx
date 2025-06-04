import { View, Text, ActivityIndicator, Pressable, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileById } from "@/services/profiles";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import SupabaseImage from "./SupabaseImage";

export default function ProfileHeader() {
  const { user } = useAuth();
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getUserProfileById(user?.id!),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-red-400">{error.message}</Text>;
  }
  return (
    <View className="p-4 gap-4">
      <View className="flex-row items-center justify-between gap-2">
        <View className="gap-1">
          <Text className="text-white text-2xl font-bold">
            {profile?.full_name}
          </Text>
          <Text className="text-neutral-200 text-lg">{profile?.username}</Text>
        </View>

        <Image
          source={{ uri: profile?.avatar_url }}
          className="w-20 h-20 rounded-full"
        />
        {/* <SupabaseImage
          bucket="avatars"
          path={profile?.avatar_url}
          transform={{ width: 80, height: 80 }}
        /> */}
      </View>

      <Text className="text-neutral-200 leading-snug">{profile?.bio}</Text>

      <View className="flex-row gap-2">
        <Link href="/profile/edit" asChild>
          <Pressable className="flex-1 py-2 rounded-lg border-2 border-neutral-800">
            <Text className="text-center text-neutral-200">Edit Profile</Text>
          </Pressable>
        </Link>

        <Pressable className="flex-1 py-2 rounded-lg border-2 border-neutral-800">
          <Text className="text-center text-neutral-200">Share Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
