import ProfileDetails from '@/components/ProfileDetails';
import ProfileForm from '@/components/ProfileForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  // const handleSubmit = async (data: User) => {
  //   console.log(data);

  //   setIsEditing(false);
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Profile</h2>
        {/* {isEditing ? (
          <ProfileForm user={session?.user} onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <ProfileDetails user={session?.user} onEdit={handleEdit} />
        )} */}
          <ProfileForm user={session?.user} userName={session.user.name} userEmail={session.user.email} userImage={session.user.image} />
          <ProfileDetails userName={session.user.name} userEmail={session.user.email} userImage={session.user.image} />
      </div>
    </div>
  );
};

export default ProfilePage;
