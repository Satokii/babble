"use client";

import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import LogoImage from "@/public/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page: FC = () => {
  const router = useRouter();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoadingLogin(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: emailLogin,
        password: passwordLogin,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        toast.error("Login failed. Email or password are incorrect.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoadingGoogle(true);
    try {
      await signIn("google", { redirect: false }, { prompt: "login" });
    } catch (err) {
      toast.error("Error signing in. Please try again.");
    } finally {
      setIsLoadingGoogle(false);
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
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            <Button isLoading={isLoadingLogin} type="submit">
              Sign In
            </Button>
          </form>
          <Button
            isLoading={isLoadingGoogle}
            type="button"
            className="flex items-center justify-center w-full py-4 sm:py-6 text-base sm:text-lg font-semibold text-white bg-cyan-700 hover:bg-cyan-900 rounded-lg shadow-md transition-colors duration-300"
            onClick={loginWithGoogle}
          >
            {isLoadingGoogle ? null : (
              <svg
                className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Sign in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
