"use client";

import { pusherClient } from "@/lib/pusher";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewMessageToast from "./NewMessageToast";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
  senderImage: string;
  senderName: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const pathname = usePathname();
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
  const [myChats, setMyChats] = useState<User[]>(friends)

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnreadMessages((prevMessages) => {
        return prevMessages.filter(
          (message) => !pathname.includes(message.senderId)
        );
      });
    }
  }, [pathname]);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const newChatHandler = (message: ExtendedMessage) => {
      const sendNotification =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!sendNotification) {
        return;
      }

      toast.custom((t) => (
        <NewMessageToast
          t={t}
          sessionId={sessionId}
          senderId={message.senderId}
          senderImage={message.senderImage}
          senderName={message.senderName}
          senderMessage={message.text}
        />
      ));

      setUnreadMessages((prevMessages) => [...prevMessages, message]);
    };

    const newFriendHandler = (newFriend: User) => {
      setMyChats((prevChats) => [...prevChats, newFriend])
    };

    pusherClient.bind("new_message", newChatHandler);
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

      pusherClient.unbind("new_message", newChatHandler);
      pusherClient.unbind("new_friend", newFriendHandler);
    };
  }, [pathname, sessionId]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {myChats.sort().map((friend) => {
        const unreadMessagesCount = unreadMessages.filter((unreadMessage) => {
          return unreadMessage.senderId === friend.id;
        }).length;
        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="text-gray-700 hover:text-cyan-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
              {friend.name}
              {unreadMessagesCount > 0 ? (
                <div className="bg-cyan-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                  {unreadMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
