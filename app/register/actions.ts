"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Basic registration form
export async function register(formData: FormData) {
  const supabase = createClient();

  // Get data from form
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // If there is an error redirect user to error page
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
