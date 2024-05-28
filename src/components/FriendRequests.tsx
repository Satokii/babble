"use client";

import { FC, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setfriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );
  return <div>FriendRequests</div>;
};

export default FriendRequests;
