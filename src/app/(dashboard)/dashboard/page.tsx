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
            <div
              key={friend.id}
              className="relative bg-zinc-50 border border-zinc-200 p-3 rounded-md"
            >
              <div className="absolute right-4 inset-y-0 flex items-center">
                <ChevronRight className="h-7 w-7 text-zinc-400" />
              </div>
              <Link
                href={`/dashboard/chat/${chatHrefConstructor(
                  session.user.id,
                  friend.id
                )}`}
                className="relative sm:flex"
              >
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                  <div className="relative h-6 w-6">
                    <Image
                      fill
                      referrerPolicy="no-referrer"
                      className="rounded-full"
                      alt={`${friend.name} profile photo`}
                      src={friend.image}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      <SignOutBtn />
    </>
  );
};

export default Page;
