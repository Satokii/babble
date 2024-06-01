"use client";

import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./ui/Button";

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
        <TextareaAutosize
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder={`Send a message to ${chatFriend.name}`}
        />
        <div
          className="py-2"
          aria-hidden="true"
          onClick={() => textareaRef.current?.focus()}
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
                <Button onClick={sendMessage} type="submit">Post</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTextBox;
