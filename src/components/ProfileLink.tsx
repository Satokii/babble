import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { Session } from "next-auth";

interface ProfileLinkProps {
    session: Session;
  }

const ProfileLink: FC<ProfileLinkProps> = ({ session }) => {
  return (
    <Link
      href="/dashboard/profile"
      className="flex items-center mr-2"
    >
      <div className="relative h-12 w-12 ">
        <Image
          fill
          referrerPolicy="no-referrer"
          className="rounded-full border-2 border-cyan-100 transition duration-300 ease-in-out hover:scale-110 hover:border-cyan-200"
          src={session?.user.image || ""}
          alt="User profile picture"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
};

export default ProfileLink;
