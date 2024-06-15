"use client"

import React from 'react';
import Image from 'next/image';

interface ProfileDetailsProps {
  user: User;
  onEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        {/* <Image
          src={user.image}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover"
        /> */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button
          onClick={onEdit}
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
