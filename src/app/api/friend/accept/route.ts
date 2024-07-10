import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAlreadyFriend = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriend) {
      return new Response("You are already friends with this user.", {
        status: 400,
      });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    if (!hasFriendRequest) {
      return new Response(
        "Error, this user has not sent you a friend request.",
        { status: 400 }
      );
    }

    const [userData, friendData] = (await Promise.all([
      fetchRedis("get", `user:${session.user.id}`),
      fetchRedis("get", `user:${idToAdd}`),
    ])) as [string, string];

    const user = JSON.parse(userData) as User;
    const friend = JSON.parse(friendData) as User;

    await pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:friends`),
      "new_friend",
      user
    );

    await pusherServer.trigger(
      toPusherKey(`user:${session.user.id}:friends`),
      "new_friend",
      friend
    );

    await Promise.all([
      // ADD FRIEND TO CURRENT USER FRIEND LIST
      db.sadd(`user:${session.user.id}:friends`, idToAdd),
      // ADD USER TO FRIEND'S FRIEND LIST
      db.sadd(`user:${idToAdd}:friends`, session.user.id),
      // REMOVE FRIEND REQUEST FROM CURRENT USER REQUESTS
      db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd),
      // REMOVE FRIEND REQUEST FROM FRIEND'S FRIEND REQUESTS
      db.srem(`user:${idToAdd}:outbound_friend_requests`, session.user.id),
    ]);

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request.", { status: 400 });
  }
}
