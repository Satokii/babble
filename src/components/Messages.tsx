"use client";

import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FC, useEffect, useRef, useState } from "react";
import { format, isSameDay } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  existingMessages: Message[];
  sessionId: string;
  sessionImage: string | null | undefined;
  chatFriend: User;
  chatId: string;
}

const Messages: FC<MessagesProps> = ({
  existingMessages,
  sessionId,
  sessionImage,
  chatFriend,
  chatId,
}) => {
  const [messages, setMessages] = useState<Message[]>(existingMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [chatId]);
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded"
    >
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        const subsequentUserMessages =
          messages[index - 1]?.senderId === messages[index].senderId;

        const isLastMessageOfDay =
          index === messages.length - 1 ||
          !isSameDay(
            new Date(message.timestamp),
            new Date(messages[index + 1].timestamp)
          );

        return (
          <div
            key={`${message.id}-${message.timestamp}`}
            className="chat-message"
          >
            {isLastMessageOfDay && (
              <div className="text-center text-sm mb-2 text-gray-600">
                {format(new Date(message.timestamp), "MM/dd/yyyy")}
              </div>
            )}

            <div
              className={cn("flex items-end", { "justify-end": isCurrentUser })}
            >
              <div
                className={cn("flex flex-col space-y-2 text-base mx-2", {
                  "order-1 items-end": isCurrentUser,
                  "order-2 items-start": !isCurrentUser,
                })}
              >
                <div
                  className={cn(
                    "px-2 py-1 max-w-44 sm:max-w-xs md:max-w-sm text-sm sm:text-base rounded-lg inline-block shadow-md break-words",
                    {
                      "bg-cyan-500 text-white": isCurrentUser,
                      "bg-gray-100 text-gray-800": !isCurrentUser,
                      "rounded-br-none":
                        !subsequentUserMessages && isCurrentUser,
                      "rounded-bl-none":
                        !subsequentUserMessages && !isCurrentUser,
                    }
                  )}
                >
                  <p className="pb-0.5 pr-3">{message.text}</p>
                  <span className="text-[0.6rem] sm:text-xs text-gray-600 flex justify-end">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
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
