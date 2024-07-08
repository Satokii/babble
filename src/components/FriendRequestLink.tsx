"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
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
      className="group flex items-center h-10 gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 transition duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium text-gray-400 transition duration-300 ease-in-out group-hover:border-cyan-600 group-hover:text-cyan-600">
        <svg
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 341.874 341.874"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M341.338,56.544c-0.865-1.748-2.654-2.834-4.669-2.834c-0.243,0-0.471,0.016-0.662,0.035l-13.201,0.573l10.858-10.302 l0.248-0.132l2.895-3.426l-1.536-3.02c-0.887-1.743-2.67-2.826-4.654-2.826c-0.489,0-0.928,0.066-1.289,0.15l-35.572,6.485 c-0.648-0.844-1.308-1.672-1.984-2.479c-12.529-14.959-29.409-22.865-48.814-22.865c-4.852,0-9.917,0.497-15.056,1.476 c-36.111,6.882-53.736,34.2-72.396,63.122c-24.924,38.632-50.697,78.579-124.683,78.579c-6.337,0-13.028-0.301-19.886-0.896 c-0.695-0.061-1.358-0.091-1.97-0.091c-3.851,0-6.544,1.251-8.006,3.717c-2.208,3.727-0.062,7.647,0.969,9.531l0.142,0.261 c13.907,25.674,34.957,47.705,60.9,63.712c23.211,14.321,49.99,23.099,76.99,25.806v52.677c0,6.747,5.517,12.171,12.265,12.171 h28.832c0.799,0,1.593-0.092,2.373-0.243c0.783,0.158,1.593,0.243,2.422,0.243h28.832c3.66,0,7.256-1.609,9.62-4.359 c2.116-2.461,3.024-5.496,2.556-8.58c-1.294-8.509-12.61-11.532-22.768-11.532c-2.314,0-6.642,0.184-11.032,1.307l3.213-44.469 c3.401-0.65,6.804-1.365,10.205-2.186c46.987-11.342,72.971-42.049,86.494-65.814c16.654-29.266,23.972-64.827,20.076-97.568 c-0.326-2.739-0.727-5.427-1.202-8.063l27.382-21.343c1.025-0.608,1.824-1.513,2.262-2.59 C342.051,59.4,341.991,57.852,341.338,56.544z M173.964,301.607c-1-0.067-2.282-0.101-3.326-0.101c-2.314,0-6.727,0.18-11.117,1.303 l3.079-40.844c3.728-0.08,7.365-0.271,11.365-0.568V301.607z M137.724,201.387c-15.404,10.814-31.967,11.775-41.318-4.436 c-10.372,3.407-21.528,2.202-26.284-7.327c-1.491-2.988,0.775-5.469,2.189-5.541c52.375-2.654,99.886-43.521,118.922-86.605 c1.398-3.165,5.691-3.562,6.524-0.52C212.89,152.204,194.946,219.858,137.724,201.387z M242.354,87.651 c-9.213,0-16.682-7.469-16.682-16.682s7.469-16.682,16.682-16.682c9.213,0,16.682,7.469,16.682,16.682 S251.567,87.651,242.354,87.651z"></path>{" "}
          </g>
        </svg>
      </div>
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
