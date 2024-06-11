import Link from "next/link";
import { Icons } from "@/components/Icons";

const AddFriendLink = () => {
  return (
    <Link
      href="/dashboard/add"
      className="group flex items-center h-10 gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 transition duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 transition duration-300 ease-in-out group-hover:border-cyan-600 group-hover:text-cyan-600">
        <Icons.UserPlus className="h-4 w-4" />
      </div>
      <p className="truncate">Add Friend</p>
    </Link>
  );
};

export default AddFriendLink;
