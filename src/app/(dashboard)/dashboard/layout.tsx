import { Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import SignOutBtn from "@/components/SignOutBtn";
import FriendRequestLink from "@/components/FriendRequestLink";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import SidebarChatList from "@/components/SidebarChatList";
import MobileLayout from "@/components/MobileLayout";
import AddFriendLink from "@/components/AddFriendLink";
import ProfileLink from "@/components/ProfileLink";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  const requestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      <header className="hidden md:flex w-full bg-gradient-to-r from-cyan-200 to-teal-300 shadow-lg p-4 items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center h-16 py-2 px-3 gap-2 transition duration-300 ease-in-out hover:bg-cyan-100 hover:text-cyan-700 rounded-lg hover:shadow-md"
          >
            <div className="relative w-12 h-12">
              <Icons.Logo />
            </div>
            <h1 className="text-2xl font-bold text-cyan-600">Babble</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ProfileLink session={session} />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="md:hidden">
          <MobileLayout
            friends={friends}
            session={session}
            friendReqCount={requestCount}
          />
        </div>
        <div className="hidden md:flex flex-col h-full max-w-[16rem] gap-y-6 rounded-md bg-gradient-to-r from-cyan-200 to-teal-300 border-r shadow-lg px-5 pt-4 pb-2">
          {friends.length > 0 ? (
            <div className="text-sm font-semibold leading-6 text-gray-500">
              Chats
            </div>
          ) : null}

          <nav className="flex flex-1 flex-col flex-shrink-0">
            <ul role="list" className="flex flex-1 flex-col gap-y-6">
              <li>
                <SidebarChatList
                  friends={friends}
                  sessionId={session.user.id}
                />
              </li>
              <li>
                <div className="text-sm font-semibold leading-6 text-gray-500">
                  Overview
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-2">
                  <li>
                    <AddFriendLink />
                  </li>
                  <li>
                    <FriendRequestLink
                      sessionId={session.user.id}
                      INITIAL_COUNT={requestCount}
                    />
                  </li>
                </ul>
              </li>
            </ul>
            <div className="flex items-center justify-end">
              <SignOutBtn />
            </div>
          </nav>
        </div>
        <section className="max-h-screen container my-6 sm:my-2 py-16 md:py-12 w-full overflow-y-auto">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
