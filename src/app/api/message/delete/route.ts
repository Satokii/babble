import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Message, messageSchema } from "@/lib/validations/message";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { chatId, message }: { chatId: string; message: Message } =
    await req.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await db.zrem(`chat:${chatId}:messages`, message);

    const deletedMessagePlaceholderRaw: Message = {
      id: message.id,
      senderId: session.user.id,
      text: "Deleted message",
      timestamp: message.timestamp,
    }

    const deletedMessagePlaceholder = messageSchema.parse(deletedMessagePlaceholderRaw);

    await db.zadd(`chat:${chatId}:messages`, {
      score: message.timestamp,
      member: JSON.stringify(deletedMessagePlaceholder),
    });
    return new Response("Message deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting message:", error);
    return new Response("Error deleting message", { status: 500 });
  }
}
