import AddFriendForm from "@/components/AddFriendForm";
import { FC } from "react";

const page: FC = ({}) => {
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:py-14 bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500 rounded-2xl shadow-xl transform transition-transform hover:scale-105">
      <div className="bg-white bg-opacity-80 p-6 sm:p-8 rounded-2xl shadow-md">
        <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10 text-center sm:text-left text-gray-900">
          Add Friend
        </h1>
        <div className="flex flex-col gap-4 sm:gap-6">
          <AddFriendForm />
        </div>
      </div>
    </main>
  );
};

export default page;
