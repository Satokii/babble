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
      className="flex items-center p-1 mr-2 transition rounded-full duration-300 ease-in-out hover:bg-cyan-200 hover:shadow-lg"
    >
      <div className="relative h-12 w-12 rounded-full duration-300 ease-in-out border border-cyan-100 hover:scale-110">
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
