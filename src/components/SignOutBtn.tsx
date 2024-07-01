"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import Button from "./ui/Button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

interface SignOutBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutBtn: FC<SignOutBtnProps> = ({ ...props }) => {
  const [signOutUser, setSignOutUser] = useState(false);
  return (
    <Button
      {...props}
      className="w-full py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 hover:text-gray-300 transition duration-300 ease-in-out"
      variant="ghost"
      onClick={async () => {
        setSignOutUser(true);
        try {
          await signOut();
        } catch (err) {
          toast.error("Error signing out, please try again");
        } finally {
          setSignOutUser(false);
        }
      }}
    >
      {signOutUser ? (
        <>
          <Loader2 className="animate-spin h-4 w-4" />
          <div>Log Out</div>
        </>
      ) : (
        <div>Log Out</div>
      )}
    </Button>
  );
};

export default SignOutBtn;
