import Link from "next/link";
import AddFriendImg from "./ui/AddFriendImg";

const AddFriendLink = () => {
  return (
    <Link
      href="/dashboard/add"
      className="group flex items-center h-10 gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 transition duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
    >
      <AddFriendImg />
      <p className="truncate">Add Friend</p>
    </Link>
  );
};

export default AddFriendLink;
