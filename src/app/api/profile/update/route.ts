import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/helpers/redis";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();

    const { name, email, image } = body.data;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existingUserWithEmail = await fetchRedis(
      "get",
      `user:email:${email}`
    );
    if (existingUserWithEmail) {
      console.log("exisiting email")
      return new Response(
        "An account has already been created with this email.",
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const user = (await db.get(`user:${userId}`)) as User;

    try {
      const updatedUser = { ...user, name: name, email: email, image: image };

      await db.set(`user:${userId}`, JSON.stringify(updatedUser));

      if (session.user.email !== email) {
        await db.set(`user:email:${email}`, userId);
        await db.del(`user:email:${session.user.email}`, userId);
      }

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
