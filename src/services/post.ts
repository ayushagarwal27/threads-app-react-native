import { supabase } from "@/lib/supabase";
import { User } from "@/types";

export async function fetchPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count)")
    .throwOnError();
  return data;
}

export async function createPost(
  content: string,
  user: User | null,
  parent_id?: string,
  images?: string[]
) {
  const { data } = await supabase
    .from("posts")
    .insert({ content, user_id: user?.id, parent_id, images })
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
}

export async function getPostById(id: string) {
  const data = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count)")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
}

export async function getPostsByUserId(id: string) {
  const data = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count)")
    .eq("user_id", id)
    .throwOnError();

  return data;
}

export async function getPostReplies(parent_id: string) {
  const data = await supabase
    .from("posts")
    .select("*, user:profiles(*), replies:posts(count)")
    .eq("parent_id", parent_id)
    .throwOnError();

  return data;
}
