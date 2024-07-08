"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import FriendRequestImg from "./ui/FriendRequestImg";

interface FriendRequestMenuProps {
  sessionId: string;
  INITIAL_COUNT: number;
}

const FriendRequestMenu: FC<FriendRequestMenuProps> = ({
  sessionId,
  INITIAL_COUNT,
}) => {
  const [requestCount, setRequestCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${sessionId}: friends`));

    const friendRequestAddCount = () => {
      setRequestCount((prevReqs) => prevReqs + 1);
    };

    const friendRequestMinusCount = () => {
      setRequestCount((prevReqs) => prevReqs - 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestAddCount);
    pusherClient.bind("new_friend", friendRequestMinusCount);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}: friends`));

      pusherClient.unbind("incoming_friend_requests", friendRequestAddCount);
      pusherClient.unbind("new_friend", friendRequestMinusCount);
    };
  }, [sessionId]);
  return (
    <Link
      href="/dashboard/friend-requests"
      className="group flex items-center h-10 gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 transition duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
    >
      <FriendRequestImg />
      <p className="truncate">Friend Requests</p>
      {requestCount > 0 ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs text-white leading-none">
          {requestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestMenu;
