import AddFriendForm from "@/components/AddFriendForm";
import { FC } from "react";

const page: FC = ({}) => {
  return (
    <main className="container mx-auto px-4 py-8 sm:py-12 bg-gradient-to-r from-cyan-200 to-teal-300 rounded-xl shadow-lg">
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-8 text-center sm:text-left text-gray-800">
        Add Friend
      </h1>
      <AddFriendForm />
    </main>
  );
};

export default page;
