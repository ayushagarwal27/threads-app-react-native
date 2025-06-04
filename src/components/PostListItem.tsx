import { View, Text, Image, Pressable } from "react-native";
import { Post } from "@/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

dayjs.extend(relativeTime);

export default function PostListItem({
  post,
  isLastInGroup = true,
}: {
  post: any;
  isLastInGroup?: boolean;
}) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable
        className={`flex-row px-4 py-3 ${
          isLastInGroup ? "border-b border-gray-800/70" : ""
        }`}
      >
        {/* Avatar */}
        <View>
          {post.user.avatar_url ? (
            <Image
              source={{ uri: post.user.avatar_url }}
              className="w-11 h-11 rounded-full mt-1"
            />
          ) : (
            <View className="w-11 h-11 rounded-full mt-1 flex bg-blue-300 items-center justify-center">
              <Text className="text-black text-xl">A</Text>
            </View>
          )}
          {!isLastInGroup && (
            <View className="top-0 left-1/2 bottom-0 w-[0.3px] flex-1 bg-gray-400 translate-y-2 "></View>
          )}
        </View>
        {/* Main content */}
        <View className="flex-1 ml-3">
          {/* Header: username, @username, time */}
          <View className="flex-row items-center flex-wrap">
            <Text className="text-white font-semibold">
              {post.user.username}
            </Text>
            {/* Verified badge example (uncomment if needed) */}
            {/* <Ionicons name="checkmark-circle" size={15} color="#60A5FA" className="ml-1" /> */}
            <Text className="text-gray-400 mx-1">·</Text>
            <Text className="text-gray-400">
              {dayjs(post.createdAt).fromNow()}
            </Text>
          </View>

          {/* Content */}
          <Text className="text-white text-[15px] mt-1">{post.content}</Text>

          {post.images && (
            <View className="flex-row gap-2 mt-2">
              {post.images.map((img: string) => {
                return (
                  <Image
                    key={img}
                    source={{
                      uri: supabase.storage.from("media").getPublicUrl(img).data
                        .publicUrl,
                    }}
                    className="w-full aspect-square rounded-lg"
                  />
                );
              })}
            </View>
          )}

          {/* Actions */}
          <View className="flex-row gap-4 mt-3 max-w-[80%]">
            <Pressable className="flex-row items-center gap-1">
              {/* Message bubble for replies */}
              <Feather name="message-circle" size={20} color="gray" />
              <Text className="text-gray-400 text-xs">
                {(post?.replies && post?.replies[0]?.count) || 0}
              </Text>
              {/* <Text className="text-gray-400 text-xs">{post.replies.length}</Text> */}
            </Pressable>
            <Pressable className="flex-row items-center gap-1">
              {/* Repeat for repost */}
              <Feather name="repeat" size={20} color="gray" />
              <Text className="text-gray-400 text-xs">{0}</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-1">
              {/* Heart for like */}
              <Feather name="heart" size={20} color="gray" />
              <Text className="text-gray-400 text-xs">{0}</Text>
            </Pressable>
            <Pressable>
              {/* Paper plane for share */}
              <Feather name="send" size={20} color="gray" />
            </Pressable>
          </View>

          {/* Replying to */}
          {/* {post.parent_id && (
          <Text className="text-gray-500 text-xs mt-2">Replying to thread</Text>
        )} */}
        </View>
      </Pressable>
    </Link>
  );
}
