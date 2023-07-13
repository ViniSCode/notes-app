//@ts-nocheck
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { UserAvatar } from "../UserAvatar";

interface ProfileDropdownProps {
  session: Session;
}

const ProfileDropdown = ({ session }: ProfileDropdownProps) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {session && session.user?.name && (
          <button className="focus:outline-none">
            <UserAvatar
              avatar={session.user?.image}
              name={session.user?.name}
            />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="p-4 relative left-6 z-[50] max-w-[200px] min-w-[200px] bg-zinc-800 rounded-md shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="py-4 pl-0 pr-2 text-sm flex items-center gap-4 cursor-pointer z-[120] group text-[13px] leading-none text-zinc-300 rounded h-[25px] relative select-none outline-none data-[disabled]:text-zinc-400 data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-700 data-[highlighted]:text-blue-500"
            onClick={() => signOut()}
          >
            <FiLogOut size={16} />
            Logout
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
