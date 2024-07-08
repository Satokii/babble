import { FC } from "react";
import Image from "next/image";
import LogoImage from "@/public/logo.png";

const Logo: FC = ({}) => {
  return (
    <Image
      fill
      referrerPolicy="no-referrer"
      src={LogoImage}
      alt="App logo"
      className="rounded-full"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default Logo;
