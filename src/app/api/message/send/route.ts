import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Message } from "@/lib/validations/message";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const [userId1, userId2] = chatId.split("--");

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response("Unauthorized", { status: 401 });
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1;

    const friendList = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:friends`
    )) as string;
    const isFriend = friendList.includes(friendId);

    if (!isFriend) {
      return new Response("unauthorized", { status: 401 });
    }

    const senderDb = (await fetchRedis(
      "get",
      `user:${session.user.id}`
    )) as string;

    const sender = JSON.parse(senderDb) as User;

    const timestamp = Date.now();
    const messageData: Message = {
        id,
        senderId
    }

    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    });
  } catch (err) {}
}
