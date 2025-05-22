import { View, Text } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text
        className="text-white text-xl"
        onPress={() => supabase.auth.signOut()}
      >
        Sign Out
      </Text>
    </View>
  );
}
