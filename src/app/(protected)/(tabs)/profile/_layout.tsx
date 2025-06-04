import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Profilelayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />
    </Stack>
  );
}
