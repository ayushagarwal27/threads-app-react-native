import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black px-6">
      <Text className="text-3xl font-bold mb-8 text-black dark:text-white">
        Welcome Back
      </Text>
      <View className="w-full max-w-sm">
        <Text className="mb-2 text-base text-gray-700 dark:text-gray-300">
          Email
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 mb-4 text-black dark:text-white bg-white dark:bg-neutral-900"
          placeholder="Enter your email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="mb-2 text-base text-gray-700 dark:text-gray-300">
          Password
        </Text>
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 mb-6 text-black dark:text-white bg-white dark:bg-neutral-900"
          placeholder="Enter your password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-black dark:bg-white rounded-md py-3 mb-4"
          onPress={() => {
            /* handle login */
          }}
        >
          <Text className="text-white dark:text-black text-center font-semibold text-base">
            Log In
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/signup");
            }}
          >
            <Text className="text-black dark:text-white font-semibold">
              Create one
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
