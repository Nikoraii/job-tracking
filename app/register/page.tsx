"use client";

import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { register } from "./actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "../auth/actions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // PAGE LOADER
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // Redirect to home page if user is not logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await getUser();
      if (user) {
        setLoggedIn(true);
        router.push("/");
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  // Basic loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check again if user is logged in before rendering the page
  if (loggedIn) {
    router.push("/");
  }

  return (
    <Card shadow className="w-1/3 mx-auto mt-10 py-4 px-20">
      <Typography
        variant="h2"
        color="indigo"
        className="text-center"
        textGradient>
        Sign Up
      </Typography>
      <Typography variant="lead" className="text-center">
        Welcome!
      </Typography>

      {/* REGISTRATION FORM */}
      <form>
        <div className="mt-2">
          <label htmlFor="email" className="mt-4">
            Email:
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="example@mail.com"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="password">Password:</label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="******"
            minLength={6}
            maxLength={20}
          />
        </div>

        <div className="text-center mt-6">
          <Button
            type="submit"
            variant="gradient"
            color="indigo"
            formAction={register}>
            Sign Up
          </Button>
        </div>
      </form>

      <Typography
        variant="small"
        color="blue-gray"
        className="text-center mt-4">
        Already have an account?
      </Typography>
      <Typography className="text-center" as={Link} href="/login">
        <Button variant="text">Sign In</Button>
      </Typography>
    </Card>
  );
}
