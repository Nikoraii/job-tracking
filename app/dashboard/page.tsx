"use server";

import { redirect } from "next/navigation";
import { getUser } from "../auth/actions";
import { getJobs } from "./actions";
import FormComponent from "./FormComponent";
import JobsComponent from "./JobsComponent";
import GreetingComponent from "./GreetingComponent";

export default async function Dashboard() {
  const jobs: JobListing[] | null = await getJobs();
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="px-4 py-2">
      {/* Pass user email to component */}
      <GreetingComponent
        email={user.data.user?.email ? user.data.user?.email : "user"}
      />

      {/* Add job form */}
      <FormComponent />

      <JobsComponent jobsData={jobs} />
    </div>
  );
}
