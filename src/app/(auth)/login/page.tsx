"use client";

import { FC } from "react";
import LoginForm from "@/components/LoginForm";
import GoogleLogin from "@/components/GoogleLogin";
import SignupLoginLogo from "@/components/SignupLoginLogo";
import Link from "next/link";

const Page: FC = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-teal-500 p-4 sm:p-6">
  <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8">
    <SignupLoginLogo />
    <div className="flex items-center justify-center gap-2 text-lg text-gray-700">
      <p className="m-0">Need an account?</p>
      <Link href="/signup" className="text-cyan-600 hover:text-cyan-800 font-semibold">
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
