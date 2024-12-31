import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import FontSize from "tiptap-extension-font-size";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  RemoveFormatting,
  Highlighter,
  Strikethrough,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import type { Instance } from "tippy.js";
import { FluidTextSettings } from "@/types/sectionsTypes/fluid";

interface TextComponentProps {
  isEditing: boolean;
  isSelected: boolean;
  textSettings: FluidTextSettings;
  onTextChange: (key: keyof FluidTextSettings, value: any) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const MenuButton = React.memo(
  ({
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
      className={`p-2 rounded hover:bg-secondary border ${
        isActive ? "bg-secondary" : ""
      }`}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
    </button>
  )
);

MenuButton.displayName = "MenuButton";

const TextComponent: React.FC<TextComponentProps> = ({
  isSelected,
  isEditing,
  textSettings,
  onTextChange,
  onFocus,
  onBlur,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [highlightPickerVisible, setHighlightPickerVisible] = useState(false);

  const fontSizes = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "24px",
    "30px",
    "36px",
    "48px",
    "60px",
    "96px",
  ];

  const editorProps = useMemo(
    () => ({
      attributes: {
        class: `outline-none h-full prose max-w-none ${
          isSelected && !isEditing ? "outline outline-1" : ""
        } ${isEditing ? "cursor-text" : "cursor-default"}`,
      },
      handleDOMEvents: {
        mousedown: (view: any, event: Event) => {
          setColorPickerVisible(false);
          setHighlightPickerVisible(false);
          if (!isEditing) {
            event.preventDefault();
          }
          if (isEditing) {
            event.stopPropagation();
          }
          return true;
        },
        click: (view: any, event: Event) => {
          setColorPickerVisible(false);

          if (!isEditing) {
            event.preventDefault();
          }
          if (isEditing) {
            event.stopPropagation();
          }
          return true;
        },
        mouseup: (view: any, event: Event) => {
          setColorPickerVisible(false);
          setHighlightPickerVisible(false);

          if (!isEditing) {
            event.preventDefault();
          }
          if (isEditing) {
            event.stopPropagation();
          }
          return true;
        },
      },
    }),
    [isEditing, isSelected]
  );

  const handleUpdate = useCallback(
    ({ editor }: { editor: any }) => {
      onTextChange("html", editor.getHTML());
    },
    [onTextChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
      Underline,
      Strike,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Write something …",
        emptyEditorClass: "is-editor-empty text-muted-foreground/60",
        showOnlyWhenEditable: false,
      }),
    ],
    content: textSettings.html || "",
    onUpdate: handleUpdate,
    editorProps,
    editable: isEditing,
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [editor, isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node) &&
        editor?.isFocused
      ) {
        editor.commands.blur();
        setColorPickerVisible(false);
        setHighlightPickerVisible(false);
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editor, onBlur]);

  if (!editor) {
    return null;
  }

  const bubbleMenuProps = {
    editor,
    shouldShow: ({ editor }: { editor: any }) => {
      return editor.isActive() && editor.isFocused;
    },
    tippyOptions: {
      duration: 100,
      trigger: "manual" as const,
      hideOnClick: true,
      interactive: true,
      onClickOutside: (instance: Instance) => {
        instance.hide();
        if (editor.isFocused) {
          editor.commands.blur();
          setColorPickerVisible(false);
          setHighlightPickerVisible(false);
          onBlur();
        }
      },
    },
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const headingLevel = e.target.value;
    if (headingLevel === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(headingLevel) as any })
        .run();
    }
  };

  const clearFormatting = () => {
    editor
      .chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .setTextAlign("left")
      .setFontSize("16px")
      .unsetColor()
      .run();
  };

  return (
    <div
      ref={editorRef}
      className="relative h-full w-full"
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (!isEditing) {
          setColorPickerVisible(false);
          setHighlightPickerVisible(false);
          onFocus();
          editor.chain().focus().run();
        }
      }}
    >
      <BubbleMenu
        {...bubbleMenuProps}
        className="flex items-center  bg-background rounded-lg border shadow-lg p-1 gap-1"
      >
        <select
          onChange={handleHeadingChange}
          className="w-max h-[34px] bg-background   border rounded"
          value={
            editor.isActive("heading")
              ? editor.getAttributes("heading").level
              : "paragraph"
          }
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Header</option>
        </select>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton onClick={clearFormatting}>
                <RemoveFormatting size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Clear formatting
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
              >
                <Bold size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Bold
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
              >
                <Italic size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Italic
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive("underline")}
              >
                <UnderlineIcon size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Underline
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive("strike")}
              >
                <Strikethrough size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Strikethrough
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <select
          onChange={(e) => {
            editor.chain().focus().setFontSize(e.target.value).run();
          }}
          className="w-max h-[34px] bg-background  border rounded"
          value={editor.getAttributes("textStyle").fontSize || "16px"}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                isActive={editor.isActive({ textAlign: "left" })}
              >
                <AlignLeft size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Align left
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                isActive={editor.isActive({ textAlign: "center" })}
              >
                <AlignCenter size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Align center
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                isActive={editor.isActive({ textAlign: "right" })}
              >
                <AlignRight size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Align right
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() => {
                  setHighlightPickerVisible((prev) => !prev);
                  setColorPickerVisible(false);
                }}
                isActive={
                  editor.isActive("highlight") || highlightPickerVisible
                }
              >
                <Highlighter size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Highlight color
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {highlightPickerVisible && (
          <div className="absolute bottom-full right-12 mt-2">
            <HexColorPicker
              color={editor.getAttributes("highlight").color || "#ffeb3b"}
              onChange={(color) => {
                editor.chain().focus().toggleHighlight({ color }).run();
              }}
            />
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton
                onClick={() => {
                  setColorPickerVisible((prev) => !prev);
                  setHighlightPickerVisible(false);
                }}
                isActive={colorPickerVisible}
              >
                <Palette size={16} />
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-background"
              sideOffset={8}
            >
              Text color
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {colorPickerVisible && (
          <div className="absolute bottom-full right-0 mt-2">
            <HexColorPicker
              color={editor.getAttributes("textStyle").color || "#000000"}
              onChange={(color) => {
                editor.chain().focus().setColor(color).run();
              }}
            />
          </div>
        )}
      </BubbleMenu>

      <div
        className="h-full w-full"
        onMouseDown={(e) => {
          if (!isEditing) {
            e.preventDefault();
          }
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

export default React.memo(TextComponent);
