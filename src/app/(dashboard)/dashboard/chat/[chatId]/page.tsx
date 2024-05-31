import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const messages: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

  const dbMessages = messages.map((message) => JSON.parse(message) as Message)

  const reversedDbMessages = dbMessages.reverse()
  
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

  const initialMessages = await getChatMessages(chatId);

  return <div>{params.chatId}</div>;
};

export default page;
