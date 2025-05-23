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

//OODzHDfl1T7q8x7f

export default function NewPostScreen() {
  const [text, setText] = useState("");

  const { user } = useAuth();

  const onSubmit = async () => {
    if (!text || !user) return;

    const { data, error } = await supabase
      .from("posts")
      .insert({ content: text, user_id: user?.id });

    if (error) {
      console.log(error);
    }
  };
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
            onPress={onSubmit}
            className="bg-white p-4 self-end rounded-full"
          >
            <Text className="">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
