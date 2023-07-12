"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
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
import {
  RxChatBubble,
  RxChevronDown,
  RxCode,
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
} from "react-icons/rx";
import { TfiMarkerAlt } from "react-icons/tfi";

import { Note } from "@/pages";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { lowlight } from "lowlight";
import { useEffect } from "react";
import { BubbleButton } from "./BubbleButton";

interface Props {
  note: Note;
}

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

function Editor(props: Props) {
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
        placeholder: "Type something or Press '/' for commands...",
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
      className="w-full h-full min-h-screen min-w-full editor-container"
      onClick={() => {
        if (editor) {
          editor.chain().focus().run();
        }
      }}
    >
      <EditorContent
        editor={editor}
        className="max-w-[700px] mx-auto pt-16 prose prose-violet prose-pre:whitespace-pre-wrap prose-invert"
      />
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
          className="relative max-w-[200px] xs:max-w-full -left-2.5 md:left-0 top-48 bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col py-2 px-1 gap-1"
        >
          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <img
              src="http://www.notion.so/images/blocks/text/en-US.png"
              alt="Text"
              className="w-12  border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Text</span>
              <span className="md:hidden block text-xs text-zinc-400">
                Start with Plain text.
              </span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <img
              src="http://www.notion.so/images/blocks/header.57a7576a.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 1</span>
              <span className="text-xs text-zinc-400">
                Big section heading.
              </span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <img
              src="http://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded bg-white"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Bulleted list</span>
              <span className="text-xs text-zinc-400">
                Simple bulleted list.
              </span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <img
              src="http://www.notion.so/images/blocks/numbered-list.0406affe.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded bg-white"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Numbered list</span>
              <span className="text-xs text-zinc-400">
                Simple numbered list
              </span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <img
              src="https://www.notion.so/images/blocks/quote/en-US.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Quote</span>
              <span className="text-xs text-zinc-400">Capture a quote.</span>
            </div>
          </button>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
        >
          <BubbleButton onClick={() => {}}>
            Text
            <RxChevronDown className="w-5 h-5" />
          </BubbleButton>
          <BubbleButton>
            Comment
            <RxChatBubble className="w-5 h-5" />
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              data-active={editor.isActive("highlight")}
            >
              <TfiMarkerAlt className="w-5 h-5" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <RxFontBold className="w-5 h-5" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <RxFontItalic className="w-5 h-5" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive("strike")}
            >
              <RxStrikethrough className="w-5 h-5" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              data-active={editor.isActive("codeBlock")}
            >
              <RxCode className="w-5 h-5" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}

export default Editor;
