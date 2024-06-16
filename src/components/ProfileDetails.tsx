"use client";

import { FC } from "react";
import Image from "next/image";

interface ProfileDetailsProps {
  // user: User;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  userImage: string | null | undefined;
  handleEdit: () => void;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
  // user,
  userName,
  userEmail,
  userImage,
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
          src={userImage || ""}
          alt="User profile picture"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{userName}</h2>
          <p className="text-sm text-gray-600">{userEmail}</p>
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
