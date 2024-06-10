"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const acceptFriendReq = async (senderId: string) => {
    await axios.post("/api/friend/accept", { id: senderId });

    setFriendRequests((allRequests) =>
      allRequests.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const rejectFriendReq = async (senderId: string) => {
    await axios.post("/api/friend/reject", { id: senderId });

    setFriendRequests((allRequests) =>
      allRequests.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IncomingFriendRequest) => {
      setFriendRequests((prevFriendReqs) => [
        ...prevFriendReqs,
        { senderId, senderEmail },
      ]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to see here</p>
      ) : (
        friendRequests.map((request) => (
          <div
            key={request.senderId}
            className="flex px-2 gap-2 sm:gap-5 items-center justify-center sm:justify-start"
          >
            <UserPlus className="text-black w-5 h-5 sm:w-7 sm:h-7" />
            <p className="font-medium text-[0.7rem] sm:text-lg">
              {request.senderEmail}
            </p>
            <button
              aria-label="accept friend"
              className="w-6 h-6 sm:w-9 sm:h-9 bg-green-500 hover:bg-green-600 grid place-items-center rounded-full transition duration-300 ease-in-out hover:shadow-lg"
              onClick={() => acceptFriendReq(request.senderId)}
            >
              <Check className="text-white w-4/5 h-4/5" />
            </button>
            <button
              aria-label="deny friend"
              className="w-6 h-6 sm:w-9 sm:h-9 bg-red-500 hover:bg-red-600 grid place-items-center rounded-full transition duration-300 ease-in-out hover:shadow-lg"
              onClick={() => rejectFriendReq(request.senderId)}
            >
              <X className="text-white w-4/5 h-4/5" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
