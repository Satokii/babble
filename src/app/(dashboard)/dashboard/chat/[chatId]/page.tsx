import { FC } from "react";

interface PageProps {
  params: {
    chatId: string
  }
}

const page: FC<PageProps> = ({ params }: PageProps) => {
  return <div>{params.chatId}</div>;
};

export default page;
