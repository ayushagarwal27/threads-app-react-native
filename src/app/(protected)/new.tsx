import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { router } from "expo-router";
import { createPost } from "@/services/post";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";

export default function NewPostScreen() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(text, user as User | null),
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log(image);

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
        {image && (
          <Image
            source={{ uri: image }}
            className="w-1/2 aspect-square object-cover my-4"
          />
        )}
        <Entypo name="images" size={24} color="gray" onPress={pickImage} />
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
