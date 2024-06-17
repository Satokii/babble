"use client";

import { FC } from "react";
import Image from "next/image";

interface ProfileDetailsProps {
  user: User;
  handleEdit: () => void;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
  user,
  handleEdit,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Image
          width={100}
          height={100}
          referrerPolicy="no-referrer"
          className="rounded-full"
          src={user.image || ""}
          alt="User profile picture"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button
          onClick={handleEdit}
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
