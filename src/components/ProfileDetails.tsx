"use client";

import { FC } from "react";
import Image from "next/image";

interface ProfileDetailsProps {
  user: User;
  handleEdit: () => void;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({ user, handleEdit }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-6">
        <Image
          width={120}
          height={120}
          referrerPolicy="no-referrer"
          className="rounded-full border-4 border-cyan-100"
          src={user.image || ""}
          alt="User profile picture"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="text-center space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Name</h2>
            <p className="text-sm text-gray-600">{user.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="py-2 px-6 border border-transparent text-base font-medium rounded-full text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
