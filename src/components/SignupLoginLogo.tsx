"use client";

import { FC } from "react";
import Image from "next/image";
import LogoImage from "@/public/logo.png";
import Link from "next/link";

const SignupLoginLogo: FC = ({}) => {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Babble</h2>
        <Image
          src={LogoImage}
          alt="App logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="flex items-center justify-center gap-1 text-lg">
        <p className="m-0">Already have an account?</p>
        <Link href="/login" className="text-cyan-500 hover:text-cyan-700">
          Login.
        </Link>
      </div>
    </>
  );
};

export default SignupLoginLogo;
