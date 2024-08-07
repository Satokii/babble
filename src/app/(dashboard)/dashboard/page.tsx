import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
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

      if (!lastMessageData) {
        return {
          ...friend,
          lastMessage: {
            id: null,
            senderId: null,
            text: "No messages yet.",
            timestamp: null,
          },
        };
      }

      const lastMessage = JSON.parse(lastMessageData) as Message;

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:py-14 bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500 rounded-2xl shadow-xl transform transition-transform">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-8 text-center sm:text-left text-gray-800">
          Chats
        </h1>
        {friendsLastSentMessage.length === 0 ? (
          <p className="text-sm text-gray-600 text-center sm:text-left">
            Nothing to see here
          </p>
        ) : (
          friendsLastSentMessage.map((friend) => (
            <div
              key={friend.id}
              className="relative bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition-shadow mb-4"
            >
              <Link
                href={`/dashboard/chat/${chatHrefConstructor(
                  session.user.id,
                  friend.id
                )}`}
                className="relative flex items-center space-x-3 sm:space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-cyan-200">
                    <Image
                      fill
                      referrerPolicy="no-referrer"
                      className="rounded-full"
                      alt={`${friend.name} profile photo`}
                      src={friend.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="truncate">
                  <h4 className="text-base sm:text-lg font-semibold text-cyan-700">
                    {friend.name}
                  </h4>
                  <p className="mt-1 text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">
                      {friend.lastMessage.senderId === session.user.id
                        ? "You: "
                        : ""}
                    </span>
                    <span>{friend.lastMessage.text}</span>
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Page;
