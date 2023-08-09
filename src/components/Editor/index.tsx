"use client";
import { storage } from "@/lib/firebase";
import { Note } from "@/pages";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import { Image as TipTapImage } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/tokyo-night-dark.css";
import { lowlight } from "lowlight";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AccessibleFloatingMenu } from "../FloatingMenu";
import { EditorToggleGroup } from "../ToggleGroup";

interface Props {
  note: Note;
  updateNoteContent: any;
  setUnsavedChanges: (value: boolean) => void;
  session?: any;
  updateNoteTitle: any;
  unsavedChanges: boolean;
}

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const CustomDocument = Document.extend({
  content: "heading block*",
});

function Editor(props: Props) {
  const [typingTimeout, setTypingTimeout] = useState<number | any>(undefined);

  useEffect(() => {
    if (props.unsavedChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [props.unsavedChanges]);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (props.unsavedChanges && editor) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const firstH1Element = getFirstH1FromHTML(editor.getHTML());
      props.updateNoteContent(editor.getHTML(), props.note, firstH1Element);

      event.preventDefault();
      event.returnValue = "Unsaved Changes";
    }
  };

  const editor = useEditor({
    autofocus: "end",
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      TipTapImage,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        linkOnPaste: true,
        autolink: true,
        HTMLAttributes: {
          class: "cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading";
          }

          return "Type something or Press '/' for commands...";
        },
        emptyNodeClass: "isNodeEmpty",
        showOnlyCurrent: false,
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-500/20 text-white",
        },
      }),
    ],
    content: props.note.content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
      handleDrop: function (view, event, slice, moved) {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          let file = event.dataTransfer.files[0];
          let filesize = Number((file.size / 1024 / 1024).toFixed(4));
          if (
            (file.type === "image/jpeg" || file.type === "image/png") &&
            filesize < 10
          ) {
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.src = _URL.createObjectURL(file);

            img.addEventListener("load", () => {});

            img.onload = function () {
              if (img.width > 5000 || img.height > 5000) {
                window.alert(
                  "Your images need to be less than 5000 pixels in height and width."
                );
              } else {
                uploadImage(file)
                  .then(function (response: any) {
                    let image = new Image();
                    image.src = response;
                    image.onload = function () {
                      const { schema } = view.state;
                      const coordinates = view.posAtCoords({
                        left: event.clientX,
                        top: event.clientY,
                      });
                      const node = schema.nodes.image.create({ src: response });
                      const transaction = view.state.tr.insert(
                        coordinates!.pos,
                        node
                      );
                      return view.dispatch(transaction);
                    };
                  })
                  .catch(function (error: any) {
                    if (error) {
                      window.alert(
                        "There was a problem uploading your image, please try again."
                      );
                    }
                  });
              }
            };
          } else {
            window.alert(
              "Images need to be in jpg or png format and less than 10mb in size."
            );
          }
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const newTypingTimeout = setTimeout(async () => {
        const firstH1Element = getFirstH1FromHTML(editor.getHTML());
        props.updateNoteContent(editor.getHTML(), props.note, firstH1Element);
      }, 20000);

      setTypingTimeout(newTypingTimeout);

      props.setUnsavedChanges(true);
    },
    onBlur: ({ editor }) => {},
  });

  function getFirstH1FromHTML(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const h1Element = doc.querySelector("h1");
    h1Element?.classList.add("title");

    if (h1Element) {
      return h1Element.textContent;
    } else {
      return null;
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        if (props.unsavedChanges && editor) {
          if (typingTimeout) {
            clearTimeout(typingTimeout);
          }

          const firstH1Element = getFirstH1FromHTML(editor.getHTML());
          props.updateNoteContent(editor.getHTML(), props.note, firstH1Element);
          toast.success("Saved", {
            autoClose: 2000,
          });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.unsavedChanges]);

  useEffect(() => {
    editor?.chain().setContent(props!.note!.content!).run();
  }, [props.note.content]);

  async function uploadImage(file: File): Promise<string> {
    try {
      const storageRef = storage.ref().child(`images/${file.name}`);
      const snapshot = await storageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  return (
    <>
      <div
        className="w-full h-full min-h-screen min-w-full editor-container relative z-0"
        onClick={() => {
          if (editor) {
            const isText = editor.state.selection.$from.nodeBefore?.isText;
            if (isText && !editor.isFocused) {
              editor.chain().focus().selectTextblockEnd().run();
            }

            editor.chain().focus().run();
          }
        }}
      >
        <EditorContent
          editor={editor}
          className="mt-32 max-w-[90vw] md:max-w-[50vw] min-h-fit z-40 relative mx-auto prose prose-violet prose-pre:whitespace-pre-wrap prose-invert selection:bg-blue-500/20"
        />

        {editor && (
          <FloatingMenu
            editor={editor}
            shouldShow={({ state }) => {
              const { $from } = state.selection;
              const currentLineText = $from.nodeBefore?.textContent === "/";

              return currentLineText && editor.isFocused;
            }}
            tippyOptions={{ zIndex: 40 }}
            className="relative xs:max-w-full -left-2.5 md:left-0 top-48"
          >
            <AccessibleFloatingMenu editor={editor} />
          </FloatingMenu>
        )}
        {editor && (
          <BubbleMenu
            editor={editor}
            className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
          >
            <div className="flex items-center">
              <EditorToggleGroup editor={editor} />
            </div>
          </BubbleMenu>
        )}
      </div>
    </>
  );
}

export default Editor;
