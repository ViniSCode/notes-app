import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FiTrash } from "react-icons/fi";

const DeleteDialog = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="w-6 h-6 flex items-center justify-center indent-[9999em] uppercase text-zinc-400 hover:text-zinc-300 rounded-sm hover:bg-zinc-500  transition-colors">
        <FiTrash className="w-4 h-4" />
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-[90] bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="bg-zinc-700 z-[100] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow focus:outline-none">
        <AlertDialog.Title className="text-zinc-50 m-0 text-[17px] font-medium">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-zinc-50 mt-4 mb-5 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete your note
          removing it from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-mauve11 bg-mauve4 hover:bg-mauve8 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="text-red11 bg-red4 hover:bg-red6 focus:shadow-red9 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Yes, delete account
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteDialog;
