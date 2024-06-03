import { chatHrefConstructor, cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import toast, { Toast } from "react-hot-toast";

interface NewMessageToastProps {
  t: Toast;
  sessionId: string;
  senderId: string;
  senderImage: string
  senderName: string
}

const NewMessageToast: FC<NewMessageToastProps> = ({
  t,
  sessionId,
  senderId,
  senderImage,
  senderName
}) => {
  return (
    <div
      className={cn(
        "max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5",
        {
          "animate-enter": t.visible,
          "animate-leave": !t.visible,
        }
      )}
    >
      <a
        className="flex-1 w-0 p-4"
        href={`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`}
        onClick={() => toast.dismiss(t.id)}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="relative h-10 w-10">
              <Image
                fill
                referrerPolicy="no-referrer"
                className="rounded-full"
                src={senderImage}
                alt={`${senderName} profile image`}
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default NewMessageToast;
