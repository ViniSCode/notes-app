import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Editor } from "@tiptap/react";
import {
  RxCode,
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxTrash,
} from "react-icons/rx";
import { TfiMarkerAlt } from "react-icons/tfi";

const toggleGroupItemClasses =
  "p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none data-[active=true]:hover:text-zinc-blue-500  hover:bg-zinc-600 data-[active=true]:text-blue-500";

interface EditorToggleGroupProps {
  editor: Editor;
}

export function EditorToggleGroup(props: EditorToggleGroupProps) {
  const isContentImage =
    props.editor.state.selection.$from.nodeBefore?.attrs?.src;
  return (
    <ToggleGroup.Root
      className="inline-flex bg-zinc-700 rounded shadow-[0_2px_10px] shadow-blackA7 space-x-px"
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="highlight"
        data-active={props.editor.isActive("highlight")}
        onClick={() => props.editor.chain().focus().toggleHighlight().run()}
      >
        <TfiMarkerAlt className="w-5 h-5" />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="bold"
        onClick={() => props.editor.chain().focus().toggleBold().run()}
        data-active={props.editor.isActive("bold")}
      >
        <RxFontBold className="w-5 h-5" />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="italic"
        onClick={() => props.editor.chain().focus().toggleItalic().run()}
        data-active={props.editor.isActive("italic")}
      >
        <RxFontItalic className="w-5 h-5" />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="strike"
        onClick={() => props.editor.chain().focus().toggleStrike().run()}
        data-active={props.editor.isActive("strike")}
      >
        <RxStrikethrough className="w-5 h-5" />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="code"
        aria-label="Left aligned"
        data-active={props.editor.isActive("codeBlock")}
        onClick={() => props.editor.chain().focus().toggleCodeBlock().run()}
      >
        <RxCode className="w-5 h-5" />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="delete"
        onClick={() => props.editor.chain().focus().deleteSelection().run()}
      >
        <RxTrash className="w-5 h-5" />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
