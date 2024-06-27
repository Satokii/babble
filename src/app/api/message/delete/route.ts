import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const { messageId }: { messageId: string } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.zrem(`chat:${messageId}:messages`);
    
 return new Response("Message deleted")
}
