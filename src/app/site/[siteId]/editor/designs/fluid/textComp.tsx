import React from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FluidTextSettings } from "@/types/sectionsTypes/fluid";
import { Bold, Italic, Heading2, Heading } from "lucide-react";

interface TextComponentProps {
  isEditing: boolean;
  isSelected: boolean;
  textSettings: FluidTextSettings;
  onTextChange: (key: keyof FluidTextSettings, value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const TextComponent: React.FC<TextComponentProps> = ({
  isSelected,
  isEditing,
  textSettings,
  onTextChange,
  onFocus,
  onBlur,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: textSettings.html,
    onUpdate: ({ editor }) => {
      onTextChange("html", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `outline-none h-full prose max-w-none ${
          isSelected && !isEditing ? "outline outline-1" : ""
        } ${isEditing && "cursor-text"}`,
      },
      handleDOMEvents: {
        mousedown: (view, event) => {
          if (isEditing) {
            event.stopPropagation();
          }
          return false;
        },
        click: (view, event) => {
          if (isEditing) {
            event.stopPropagation();
          }
          return false;
        },
        mouseup: (view, event) => {
          if (isEditing) {
            event.stopPropagation();
          }
          return false;
        },
      },
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({
    onClick,
    isActive,
    children,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-secondary ${
        isActive ? "bg-secondary" : ""
      }`}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );

  return (
    <div
      className="relative h-full w-full"
      onDoubleClick={(e) => {
        e.stopPropagation();
        editor.chain().focus().run();
        onFocus();
      }}
      onBlur={() => {
        editor.destroy();
        onBlur();
      }}
    >
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex items-center  rounded-lg shadow-lg p-1 gap-1"
        >
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic size={16} />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={16} />
          </MenuButton>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex items-center  rounded-lg shadow-lg p-1 gap-1"
        >
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <div className="flex items-center gap-2">
              <Heading size={16} />
              <span>Heading 1</span>
            </div>
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <div className="flex items-center gap-2">
              <Heading2 size={16} />
              <span>Heading 2</span>
            </div>
          </MenuButton>
        </FloatingMenu>
      )}

      <div
        className="h-full w-full"
        onMouseDown={(e) => {
          if (isEditing) {
            e.stopPropagation();
          }
        }}
      >
        <EditorContent className="h-full w-full" editor={editor} />
      </div>
    </div>
  );
};

export default TextComponent;
