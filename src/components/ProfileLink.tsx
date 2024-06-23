import Link from "next/link";
import Image from "next/image";

const ProfileLink = ({}) => {
  return (
    <Link
      href="/dashboard/profile"
      className="flex flex-1 items-center gap-x-3 px-1 py-2 text-sm font-semibold leading-5 text-gray-900 transition rounded-md duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
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

      <span className="sr-only">Profile</span>
      <div className="flex flex-col">
        <span aria-hidden="true">{session.user.name}</span>
        <span className="text-xs text-gray-500" aria-hidden="true">
          {session.user.email}
        </span>
      </div>
    </Link>
  );
};

export default ProfileLink;
