import { View, TextInput } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { createPost } from "@/services/post";

export default function PostReplyInput({ postId }: { postId: string }) {
  const [replyText, setReplyText] = useState("");
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(replyText, user as User | null, postId),
    onSuccess: () => {
      setReplyText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <View className="p-4">
      <View className="bg-neutral-800 px-4 shadow-md py-2 rouned-xl flex-row gap-2 items-center">
        <TextInput
          placeholder="Add to thread"
          placeholderTextColor={"gray"}
          className="text-gray-200 flex-1"
          value={replyText}
          onChangeText={setReplyText}
          multiline
        />
        <AntDesign
          name="pluscircleo"
          size={24}
          color={replyText.length === 0 ? "gray" : "gainsboro"}
          disabled={replyText.length === 0 || isPending}
          onPress={() => mutate()}
        />
      </View>
    </View>
  );
}
