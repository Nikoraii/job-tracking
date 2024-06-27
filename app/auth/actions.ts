"use server";

import { createClient } from "@/utils/supabase/server";

// Get current user
export async function getUser() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user.data.user?.email) {
    return false;
  }

  return user;
}
