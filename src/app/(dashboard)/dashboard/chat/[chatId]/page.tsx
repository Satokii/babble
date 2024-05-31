import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    chatId: string
  }
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params
  const session = await getServerSession(authOptions)

  if (!session) {
    notFound()
  }

  const { user } = session
  const [userId1, userId2] = chatId.split("--")

  if (user.id !== userId1 && user.id !== userId2) {
    notFound()
  }

  return <div>{params.chatId}</div>;
};

export default page;
