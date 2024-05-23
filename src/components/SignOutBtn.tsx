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
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SignOutBtn;
