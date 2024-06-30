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
    <p className="text-sm text-zinc-500 text-center mt-6">
      Nothing to see here
    </p>
  ) : (
    friendRequests.map((request) => (
      <div
        key={request.senderId}
        className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md transition transform hover:shadow-lg space-y-2 sm:space-y-0 sm:space-x-4"
      >
        <div className="flex items-center space-x-4">
          <UserPlus className="text-cyan-600 w-6 h-6 sm:w-8 sm:h-8" />
          <p className="font-medium text-sm sm:text-lg text-gray-700">
            {request.senderEmail}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            aria-label="accept friend"
            className="w-6 h-6 sm:w-10 sm:h-10 bg-green-500 hover:bg-green-600 rounded-full transition duration-300 ease-in-out flex items-center justify-center hover:shadow-lg"
            onClick={() => acceptFriendReq(request.senderId)}
          >
            <Check className="text-white w-4/5 h-4/5" />
          </button>
          <button
            aria-label="deny friend"
            className="w-6 h-6 sm:w-10 sm:h-10 bg-red-500 hover:bg-red-600 rounded-full transition duration-300 ease-in-out flex items-center justify-center hover:shadow-lg"
            onClick={() => rejectFriendReq(request.senderId)}
          >
            <X className="text-white w-4/5 h-4/5" />
          </button>
        </div>
      </div>
    ))
  )}
</>

  );
};

export default FriendRequests;
