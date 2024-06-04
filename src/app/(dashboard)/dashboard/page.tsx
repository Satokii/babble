import SignOutBtn from "@/components/SignOutBtn";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  const friendsLastSentMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageData] = await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      ) as string[];

      const lastMessage = JSON.parse(lastMessageData) as Message

      return {
        ...friend,
        lastMessage
      }
    })
  );

  return (
    <>
      <div>Dashboard Page</div>
      <SignOutBtn />
    </>
  );
};

export default Page;
