"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, ChevronDown, Italic } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { useCallback } from "react";

interface TextEditorProps {
  content: string;
  placeHolder: string;
  onUpdate: (content: string) => void;
}
export default function TextEditor({
  content,
  placeHolder,
  onUpdate,
}: TextEditorProps) {
  const handleUpdate = useCallback(
    ({ editor }: { editor: any }) => {
      onUpdate(editor.getHTML());
    },
    [onUpdate]
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeHolder,
        emptyEditorClass: "is-editor-empty text-muted-foreground/60",
        showOnlyWhenEditable: false,
      }),
    ],
    content: content,
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg ">
      <div className="flex items-center gap-1 p-1 border-b ">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Toggle size="sm" variant="outline" className="gap-1 border-none ">
              {editor.isActive("bulletList") || editor.isActive("orderedList")
                ? "List"
                : editor.isActive("codeBlock")
                ? "Code"
                : "Text"}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Toggle>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onSelect={() => editor.chain().focus().setParagraph().run()}
            >
              Text
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => editor.chain().focus().toggleBulletList().run()}
            >
              • List
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1. List
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
