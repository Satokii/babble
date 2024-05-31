import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SidebarChatListProps {
  friends: User[];
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnreadMessages((prevMessages) => {
        return prevMessages.filter(
          (message) => !pathname.includes(message.senderId)
        );
      });
    }
  }, [pathname]);

  return (
    <ul
      role="list"
      className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1"
    >
        {friends.sort().map((friend) => {
            const unreadMessagesCount = unreadMessages.filter((unreadMessage) => {
                return unreadMessage.senderId === friend.id
            }).length
            return <li></li>
        })}
    </ul>
  );
};

export default SidebarChatList;
