"use client";

import { FC } from "react";
import LoginForm from "@/components/LoginForm";
import GoogleLogin from "@/components/GoogleLogin";
import SignupLoginLogo from "@/components/SignupLoginLogo";

const Page: FC = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-teal-500 p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8">
          <SignupLoginLogo />
          <LoginForm />
          <GoogleLogin />
        </div>
      </div>
    </>
  );
};

export default Page;
