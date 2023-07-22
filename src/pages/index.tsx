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
  __typename?: "Note" | undefined;
  content?: string | null | undefined;
  noteId: string;
  title?: string | null | undefined;
}

export default function Home({ session }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentSelectedNote, setCurrentSelectedNote] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const getNotesFromLocalStorage = (): Note[] => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  };

  const setNotesToLocalStorage = (notes: Note[]): void => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  useEffect(() => {
    const storedNotes = getNotesFromLocalStorage();

    if (storedNotes.length === 0) {
      setNotes([
        {
          title: "Untitled",
          noteId: v4(),
          content: "<h1>Untitled</h1> <p></p>",
        },
      ]);
    } else {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    if (unsavedChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    if (currentSelectedNote >= notes.length && notes.length > 1) {
      setCurrentSelectedNote(notes.length - 1);
    } else if (notes.length === 1) {
      setCurrentSelectedNote(0);
    }
  }, [notes, currentSelectedNote]);

  function updateNoteContent(id: string, newContent: string) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, content: newContent } : note
      )
    );

    setUnsavedChanges(false);

    setNotesToLocalStorage(
      notes.map((note) =>
        note.noteId === id ? { ...note, content: newContent } : note
      )
    );
  }

  function updateNoteTitle(id: string, newTitle: string) {
    if (newTitle.trim() === "") {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.noteId === id ? { ...note, title: "Untitled" } : note
        )
      );

      setUnsavedChanges(false);

      setNotesToLocalStorage(
        notes.map((note) =>
          note.noteId === id ? { ...note, title: "Untitled" } : note
        )
      );

      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, title: newTitle } : note
      )
    );

    setUnsavedChanges(false);

    setNotesToLocalStorage(
      notes.map((note) =>
        note.noteId === id ? { ...note, title: newTitle } : note
      )
    );
  }

  function handleCreateNote() {
    const newNote = {
      title: "Untitled",
      noteId: v4(),
      content: "<p></p>",
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentSelectedNote(notes.length);

    setNotesToLocalStorage([...notes, newNote]);
  }

  function handleDeleteNote(noteId: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
    setNotesToLocalStorage(notes.filter((note) => note.noteId !== noteId));
  }

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (unsavedChanges) {
      event.preventDefault();
      event.returnValue = "Unsaved Changes";
    }
  };

  return (
    <>
      <Head>
        <title>Noting | Notes App</title>
        <meta
          name="description"
          content="Welcome to our powerful and intuitive notes app! Create, read, update, and delete your notes with ease. Organize your thoughts, stay productive, and never forget important ideas. Start capturing your moments of inspiration today."
        />
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
                <span>{notes[0]?.title}</span>
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
                  <span>{notes[currentSelectedNote]?.title}</span>
                </div>
                {unsavedChanges && (
                  <div className="ml-8 flex items-center text-zinc-300">
                    <Spinner />
                    <span>Saving...</span>
                  </div>
                )}
              </div>
            )}
            {notes && notes[currentSelectedNote] && session && (
              <Editor
                note={notes[currentSelectedNote]}
                updateNoteContent={updateNoteContent}
                session={session}
                setUnsavedChanges={setUnsavedChanges}
                updateNoteTitle={updateNoteTitle}
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
