import { View, Text, Image, Pressable } from "react-native";
import { Post } from "@/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "expo-router";

dayjs.extend(relativeTime);

export default function PostDetails({ post }: { post: any }) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable className="flex-row px-4 py-3 border-b border-gray-800/70">
        {/* Avatar */}

        {/* Main content */}
        <View className="flex-1  gap-2">
          {/* Header: username, @username, time */}
          <View className="flex-row gap-3 items-center">
            {post.user.avatar_url && (
              <Image
                source={{ uri: post.user.avatar_url }}
                className="w-11 h-11 rounded-full"
              />
            )}
            <View className="flex-row">
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
          </View>

          {/* Content */}
          <Text className="text-white ml-1 text-[15px]">{post.content}</Text>

          {/* Actions */}
          <View className="flex-row gap-4  max-w-[80%]">
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
