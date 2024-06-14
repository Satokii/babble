"use client";

import { FC } from "react";
import LogoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import GoogleLogin from "@/components/GoogleLogin";

const Page: FC = () => {

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-teal-500 p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Babble
            </h2>
            <Image
              src={LogoImage}
              alt="App logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center justify-center gap-1 text-lg">
            <p className="m-0">Need an account?</p>
            <Link href="/signup" className="text-cyan-500 hover:text-cyan-700">
              Sign up.
            </Link>
          </div>
          <LoginForm />
          <GoogleLogin />
        </div>
      </div>
    </>
  );
};

export default Page;
