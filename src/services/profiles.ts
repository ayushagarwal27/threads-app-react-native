import { supabase } from "@/lib/supabase";

export const getUserProfileById = async (id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();
  return data;
};

export const updateProfile = async (
  id: string,
  {
    full_name,
    bio,
    avatar_url,
  }: { full_name: string; bio: string; avatar_url: string }
) => {
  const { data } = await supabase
    .from("profiles")
    .update({
      full_name,
      bio,
      avatar_url,
    })
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};
