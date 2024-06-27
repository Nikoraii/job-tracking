"use client";

import { Typography } from "@material-tailwind/react";

export default function GreetingComponent({ email }: { email: string }) {
  // Geterate username from email, just for display
  const splitEmail = email.split("@");
  return (
    <Typography className="text-right" as="span">
      Welcome,{" "}
      <Typography color="indigo" className="font-semibold inline" textGradient>
        {splitEmail[0]}
      </Typography>
    </Typography>
  );
}
