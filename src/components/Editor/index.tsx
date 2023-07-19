"use client";
import { Note } from "@/pages";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
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
import { AccessibleFloatingMenu } from "../FloatingMenu";
import EditorToggleGroup from "../ToggleGroup";

interface Props {
  note: Note;
  updateNoteContent: any;
  setUnsavedChanges: (value: boolean) => void;
}

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

function Editor(props: Props) {
  const [typingTimeout, setTypingTimeout] = useState<number | any>(undefined);

  const editor = useEditor({
    autofocus: "end",
    extensions: [
      StarterKit,
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
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-500/20 text-white",
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "",
        },
      }),
    ],
    content: props.note.content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      props.setUnsavedChanges(true);

      const newContent = editor.getHTML(); // Get the updated note content from the editor

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const newTypingTimeout = setTimeout(() => {
        props.updateNoteContent(props.note.id, newContent);
      }, 2400);

      setTypingTimeout(newTypingTimeout);
    },
    onBlur: ({ editor }) => {},
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        // Optionally, you can display a message or perform some action here
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    editor?.chain().setContent(props.note.content).run();
  }, [props.note.content]);

  return (
    <div
      className="w-full h-full min-h-screen min-w-full editor-container relative z-0"
      onClick={() => {
        if (editor) {
          const isText = editor.state.selection.$from.nodeBefore?.isText;
          if (isText && !editor.isFocused) {
            editor.chain().focus().setHardBreak().run();
          }

          editor.chain().focus().run();
        }
      }}
    >
      <EditorContent
        editor={editor}
        className="max-w-[90vw] md:max-w-[50vw] min-h-fit z-40 relative mx-auto pt-16 prose prose-violet prose-pre:whitespace-pre-wrap prose-invert selection:bg-blue-500/20"
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
  );
}

export default Editor;
