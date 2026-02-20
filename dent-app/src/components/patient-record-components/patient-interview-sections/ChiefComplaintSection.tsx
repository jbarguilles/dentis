"use client";

import type React from "react";
import { useEffect } from "react";
import { ChiefComplaintData } from "@/types/patient-interview";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Redo,
  Undo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Minus,
} from "lucide-react";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import CodeBlock from "@tiptap/extension-code-block";
import CodeMark from "@tiptap/extension-code";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";

interface ChiefComplaintProps {
  value: ChiefComplaintData["chiefComplaintAndHistory"];
  onChange: (content: string) => void;
}

const ChiefComplaintSection: React.FC<ChiefComplaintProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Strike,
      CodeMark,
      CodeBlock,
      HorizontalRule,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
    ],
    content: value,
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    immediatelyRender: false,
  });

  // Sync editor content when the value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
          Chief Complaint and History of Present Illness
        </h3>
        <p className="text-muted-foreground">
          Patient's primary concern and detailed history of current symptoms
        </p>
      </div>

      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b pb-2">
          {/* Formatting */}
          <EditorButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={<Bold />}
          />
          <EditorButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={<Italic />}
          />
          <EditorButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<UnderlineIcon />}
          />
          <EditorButton
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon={<Strikethrough />}
          />

          {/* Lists & Quote */}
          <EditorButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={<List />}
          />
          <EditorButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<ListOrdered />}
          />

          {/* HR */}
          <EditorButton
            active={false}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            icon={<Minus />}
          />

          {/* Alignment */}
          <EditorButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            icon={<AlignLeft />}
          />
          <EditorButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            icon={<AlignCenter />}
          />
          <EditorButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            icon={<AlignRight />}
          />

          {/* Link */}
          <EditorButton
            active={editor.isActive("link")}
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            icon={<LinkIcon />}
          />

          {/* Undo / Redo */}
          <EditorButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo />} />
          <EditorButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo />} />
        </div>

        {/* Editor */}
        <div
          className="min-h-[200px] border rounded-md p-4 prose prose-sm max-w-none cursor-text"
          onClick={() => editor?.chain().focus().run()}
        >
          <EditorContent
            editor={editor}
            placeholder="Enter chief complaint and history of present illness..."
            className="tiptap min-h-[168px] outline-none"
          />
        </div>
      </div>
    </div>
  );
};

const EditorButton = ({
  onClick,
  icon,
  active = false,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) => (
  <Button
    type="button"
    size="icon"
    variant="outline"
    onClick={onClick}
    className={`
      hover:cursor-pointer transition-all duration-200 ease-in-out
      ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-md hover:bg-primary/90 hover:shadow-lg"
          : "hover:bg-muted hover:border-muted-foreground/20 hover:shadow-sm"
      }
    `}
  >
    {icon}
  </Button>
);

export default ChiefComplaintSection;
