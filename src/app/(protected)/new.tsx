import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { router } from "expo-router";

async function createPost(content: string, user: User | null) {
  const { data } = await supabase
    .from("posts")
    .insert({ content, user_id: user?.id })
    .select("*")
    .throwOnError();

  return data;
}

export default function NewPostScreen() {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(text, user as User | null),
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
  });

  return (
    <SafeAreaView className="p-4 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 60}
      >
        <Text className="text-white text-lg">username</Text>
        <TextInput
          placeholder="What is on your mind?"
          className="text-white text-lg "
          placeholderTextColor={"gray"}
          multiline
          value={text}
          onChangeText={setText}
          numberOfLines={4}
        />
        <View className="mt-auto">
          <Pressable
            onPress={() => mutate()}
            className={`${
              isPending ? "bg-white/50" : "bg-white"
            }  p-4 self-end rounded-full`}
            disabled={isPending}
          >
            <Text className="">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
