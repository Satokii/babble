"use client"

import { FC, useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginForm: FC = ({ }) => {
    const router = useRouter();
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
  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow-md"
    >
      <input
        type="email"
        placeholder="Email"
        value={emailLogin}
        onChange={(e) => setEmailLogin(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordLogin}
        onChange={(e) => setPasswordLogin(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
      <Button className="w-full" isLoading={isLoadingLogin} type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
