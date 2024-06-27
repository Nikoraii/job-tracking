"use client";

import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-around align-middle md:flex-row">
        <div className="flex flex-col mt-4 md:mt-0 gap-4 self-center text-center w-96 md:w-1/2">
          <Typography variant="h1" color="indigo" textGradient>
            JobTracking
          </Typography>
          <Typography variant="lead" color="blue-gray">
            Welcome to JobTracking! Your favourite place to keep track of all
            your job applications.
          </Typography>
          <Typography color="blue-gray" variant="small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            doloribus pariatur illo ducimus quasi, hic facilis nam, cumque
            excepturi ea harum eaque quidem animi iste et molestiae officiis
            sequi perferendis?
          </Typography>
          <Button
            className="w-fit mx-auto rounded-full transition-transform hover:scale-105"
            variant="gradient"
            color="indigo">
            <Typography as={Link} href="/dashboard">
              GET STARTED
            </Typography>
          </Button>
        </div>
        <div className="w-96 md:w-1/2 mx-auto">
          <Image
            src="/screenshot-dashboard.png"
            alt="Screenshot of dashboard"
            width={1000}
            height={750}
          />
        </div>
      </div>
    </main>
  );
}
