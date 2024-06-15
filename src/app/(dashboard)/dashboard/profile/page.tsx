"use client"

// /pages/profile.tsx
import { useState } from 'react';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (data: User) => {
    console.log(data);

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Profile</h2>
        {isEditing ? (
          <ProfileForm user={user} onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <ProfileDetails user={user} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
