import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Editor } from "@tiptap/react";

interface AccessibleFloatingMenuProps {
  editor: Editor;
}

export function AccessibleFloatingMenu(props: AccessibleFloatingMenuProps) {
  return (
    <NavigationMenu.Root className="relative z-[50] flex w-[500px]">
      <NavigationMenu.List className="max-w-[200px] xs:max-w-[400px] bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col py-2 px-1 gap-1">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => {
              const { $from } = props.editor.state.selection;
              props.editor
                .chain()
                .focus()
                .deleteRange({ from: $from.before() + 1, to: $from.end() })
                .run();
              props.editor.chain().focus().toggleHeading({ level: 1 }).run();
              props.editor.chain().focus().setParagraph().run();
            }}
          >
            <img
              src="http://www.notion.so/images/blocks/text/en-US.png"
              alt="Text"
              className="w-12  border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Text</span>
              <span className="block text-xs text-zinc-400">
                Start with Plain text.
              </span>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => {
              const { $from } = props.editor.state.selection;
              props.editor
                .chain()
                .focus()
                .deleteRange({ from: $from.before() + 1, to: $from.end() })
                .run();
              props.editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
          >
            <img
              src="http://www.notion.so/images/blocks/header.57a7576a.png"
              alt="Heading"
              className="w-12  border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 1</span>
              <span className="text-xs text-zinc-400">
                Big section heading.
              </span>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => {
              const { $from } = props.editor.state.selection;
              props.editor
                .chain()
                .focus()
                .deleteRange({ from: $from.before() + 1, to: $from.end() })
                .run();
              props.editor.chain().focus().toggleHeading({ level: 1 }).run();
              props.editor.chain().focus().toggleBulletList().run();
            }}
          >
            <img
              src="http://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
              alt="Bullet List"
              className="w-12 bg-white border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Bulleted list</span>
              <span className="text-xs text-zinc-400">
                Simple bulleted list.
              </span>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => {
              const { $from } = props.editor.state.selection;
              props.editor
                .chain()
                .focus()
                .deleteRange({ from: $from.before() + 1, to: $from.end() })
                .run();
              props.editor.chain().focus().toggleHeading({ level: 1 }).run();
              props.editor.chain().focus().toggleOrderedList().run();
            }}
          >
            <img
              src="http://www.notion.so/images/blocks/numbered-list.0406affe.png"
              alt="Numbered List"
              className="w-12 bg-white border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Numbered list</span>
              <span className="text-xs text-zinc-400">
                Simple numbered list
              </span>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => {
              const { $from } = props.editor.state.selection;
              props.editor
                .chain()
                .focus()
                .deleteRange({ from: $from.before() + 1, to: $from.end() })
                .run();
              props.editor.chain().focus().toggleHeading({ level: 1 }).run();
              props.editor.chain().focus().toggleBlockquote().run();
            }}
          >
            <img
              src="https://www.notion.so/images/blocks/quote/en-US.png"
              alt="Quote"
              className="w-12 bg-white border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Quote</span>
              <span className="text-xs text-zinc-400">Capture a quote.</span>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        {/* <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
            <img
              src="https://www.notion.so/images/blocks/image.33d80a98.png"
              alt="Image"
              className="w-12 bg-white border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Image</span>
              <span className="text-xs text-zinc-400">Upload or embed</span>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item> */}
      </NavigationMenu.List>
      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
}
