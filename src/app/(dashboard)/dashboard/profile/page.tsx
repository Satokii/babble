import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Profile from "@/components/Profile";
import { FC } from "react";
  
  const ProfilePage: FC = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center text-gray-700">{`Hi, ${session.user.name}`}</h2>
          <Profile user={session.user} />
        </div>
      </div>
    );
  };

export default ProfilePage;
