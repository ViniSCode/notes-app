//@ts-nocheck
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Session } from "next-auth";
import { BiExpandVertical } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { UserAvatar } from "../UserAvatar";

interface ProfileDropdownProps {
  session?: Session;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="w-full flex items-center min-w-fit gap-2 focus:outline-none hover:bg-zinc-700 mt-3 ml-3 pt-3 p-3 mr-3 rounded">
          <UserAvatar
            avatar="https://github.com/vinisocde.png"
            name="Vinícius Rodrigues"
          />
          <BiExpandVertical className="text-zinc-400" size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="p-4 relative left-0 z-[50] max-w-[200px] min-w-[200px] bg-zinc-800 rounded-md shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="py-4 pl-2 pr-2 text-sm flex items-center gap-4 cursor-pointer z-[120] group text-[13px] leading-none text-zinc-300 rounded h-[25px] relative select-none outline-none data-[disabled]:text-zinc-400 data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-700 data-[highlighted]:text-blue-500">
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
