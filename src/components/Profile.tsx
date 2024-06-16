"use client"

import React, { useState } from 'react';
import ProfileDetails from '@/components/ProfileDetails';
import ProfileForm from '@/components/ProfileForm';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
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
    <div>
      {isEditing ? (
        <ProfileForm userName={user.name} userEmail={user.email} userImage={user.image} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <ProfileDetails userName={user.name} userEmail={user.email} userImage={user.image} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default Profile;
