import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Please enter an email and password");
      return;
    }

    try {
      setIsLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({ email, password });

      if (error) Alert.alert(error.message);

      if (!session)
        Alert.alert("Please check your inbox for email verification!");
    } catch (error) {
      console.error("Login error:", error);
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black px-6">
      <Text className="text-3xl font-bold mb-8 text-black dark:text-white">
        Welcome
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
            handleSignUp();
          }}
        >
          <Text className="text-white dark:text-black text-center font-semibold text-base">
            {isLoading ? "Logging in..." : "Sign up"}
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/login");
            }}
          >
            <Text className="text-black dark:text-white font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
