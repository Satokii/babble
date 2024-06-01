import ChatTextBox from "@/components/ChatTextBox";
import Messages from "@/components/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
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
  const chatFriend = (await db.get(`user:${chatFriendId}`)) as User;

  const existingMessages = await getChatMessages(chatId);

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatFriend.image}
                alt={`${chatFriend.name} profile photo`}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatFriend.name}
              </span>
            </div>
            <span className="text-sm text-gray-600">{chatFriend.email}</span>
          </div>
        </div>
      </div>
      <Messages existingMessages={existingMessages} sessionId={session.user.id} />
      <ChatTextBox chatFriend={chatFriend} chatId={chatId} />
    </div>
  );
};

export default page;
