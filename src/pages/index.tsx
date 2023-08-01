import Editor from "@/components/Editor/index";
import { Spinner } from "@/components/Loading/spinner";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { auth, database, firebase } from "@/lib/firebase";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiChevronsRight, FiFileText } from "react-icons/fi";
import { v4 } from "uuid";

export interface Note {
  content?: string | null | undefined;
  noteId: string;
  title?: string | null | undefined;
}

export default function Home() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentSelectedNote, setCurrentSelectedNote] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | any>(undefined);
  const router = useRouter();

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      try {
        const notesRef = firebase.database().ref(`users/${user?.id}/notes`);
        notesRef.on("value", (snapshot) => {
          if (snapshot.val()) {
            setNotes(Object.values(snapshot.val()));
          } else {
            handleCreateNote();
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  async function updateNoteContent(
    newContent: string,
    currentNote: Note,
    firstH1Element: string
  ) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === currentNote.noteId
          ? { ...note, content: newContent }
          : note
      )
    );

    await database
      .ref(`users/${user?.id}/notes/${currentNote.noteId}`)
      .update({
        content: newContent,
        title: firstH1Element ? firstH1Element : "Untitled",
        noteId: currentNote.noteId,
      })
      .then(function () {
        console.log("update succeeded.");
      })
      .catch(function (error) {
        console.log("something went wrong: " + error.message);
      });

    setUnsavedChanges(false);
  }

  async function updateNoteTitle(id: string, newTitle: string) {
    if (newTitle.trim() === "") {
      newTitle = "Untitled";
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, title: newTitle } : note
      )
    );

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(async () => {
      await updateNoteTitleFirebase(newTitle, id);
      setUnsavedChanges(false);
    }, 2000);

    setTypingTimeout(newTypingTimeout);
  }

  async function handleCreateNote() {
    const newNote = {
      title: "Untitled",
      noteId: v4(),
      content: "<h1>Untitled</h1><p></p>",
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentSelectedNote(notes.length);

    await database
      .ref(`users/${user?.id}/notes/${newNote.noteId}`)
      .update({
        content: newNote.content,
        title: newNote.title,
        noteId: newNote.noteId,
      })
      .then(function () {
        console.log("update succeeded.");
      })
      .catch(function (error) {
        console.log("something went wrong: " + error.message);
      });
  }

  async function handleDeleteNote(noteId: string) {
    await deleteNoteFirebase(noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
  }

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (unsavedChanges) {
      event.preventDefault();
      event.returnValue = "Unsaved Changes";
    }
  };

  async function updateNoteTitleFirebase(noteTitle: string, noteId: string) {
    await database
      .ref(`users/${user?.id}/notes/${noteId}`)
      .update({
        title: noteTitle,
        noteId: noteId,
      })
      .then(function () {
        console.log("update succeeded.");
      })
      .catch(function (error) {
        console.log("something went wrong: " + error.message);
      });
  }

  async function deleteNoteFirebase(noteId: string) {
    await database
      .ref(`users/${user!.id}/notes/${noteId}`)
      .remove()
      .then(function () {
        console.log("Remove succeeded.");
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
      });
  }

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

              {notes.length > 0 && (
                <div className="ml-16 flex gap-2 items-center">
                  <FiFileText className="w-4 h-4 text-zinc-400" />
                  <span>{notes[currentSelectedNote]?.title}</span>
                </div>
              )}

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
            session={user}
            unsavedChanges={unsavedChanges}
            handleCreateNote={handleCreateNote}
            handleDeleteNote={handleDeleteNote}
          />
          <main className="px-8 md:px-20 py-4 mt-10 md:mt-0">
            {isSidebarOpen && notes.length > 0 && (
              <div className="select-none flex items-center gap-4 mt-2">
                {/* <div className="flex gap-2 items-center">
                  <FiFileText className="w-4 h-4 text-zinc-400" />
                  <span>{notes[currentSelectedNote]?.title}</span>
                </div> */}
                {unsavedChanges && (
                  <div className="flex items-center text-zinc-300">
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
                session={user}
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
