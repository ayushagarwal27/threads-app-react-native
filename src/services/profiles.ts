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
