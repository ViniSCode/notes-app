import { abbreviateName } from "@/utils/getAbbreviate";
import * as Avatar from "@radix-ui/react-avatar";

interface UserAvatarProps {
  avatar: string | null | undefined;
  name: string | null | undefined;
}

export function UserAvatar({ avatar, name }: UserAvatarProps) {
  return (
    <div className="flex gap-4 items-center">
      <Avatar.Root className="bg-blackA3 inline-flex w-6 h-6 rounded select-none items-center justify-center overflow-hidden align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={avatar!}
          alt={name!}
        />
        <Avatar.Fallback
          className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-zinc-800 text-[15px] font-medium"
          delayMs={600}
        >
          {name && abbreviateName(name).abbreviate}
        </Avatar.Fallback>
      </Avatar.Root>
      <span className="font-medium">
        {name && abbreviateName(name).firstName}&apos;s Notes
      </span>
    </div>
  );
}
