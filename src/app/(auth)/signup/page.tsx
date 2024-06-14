"use client";

import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import LogoImage from "@/public/logo.png";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: FC = () => {
  const router = useRouter();
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);

  const [emailSignup, setEmailSignup] = useState("");
  const [nameSignup, setNameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoadingSignup(true);

    try {
      await axios.post("/api/auth/signup", {
        emailSignup,
        nameSignup,
        passwordSignup,
      });
      setEmailSignup("");
      setNameSignup("");
      setPasswordSignup("");
      router.push("/login");
      toast.success("Sign up successful. Please log in.");
    } catch (err) {
        if (err instanceof AxiosError) {
            toast.error(err.response?.data.message)
        }
        else {
            toast.error("Sign up failed. Please try again.");
        }
    } finally {
      setIsLoadingSignup(false);
    }
  };

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
            <p className="m-0">Already have an account?</p>
            <Link href="/login" className="text-cyan-500 hover:text-cyan-700">
              Login.
            </Link>
          </div>
          <form
            onSubmit={handleSignup}
            className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow-md"
          >
            <input
              type="email"
              placeholder="Email"
              value={emailSignup}
              onChange={(e) => setEmailSignup(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <input
              type="text"
              placeholder="Display Name"
              value={nameSignup}
              onChange={(e) => setNameSignup(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <Button
              className="w-full"
              isLoading={isLoadingSignup}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
