import SignOutBtn from "@/components/SignOutBtn";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  const friendsLastSentMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageData] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];

      const lastMessage = JSON.parse(lastMessageData) as Message;

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <>
      <div className="container py-12">
        <h1 className="font-bold text-5xl mb-8">Recent Chats</h1>
        {friendsLastSentMessage.length === 0 ? (
          <p className="text-sm text-zinc-500">Nothing to see here</p>
        ) : (
          friendsLastSentMessage.map((friend) => (
            <div></div>
          ))
        )}
      </div>
      <SignOutBtn />
    </>
  );
};

export default Page;
