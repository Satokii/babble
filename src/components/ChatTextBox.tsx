"use client";

import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./ui/Button";
import axios from "axios";
import toast from "react-hot-toast";

interface ChatTextBoxProps {
  chatFriend: User;
  chatId: string;
}

const ChatTextBox: FC<ChatTextBoxProps> = ({ chatFriend, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [messageContent, setMessageContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!messageContent) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/message/send", { text: messageContent, chatId });
      setMessageContent("");
      textareaRef.current?.focus();
    } catch (err) {
      toast.error("Could not send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2 py-2 sm:px-4 sm:py-4 bg-gray-50 shadow-md rounded-lg flex items-center space-x-3">
      <div className="relative flex-grow">
        <TextareaAutosize
          className="block w-full resize-none border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-cyan-600 focus:ring focus:ring-cyan-300 focus:ring-opacity-50 sm:py-2 text-[0.7rem] sm:text-sm sm:leading-6 shadow-sm"
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
          placeholder={`Message ${chatFriend.name}`}
        />
      </div>
      <Button
        onClick={sendMessage}
        isLoading={isLoading}
        type="submit"
        className="bg-cyan-600 text-white text-[0.75rem] sm:text-sm rounded-lg px-4 py-2 hover:bg-cyan-500 focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50 transition duration-300"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatTextBox;
