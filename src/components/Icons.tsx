import { LucideProps, UserPlus } from "lucide-react";
import LogoImage from "@/public/logo.png";
import Image from "next/image";

export const Icons = {
  Logo: (props: LucideProps) => (
    <Image
      fill
      referrerPolicy="no-referrer"
      src={LogoImage}
      alt="App logo"
      className="rounded-full"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  ),
  UserPlus,
};

export type Icon = keyof typeof Icons;
