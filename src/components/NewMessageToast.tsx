import { chatHrefConstructor, cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import toast, { Toast } from "react-hot-toast";

interface NewMessageToastProps {
  t: Toast;
  sessionId: string;
  senderId: string;
  senderImage: string;
  senderName: string;
  senderMessage: string;
}

const NewMessageToast: FC<NewMessageToastProps> = ({
  t,
  sessionId,
  senderId,
  senderImage,
  senderName,
  senderMessage,
}) => {
  return (
    <div
    className={cn(
      "relative max-w-sm w-full bg-white shadow-md rounded-xl border border-gray-200 transition-transform transform",
      {
        "animate-enter": t.visible,
        "animate-leave": !t.visible,
      }
    )}
  >
    <button
      className="absolute top-2 right-2 p-1.5 text-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full transition"
      onClick={() => toast.dismiss(t.id)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <a
      className="flex items-center p-4 rounded-xl border border-gray-200 transition-colors duration-200 ease-in-out hover:bg-cyan-50"
      href={`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`}
      onClick={() => toast.dismiss(t.id)}
    >
      <div className="flex-shrink-0">
        <div className="relative h-12 w-12">
          <Image
            fill
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={senderImage}
            alt={`${senderName} profile image`}
          />
        </div>
      </div>
      <div className="ml-4 flex-1">
        <p className="text-base font-semibold text-cyan-700">{senderName}</p>
        <p className="mt-1 text-sm text-gray-600">{senderMessage}</p>
      </div>
    </a>
  </div>
  
  );
};

export default NewMessageToast;
