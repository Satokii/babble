"use client";

import { FC, Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Button, { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";
import SidebarChatList from "./SidebarChatList";
import { Session } from "next-auth";
import FriendRequestLink from "./FriendRequestLink";
import Image from "next/image";
import SignOutBtn from "./SignOutBtn";
import { usePathname } from "next/navigation";
import AddFriendLink from "./AddFriendLink";
import ProfileLink from "./ProfileLink";

interface MobileLayoutProps {
  friends: User[];
  session: Session;
  friendReqCount: number;
}

const MobileLayout: FC<MobileLayoutProps> = ({
  friends,
  session,
  friendReqCount,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 bg-gradient-to-r  from-cyan-500 to-teal-500 border-b shadow-lg p-4 inset-x-0 py-1 px-3">
      <div className="flex h-16 w-full justify-between items-center px-1">
        <div className="max-w-xs">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-1 px-3 py-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-full bg-white bg-opacity-20 hover:bg-opacity-40"
          >
            <div className="relative w-9 h-9">
              <Icons.Logo className="text-white" />
            </div>
            <h1 className="text-md font-extrabold text-white">Babble</h1>
          </Link>
        </div>
        <Button className="gap-4 bg-cyan-700 hover:bg-cyan-900" onClick={() => setOpen(true)}>
          Menu <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                    <TransitionChild
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full flex-col gap-y-4 rounded-md overflow-y-scroll bg-gradient-to-r from-gray-100 to-gray-200 pb-3">
                      <div className="flex w-full bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg p-4 items-center justify-between">
                      <div className="flex items-center">
                        <Link
                          href="/dashboard"
                          className="flex items-center justify-center gap-1 px-3 py-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-full bg-white bg-opacity-20 hover:bg-opacity-40"
                        >
                          <div className="relative w-9 h-9">
                            <Icons.Logo className="text-white" />
                          </div>
                          <h1 className="text-md font-extrabold text-white">
                            Babble
                          </h1>
                        </Link>
                        </div>
                          <ProfileLink session={session} />
                        </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col">
                        {/* Sidebar content */}

                        {friends.length > 0 ? (
                          <div className="text-lg font-semibold leading-6 text-cyan-600 mb-3">
                            Chats
                          </div>
                        ) : null}
                        <nav className="flex flex-1 flex-col flex-shrink-0">
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-6"
                          >
                            <li>
                              <SidebarChatList
                                friends={friends}
                                sessionId={session.user.id}
                              />
                            </li>

                            <li>
                              <div className="text-lg font-semibold leading-6 text-cyan-600 mb-3">
                                Friend Options
                              </div>

                              <ul role="list" className="-mx-2 mt-2 space-y-1">
                                <li>
                                  <AddFriendLink />
                                </li>

                                <li>
                                  <FriendRequestLink
                                    sessionId={session.user.id}
                                    INITIAL_COUNT={friendReqCount}
                                  />
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <div>
                            <SignOutBtn />
                          </div>
                        </nav>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MobileLayout;
