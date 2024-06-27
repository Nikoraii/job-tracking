"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "../auth/actions";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  const supabase = createClient();

  // Get user ID, needed to create a new job
  let userID;
  const user = await getUser();
  if (user) {
    userID = user.data.user?.id;
  }

  const dataToInsert = {
    job_title: formData.get("job") as string,
    company: formData.get("company") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    user_id: userID,
  };

  const { error } = await supabase.from("jobs").insert(dataToInsert);
  if (error) {
    console.log(error);
    return false;
  }
  revalidatePath("/dashboard");
  return true;
}

export async function getJobs() {
  const supabase = createClient();

  // Get user ID, needed to get jobs for user ID
  let userID;
  const user = await getUser();
  if (user) {
    userID = user.data.user?.id;
  }

  const { error, data } = await supabase
    .from("jobs")
    .select()
    .eq("user_id", userID);

  error && console.log(error);

  return data && data;
}

export async function deleteJob(jobID: string) {
  const supabase = createClient();

  const { error } = await supabase.from("jobs").delete().eq("id", jobID);

  revalidatePath("/dashboard");
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}

export async function editJob(formData: FormData) {
  const supabase = createClient();

  const jobID = formData.get("jobID");

  const dataToInsert = {
    job_title: formData.get("job") as string,
    company: formData.get("company") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
  };

  const { error } = await supabase
    .from("jobs")
    .update(dataToInsert)
    .eq("id", jobID);

  revalidatePath("/dashboard");

  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}
