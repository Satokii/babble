"use client";

import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ChatTextBoxProps {
  chatFriend: User;
}

const ChatTextBox: FC<ChatTextBoxProps> = ({ chatFriend }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [messageContent, setMessageContent] = useState<string>("");
  const sendMessage = () => {};

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize ref={textareaRef} />
      </div>
    </div>
  );
};

export default ChatTextBox;
