"use client"

import { FC, useState } from 'react'

interface FriendRequestsProps {}

const FriendRequests: FC<FriendRequestsProps> = ({}) => {
    const [friendRequests, setfriendRequests] = useState(incomingFriendRequests)
  return <div>FriendRequests</div>
}

export default FriendRequests