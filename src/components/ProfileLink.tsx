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
      className="flex flex-1 items-center gap-x-3 px-2 py-2 text-sm font-semibold leading-5 text-gray-900 transition rounded-md duration-300 ease-in-out hover:bg-cyan-100 hover:text-cyan-700 hover:shadow-md"
    >
      <div className="relative h-9 w-9">
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
