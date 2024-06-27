import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const { chatId, message }: { chatId: string, message: string } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.zrem(`chat:${chatId}:messages`, message);

    console.log("success")
    
 return new Response("Message deleted")
}
