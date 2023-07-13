import { Note } from "@/pages";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { FiChevronsLeft, FiFileText, FiPlus, FiTrash } from "react-icons/fi";
import ProfileDropdown from "../LogoutDropdown";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  notes: Note[];
  setCurrentSelectedNote: any;
  currentSelectedNote: any;
  session: Session;
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  notes,
  setCurrentSelectedNote,
  currentSelectedNote,
  session,
}: SidebarProps) {
  const sidebarVariants = {
    closed: {
      opacity: 0,
      x: -300,
    },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={"closed"}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed overflow-hidden min-h-full z-50 bg-zinc-900 border-r border-r-zinc-700 w-[16rem] min-w-[16rem]"
    >
      <aside className="static w-[16rem] min-w-[16rem]">
        <div className="flex gap-4 group justify-between items-center px-6 py-6">
          <ProfileDropdown session={session} />

          <FiChevronsLeft
            className="w-6 h-6 text-zinc-400 hover:bg-zinc-700 rounded-sm p-0.5 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <div className="flex flex-col gap-0.5 px-2">
          {notes &&
            notes.map((note: any, index: any) => (
              <div
                key={index}
                onClick={() => setCurrentSelectedNote(index)}
                className="select-none first:mt-6 data-[active=true]:bg-zinc-700 gap-2 flex justify-between items-center text-sm cursor-pointer bg-zinc-900 hover:bg-zinc-600 px-6 py-1 font-medium text-white rounded-sm transition-colors"
                data-active={currentSelectedNote === index}
              >
                <div className="flex gap-2 items-center">
                  <FiFileText className="w-4 h-4 text-zinc-400" />
                  <span>{note.name}</span>
                </div>
                <FiTrash className="w-4 h-4 text-zinc-400" />
              </div>
            ))}

          <div className="mt-1 gap-2 flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-600 px-6 py-1 text-zinc-400 rounded-sm transition-colors">
            <div
              className="flex gap-2 items-center"
              onClick={() => notes.push()}
            >
              <FiPlus className="w-4 h-4" />
              <span className="font-medium">Add a page</span>
            </div>
          </div>
        </div>
      </aside>
    </motion.div>
  );
}
