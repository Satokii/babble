import { FC, useState } from "react";

interface SidebarChatListProps {
  friends: User[];
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends }) => {
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
    </ul>
  );
};

export default SidebarChatList;
