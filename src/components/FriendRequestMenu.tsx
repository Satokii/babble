"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

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
      className="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend Requests</p>

      {requestCount > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-cyan-600">
          {requestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestMenu;
