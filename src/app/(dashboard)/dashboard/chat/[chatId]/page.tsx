import ChatTextBox from "@/components/ChatTextBox";
import Messages from "@/components/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArraySchema } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const dbMessagesData: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const parsedMessages = dbMessagesData.map(
      (message) => JSON.parse(message) as Message
    );
    const reversedMessages = parsedMessages.reverse();
    const messages = messageArraySchema.parse(reversedMessages);
    return messages;
  } catch (err) {
    notFound();
  }
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const { user } = session;
  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatFriendId = user.id === userId1 ? userId2 : userId1;

  const chatFriendData = (await fetchRedis(
    "get",
    `user:${chatFriendId}`
  )) as string;

  const chatFriend = JSON.parse(chatFriendData) as User;

  const existingMessages = await getChatMessages(chatId);

  return (
    <div className="flex-1 flex flex-col h-full max-h-[calc(100vh-6rem)] my-5 md:my-2 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between py-3 px-4 sm:py-4 sm:px-6 bg-cyan-100 border-b border-cyan-200">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image
              fill
              referrerPolicy="no-referrer"
              src={chatFriend.image}
              alt={`${chatFriend.name} profile photo`}
              className="rounded-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-lg sm:text-xl font-semibold text-cyan-800">
              {chatFriend.name}
            </div>
            <span className="text-xs sm:text-sm text-cyan-600">
              {chatFriend.email}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <Messages
          existingMessages={existingMessages}
          sessionId={session.user.id}
          sessionImage={session.user.image}
          chatFriend={chatFriend}
          chatId={chatId}
        />
      </div>
      <div className="p-4 sm:p-5 bg-gray-200 border-t border-gray-300">
        <ChatTextBox chatFriend={chatFriend} chatId={chatId} />
      </div>
    </div>
  );
};

export default page;
