import { Icon, Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import Image from "next/image";
import SignOutBtn from "@/components/SignOutBtn";
import FriendRequestMenu from "@/components/FriendRequestMenu";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import SidebarChatList from "@/components/SidebarChatList";
import MobileLayout from "@/components/MobileLayout";
import { SidebarOption } from "@/types/typings";

interface LayoutProps {
  children: ReactNode;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/add",
    icon: "UserPlus",
  },
];

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
    <div className="w-full flex h-screen">
      <div className="md:hidden">
        <MobileLayout
          friends={friends}
          session={session}
          sidebarOptions={sidebarOptions}
          friendReqCount={requestCount}
        />
      </div>
      <div className="hidden md:flex flex-col h-full w-full max-w-[16rem] gap-y-6 rounded-lg overflow-y-auto bg-gradient-to-r from-cyan-200 to-teal-300 border-r shadow-lg p-4">
        <div className="max-w-xs">
          <Link
            href="/dashboard"
            className="flex items-center justify-center h-16 gap-2 transition duration-300 ease-in-out hover:bg-cyan-100 hover:text-cyan-700 rounded-lg hover:shadow-md"
          >
            <div className="relative w-12 h-12">
              <Icons.Logo />
            </div>
            <h1 className="text-2xl font-bold text-cyan-600">Time2Chat</h1>
          </Link>
        </div>

        {friends.length > 0 ? (
          <div className="text-sm font-semibold leading-6 text-gray-500">
            Chats
          </div>
        ) : null}

        <nav className="flex flex-1 flex-col flex-shrink-0">
          <ul role="list" className="flex flex-1 flex-col gap-y-6">
            <li>
              <SidebarChatList friends={friends} sessionId={session.user.id} />
            </li>
            <li>
              <div className="text-sm font-semibold leading-6 text-gray-500">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-2">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-800 hover:text-cyan-600 hover:bg-cyan-50 group flex gap-4 rounded-md p-2 text-sm leading-6 font-semibold transition duration-300 ease-in-out"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-cyan-600 group-hover:text-cyan-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white transition duration-300 ease-in-out">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestMenu
                    sessionId={session.user.id}
                    INITIAL_COUNT={requestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-3 px-1 py-3 text-sm font-semibold leading-5 text-gray-900">
                <div className="relative h-9 w-9">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session?.user.image || ""}
                    alt="User profile picture"
                  />
                </div>

                <span className="sr-only">Profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-gray-500" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <SignOutBtn className="h-full aspect-square hover:bg-cyan-100 transition duration-300 ease-in-out" />
            </li>
          </ul>
        </nav>
      </div>
      <section className="max-h-screen container my-6 sm:my-2 py-16 md:py-12 w-full">
        {children}
      </section>
    </div>
  );
};

export default Layout;
