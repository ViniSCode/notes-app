import Editor from "@/components/Editor/index";
import { Sidebar } from "@/components/Sidebar";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiChevronsRight, FiFileText } from "react-icons/fi";
import { initialNote } from "../utils/initialNote";

export interface Note {
  name: string;
  id: string;
  content: string;
}

export default function Home({ session }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentSelectedNote, setCurrentSelectedNote] = useState(0);

  useEffect(() => {
    setNotes([
      {
        name: "Untitled",
        id: "208hggjklsdafh204",
        content: initialNote,
      },
      {
        name: "Second Note",
        id: "135634slkdfjklsda83",
        content: `
          <h1>Second Note</h1>
          <p></p>
        `,
      },
    ]);
  }, []);

  function handleCreatePage() {}

  return (
    <div className="min-h-screen text-zinc-50">
      <div
        className={`relative min-h-screen mx-auto overflow-hidden w-full shadow-md bg-zinc-800 border-black/20 break-words ${
          isSidebarOpen && "md:grid md:grid-cols-[16rem_auto]"
        }`}
      >
        {!isSidebarOpen && (
          <div className="fixed z-[90] bg-zinc-800 w-full flex items-center gap-4 pt-6 pb-6 bg-800">
            <FiChevronsRight
              className="absolute w-6 h-6 z-40 left-4  text-zinc-400 hover:bg-zinc-700 rounded-sm p-0.5 cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />

            <div className="ml-16 flex gap-2 items-center">
              <FiFileText className="w-4 h-4 text-zinc-400" />
              <span>{notes[0]?.name}</span>
            </div>
          </div>
        )}

        {isSidebarOpen && <div></div>}

        <Sidebar
          currentSelectedNote={currentSelectedNote}
          setCurrentSelectedNote={setCurrentSelectedNote}
          notes={notes}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="px-8 md:px-20 py-4 mt-10 md:mt-0">
          {isSidebarOpen && (
            <div className="flex items-center gap-4 mt-2">
              <div className="flex gap-2 items-center">
                <FiFileText className="w-4 h-4 text-zinc-400" />
                <span>{notes[0]?.name}</span>
              </div>
            </div>
          )}
          {notes && notes[currentSelectedNote] && (
            <Editor note={notes[currentSelectedNote]} />
          )}
        </main>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
