"use client";

import { Message } from "@/lib/validations/message";
import { FC, useRef } from "react";

interface MessagesProps {
    existingMessages: Message[]
}

const Messages: FC<MessagesProps> = ({ existingMessages }) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />
    </div>
  );
};

export default Messages;
