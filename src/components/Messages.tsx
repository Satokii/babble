"use client";

import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FC, useEffect, useRef, useState } from "react";
import { format, isSameDay } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";

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

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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

  const deleteMessage = async (message: Message) => {
    try {
      await axios.post("/api/message/delete", { chatId, message });
    } catch (err) {
      console.error("Error deleting message", err)
    }
  };

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
              <div className="text-center text-[0.75rem] sm:text-sm my-3 text-gray-600">
                {isToday(new Date(message.timestamp))
                  ? "Today"
                  : format(new Date(message.timestamp), "dd/MM/yyyy")}
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
          key={message.id}
          className={cn(
            "relative px-2 py-1 max-w-44 sm:max-w-xs md:max-w-sm text-sm sm:text-base rounded-lg inline-block shadow-md break-words",
            {
              "bg-cyan-500 text-white": isCurrentUser && message.text !== "Deleted message",
              "bg-gray-100 text-gray-800": !isCurrentUser && message.text !== "Deleted message",
              "bg-red-100 text-red-600": message.text === "Deleted message",
              "rounded-br-none": !subsequentUserMessages && isCurrentUser,
              "rounded-bl-none": !subsequentUserMessages && !isCurrentUser,
            }
          )}
        >
          {message.text !== "Deleted message" && (
            <button
              className="absolute top-1 right-1 text-xs text-red-500 hover:text-red-700"
              onClick={() => deleteMessage(message)}
            >
              ✖
            </button>
          )}
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
