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
      const parsedSender = JSON.parse(sender) as User
      console.log("sender", sender)
      return {
        senderId,
        senderEmail: parsedSender.email,
      };
    })
  );
  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add Friend</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests incomingFriendRequests={userFriendReq} sessionId={session.user.id} />
      </div>
    </main>
  );
};

export default page;
