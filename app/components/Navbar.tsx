"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import { getUser } from "../auth/actions";
import { signOut } from "../login/actions";
import { IoClose, IoMenu } from "react-icons/io5";

export function StickyNavbar() {
  // Mobile navbar toggler
  const [openNav, setOpenNav] = useState(false);

  // User logged in
  const [loggedIn, setLoggedIn] = useState(false);

  // Toggle mobile menu
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Check if user is logged in
  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });

  // Handle logout button
  const handleLogOut = async () => {
    await signOut();
    setLoggedIn(false);
  };

  // Navigation menu
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 hover:text-indigo-600">
        <Link href="/" className="flex items-center">
          <div className="group inline-block">
            <span className="relative inline-block">
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </span>
          </div>
        </Link>
      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 hover:text-indigo-600">
        <Link href="/dashboard" className="flex items-center">
          <div className="group inline-block">
            <span className="relative inline-block">
              Dashboard
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </span>
          </div>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-semibold"
          color="indigo"
          variant="lead"
          textGradient>
          JobTracking
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {!loggedIn ? (
            <div className="flex items-center gap-x-1">
              <Typography as={Link} href="/login" variant="small">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block text-indigo-600">
                  Log In
                </Button>
              </Typography>

              <Typography as={Link} href="/register" variant="small">
                <Button
                  variant="gradient"
                  color="indigo"
                  size="sm"
                  className="hidden lg:inline-block font-semibold"
                  ripple={true}>
                  Sign Up
                </Button>
              </Typography>
            </div>
          ) : (
            <Typography variant="small">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block text-indigo-600"
                onClick={handleLogOut}>
                Log Out
              </Button>
            </Typography>
          )}

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <IoClose className="text-indigo-600 w-6 h-6" />
            ) : (
              <IoMenu className="text-indigo-600 w-6 h-6" />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          {!loggedIn ? (
            <>
              <Button fullWidth variant="text" size="sm">
                <Typography as={Link} href="/login" className="w-full">
                  Log In
                </Typography>
              </Button>
              <Button fullWidth variant="gradient" size="sm" color="indigo">
                <Typography as={Link} href="/register" className="w-full">
                  Sign Up
                </Typography>
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="text"
              size="sm"
              color="indigo"
              onClick={handleLogOut}>
              <Typography className="w-full">LOG OUT</Typography>
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
