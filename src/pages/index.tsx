import Editor from "@/components/Editor/index";
import { Spinner } from "@/components/Loading/spinner";
import { Sidebar } from "@/components/Sidebar";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FiChevronsRight, FiFileText } from "react-icons/fi";
import { v4 } from "uuid";

export interface Note {
  name: string;
  id: string;
  content: string;
}

export default function Home({ session }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentSelectedNote, setCurrentSelectedNote] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    setNotes([
      {
        name: "Untitled",
        id: "208hggjklsdafh204",
        content: "<h1>Untitled</h1> <p></p>",
      },
      {
        name: "Untitled 2",
        id: "208hggjklsdafh204sdfsdf",
        content: "<h1>Untitled 2</h1> <p></p>",
      },
    ]);
  }, []);

  function updateNoteContent(id: string, newContent: string) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );

    setUnsavedChanges(false);
  }

  function handleCreateNote() {
    const newNote = {
      name: "Untitled",
      id: v4(),
      content: "<h1>Untitled 2</h1> <p></p>",
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentSelectedNote(notes.length); // Select the newly created note
  }

  function handleDeleteNote(noteId: string) {
    // Filter out the note with the specified ID
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

    // Select the previous note or the first note after deleting the current one
    setCurrentSelectedNote((prevSelectedNote) =>
      Math.max(prevSelectedNote - 1, 0)
    );
  }

  const handleBeforeUnload = (event: any) => {
    event.preventDefault();
    event.returnValue = "Unsaved Changes"; // This empty string will trigger the confirmation message
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Noting | Notes App</title>
      </Head>
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

              {unsavedChanges && (
                <div className="ml-8 flex items-center text-zinc-300">
                  <Spinner />
                  <span>Saving...</span>
                </div>
              )}
            </div>
          )}

          {isSidebarOpen && <div></div>}

          <Sidebar
            currentSelectedNote={currentSelectedNote}
            setCurrentSelectedNote={setCurrentSelectedNote}
            notes={notes}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            session={session}
            unsavedChanges={unsavedChanges}
            handleCreateNote={handleCreateNote}
            handleDeleteNote={handleDeleteNote}
          />
          <main className="px-8 md:px-20 py-4 mt-10 md:mt-0">
            {isSidebarOpen && (
              <div className="select-none flex items-center gap-4 mt-2">
                <div className="flex gap-2 items-center">
                  <FiFileText className="w-4 h-4 text-zinc-400" />
                  <span>{notes[currentSelectedNote]?.name}</span>
                </div>
                {unsavedChanges && (
                  <div className="ml-8 flex items-center text-zinc-300">
                    <Spinner />
                    <span>Saving...</span>
                  </div>
                )}
              </div>
            )}
            {notes && notes[currentSelectedNote] && (
              <Editor
                note={notes[currentSelectedNote]}
                updateNoteContent={updateNoteContent}
                setUnsavedChanges={setUnsavedChanges}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
