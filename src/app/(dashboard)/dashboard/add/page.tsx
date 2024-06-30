import AddFriendForm from "@/components/AddFriendForm";
import { FC } from "react";

const page: FC = ({}) => {
  return (
    <main className="container mx-auto px-6 py-10 sm:py-14 bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500 rounded-2xl shadow-xl transform transition-transform">
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-md">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-10 text-center sm:text-left text-gray-900">
          Add Friend
        </h1>
        <div className="flex flex-col gap-6">
          <AddFriendForm />
        </div>
      </div>
    </main>
  );
};

export default page;
