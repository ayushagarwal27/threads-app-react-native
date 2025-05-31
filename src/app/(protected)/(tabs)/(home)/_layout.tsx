import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="posts/[id]"
        options={{
          title: "Thread",
          headerBackButtonDisplayMode: "generic",
        }}
      />
    </Stack>
  );
}
