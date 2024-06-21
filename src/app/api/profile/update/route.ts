import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();

    const { name, email } = body.data;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = session.user
    const userId = session.user.id;
    try {
      const updatedUser = {...user, name, email}

      await db.set(`user:${userId}`, JSON.stringify(updatedUser));
      await db.set(`user:email:${email}`, userId);
      await db.del(`user:email:${session.user.email}`, userId)
      return new Response("Profile updated successfully");
    } catch (error) {
      console.log(error);
      return new Response("Error updating profile", { status: 500 });
    }
  } else {
    console.log("Unable to update");
    return new Response("Method not allowed", { status: 405 });
  }
}
