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
      className="flex items-center p-1 mr-2 rounded-full transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-100"
    >
      <div className="relative h-12 w-12 rounded-full border border-cyan-100">
        <Image
          fill
          referrerPolicy="no-referrer"
          className="rounded-full"
          src={session?.user.image || ""}
          alt="User profile picture"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
};

export default ProfileLink;
