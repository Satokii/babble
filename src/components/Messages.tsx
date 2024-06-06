"use client";

import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FC, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  existingMessages: Message[];
  sessionId: string;
  sessionImage: string | null | undefined;
  chatFriend: User;
  chatId: string
}

const Messages: FC<MessagesProps> = ({ existingMessages, sessionId, sessionImage, chatFriend, chatId }) => {
  const [messages, setMessages] = useState<Message[]>(existingMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm dd/MM/yy");
  };

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`chat:${chatId}`)
    );

    const messageHandler = (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages])
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`chat:${chatId}`)
      );
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [chatId]);
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        const subsequentUserMessages =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div
            key={`${message.id}-${message.timestamp}`}
            className="chat-message"
          >
            <div
              className={cn("flex items-end", { "justify-end": isCurrentUser })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block shadow-md", {
                    "bg-cyan-500 text-white": isCurrentUser,
                    "bg-gray-100 text-gray-800": !isCurrentUser,
                    "rounded-br-none": !subsequentUserMessages && isCurrentUser,
                    "rounded-bl-none":
                      !subsequentUserMessages && !isCurrentUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-xs text-gray-600">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>
              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: subsequentUserMessages,
                })}
              >
                <Image
                  className="rounded-full"
                  fill
                  src={
                    isCurrentUser ? (sessionImage as string) : chatFriend.image
                  }
                  alt="User profile photo"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
