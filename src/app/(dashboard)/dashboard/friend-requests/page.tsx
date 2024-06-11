import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
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
    <main className="container mx-auto px-4 py-8 sm:py-12 bg-gradient-to-r from-cyan-200 to-teal-300 rounded-xl shadow-lg">
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-8 text-center sm:text-left text-gray-800">
        Friend Requests
      </h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={userFriendReq}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default page;
