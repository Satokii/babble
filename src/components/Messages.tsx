"use client";

import { Message } from "@/lib/validations/message";
import { FC, useRef, useState } from "react";

interface MessagesProps {
  existingMessages: Message[];
  sessionId: string;
}

const Messages: FC<MessagesProps> = ({ existingMessages, sessionId }) => {
  const [messages, setMessages] = useState<Message[]>(existingMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
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

      })}
    </div>
  );
};

export default Messages;
