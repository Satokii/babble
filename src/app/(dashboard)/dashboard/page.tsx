import SignOutBtn from "@/components/SignOutBtn";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { chatHrefConstructor } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface PageProps {}

const Page = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  return (
    <>
      <div>Dashboard Page</div>
      <SignOutBtn />
    </>
  );
};

export default Page;
