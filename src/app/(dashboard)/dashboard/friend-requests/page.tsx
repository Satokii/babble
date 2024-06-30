import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const userFriendReqIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const userFriendReq = await Promise.all(
    userFriendReqIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const parsedSender = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: parsedSender.email,
      };
    })
  );
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:py-14 bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500 rounded-2xl shadow-xl transform transition-transform">
      <div className="bg-white bg-opacity-80 p-6 sm:p-8 rounded-2xl shadow-md">
        <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 lg:mb-10 text-center sm:text-left text-gray-900">
          Friend Requests
        </h1>
        <div className="flex flex-col gap-4 sm:gap-6">
          <FriendRequests
            incomingFriendRequests={userFriendReq}
            sessionId={session.user.id}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
