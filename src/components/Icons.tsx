import { LucideProps, UserPlus } from "lucide-react";
import LogoImage from "@/public/logo.png";
import Image from "next/image";

export const Icons = {
  Logo: (props: LucideProps) => (
    <Image
      layout="fill"
      objectFit="contain"
      referrerPolicy="no-referrer"
      src={LogoImage}
      alt="App logo"
      className="rounded-full"
    />
  ),
  UserPlus,
};

export type Icon = keyof typeof Icons;
