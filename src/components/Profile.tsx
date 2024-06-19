"use client"

import { FC, useState } from 'react';
import ProfileDetails from '@/components/ProfileDetails';
import ProfileForm from '@/components/ProfileForm';

interface ProfileProps {
  user: User;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
  };

  // const handleSubmit = async (data: User) => {
  //   console.log(data);
  //   setIsEditing(false);
  // };

  return (
    <div>
      {isEditing ? (
        <ProfileForm user={user} closeForm={closeForm} />
      ) : (
        <ProfileDetails user={user} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default Profile;
