"use client";

import { FC, Fragment, useState } from "react";
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
import { SidebarOption } from "@/types/typings";

interface MobileLayoutProps {
  friends: User[];
  session: Session;
  sidebarOptions: SidebarOption[]
}

const MobileLayout: FC<MobileLayoutProps> = ({ friends, session, sidebarOptions }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="fixed bg-zinc-50 border-b border-zinc-200 top-0 inset-x-0 py-2 px-4">
      <div className="flex w-full justify-between items-center">
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href="/dashboard"
        >
          <Icons.Logo className="h-6 w-auto text-indigo-600" />
        </Link>
        <Button className="gap-4" onClick={() => setOpen(true)}>
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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}

                        {friends.length > 0 ? (
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Chats
                          </div>
                        ) : null}
                        <nav>
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                          >
                            <li>
                              <SidebarChatList
                                friends={friends}
                                sessionId={session.user.id}
                              />
                            </li>
                            <li>
                              <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                              </div>
                              <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                  const Icon = Icons[option.Icon];
                                  return (
                                    <li key={option.name}>
                                      <Link
                                        href={option.href}
                                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      >
                                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                                          <Icon className="h-4 w-4" />
                                        </span>
                                        <span className="truncate">
                                          {option.name}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          </ul>
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
