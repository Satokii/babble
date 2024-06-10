import Link from "next/link";
import { Icons } from "@/components/Icons";

const AddFriendLink = () => {
  return (
    <Link
      href="/dashboard/add"
      className="text-gray-800 hover:text-cyan-600 hover:bg-cyan-50 group flex gap-4 rounded-md p-2 text-sm leading-6 font-semibold transition duration-300 ease-in-out"
    >
      <span className="text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white transition duration-300 ease-in-out">
        <Icons.UserPlus className="h-4 w-4" />
      </span>
      <span className="truncate">Add Friend</span>
    </Link>
  );
};

export default AddFriendLink;
