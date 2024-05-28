"use client"

import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useState } from 'react'

interface FriendRequestMenuProps {
    sessionId: string
    INITIAL_COUNT: number
}

const FriendRequestMenu: FC<FriendRequestMenuProps> = ({sessionId, INITIAL_COUNT}) => {
    const [requestCount, setRequestCount] = useState(INITIAL_COUNT)
  return <Link href="/dashboard/friend-requests" className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
    <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
        <User className="h-4 w-4" />
    </div>
    <p className='truncate'>Friend Requests</p>
  </Link>
}

export default FriendRequestMenu