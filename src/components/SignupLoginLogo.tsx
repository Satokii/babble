"use client";

import { FC } from "react";
import Image from "next/image";
import LogoImage from "@/public/logo.png";

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
    </>
  );
};

export default SignupLoginLogo;
