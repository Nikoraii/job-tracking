"use client";

import { Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full bg-blue-gray-50 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 px-2 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; {currentYear} JobTracking
      </Typography>
      <Typography color="blue-gray">
        Made with <span className="text-red-400">&hearts;</span> by{" "}
        <a
          href="https://github.com/Nikoraii"
          target="_blank"
          rel="noreferrer"
          className=" text-indigo-600">
          Niko
        </a>
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as={Link}
            href="/"
            color="blue-gray"
            className="font-normal transition-colors hover:text-indigo-500 focus:text-indigo-500">
            Home
          </Typography>
        </li>
        <li>
          <Typography
            as={Link}
            href="/dashboard"
            color="blue-gray"
            className="font-normal transition-colors hover:text-indigo-500 focus:text-indigo-500">
            Dashboard
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
