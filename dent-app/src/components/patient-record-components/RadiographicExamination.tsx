import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Trash2,
  Plus,
  UploadCloud,
  X,
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
  Camera,
  ChevronDown,
  ChevronUp,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import DOMPurify from "dompurify";

// Updated interface where each image is its own entry
interface RadiographEntry {
  id: string;
  radiographType: string;
  findings: string;
  imageData: string | null; // Store base64 string instead of File object
  image: File | null; // Keep for backward compatibility
  previewUrl: string;
}

interface RadiographicData {
  entries: RadiographEntry[];
}

interface Props {
  formData: RadiographicData;
  handleChange: (field: string, value: any) => void;
}

// Editor Button Component
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
    size="sm"
    variant={active ? "default" : "ghost"}
    onClick={onClick}
    className={`h-8 w-8 p-0 hover:cursor-pointer ${active ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-gray-100"}`}
  >
    {icon}
  </Button>
);

// Single radiograph entry component
const RadiographEntryComponent = ({
  entry,
  onEntryChange,
  onRemoveEntry,
  isRemovable,
  entryIndex,
}: {
  entry: RadiographEntry;
  onEntryChange: (id: string, field: string, value: any) => void;
  onRemoveEntry: (id: string) => void;
  isRemovable: boolean;
  entryIndex: number;
}) => {
  // Add local state to ensure immediate rendering of image
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>(entry.previewUrl || "");
  const [isOpen, setIsOpen] = useState<boolean>(entryIndex === 0); // First entry open by default
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local preview when entry.previewUrl changes from props
  useEffect(() => {
    setLocalPreviewUrl(entry.previewUrl || "");
  }, [entry.previewUrl]);

  const radiographTypes = [
    "Periapical Radiograph",
    "Panoramic Radiograph",
    "Bitewing Radiograph",
    "Occlusal Radiograph",
    "Cephalometric Radiograph",
    "Cone Beam CT (CBCT)",
    "Dental CT",
  ];

  // Initialize TipTap editor
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
    content: entry.findings,
    onUpdate: ({ editor }: { editor: Editor }) => {
      const sanitizedContent = DOMPurify.sanitize(editor.getHTML());
      onEntryChange(entry.id, "findings", sanitizedContent);
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
    if (editor && entry.findings !== editor.getHTML()) {
      editor.commands.setContent(entry.findings);
    }
  }, [entry.findings, editor]);

  // Handle image upload with base64 conversion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Take only the first file

    // Convert the image to base64 string
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;

      // Update local state immediately for UI refresh
      setLocalPreviewUrl(base64String);

      // Then update parent state - important to update all image-related fields at once
      // to ensure consistency
      onEntryChange(entry.id, "imageFields", {
        imageData: base64String,
        previewUrl: base64String,
        image: file, // Keep file object for backward compatibility
      });
    };

    reader.readAsDataURL(file);
  };

  // Handle removing the image
  const removeImage = () => {
    // Update local state first
    setLocalPreviewUrl("");

    // Then update parent state with a consistent set of field changes
    onEntryChange(entry.id, "imageFields", {
      imageData: null,
      previewUrl: "",
      image: null,
    });
  };

  // Handle file drop with base64 conversion
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;

        // Update local state immediately
        setLocalPreviewUrl(base64String);

        // Then update parent state all at once for consistency
        onEntryChange(entry.id, "imageFields", {
          imageData: base64String,
          previewUrl: base64String,
          image: file,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="space-y-4" data-radiograph-id={entry.id}>
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-green-700" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  Radiographic Examination {entryIndex + 1}
                </h3>
                {!isOpen && (
                  <div className="text-sm text-gray-600 mt-1">
                    {entry.radiographType ? (
                      <span className="inline-flex items-center gap-2">
                        <span>{entry.radiographType}</span>
                        {localPreviewUrl && (
                          <span className="text-green-600">• Image uploaded</span>
                        )}
                        {entry.findings && (
                          <span className="text-blue-600">• Findings recorded</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic">Not configured</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isRemovable && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveEntry(entry.id);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  aria-label="Remove this radiograph"
                >
                  <Trash2 size={16} />
                </Button>
              )}
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-4">
          {/* Type Select */}
          <div className="space-y-2 px-3">
            <label className="block text-sm font-medium text-gray-700">Type of Radiograph</label>
            <Select
              value={entry.radiographType}
              onValueChange={(value) => onEntryChange(entry.id, "radiographType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select radiograph type" />
              </SelectTrigger>
              <SelectContent>
                {radiographTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image and Findings side by side with same height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Radiograph Image</label>

              {/* Image container with fixed height */}
              <div
                className={`h-80 relative border-2 rounded-lg overflow-hidden transition-colors ${
                  !localPreviewUrl
                    ? "border-dashed border-gray-300 hover:border-green-500 bg-gray-50"
                    : "border-solid border-gray-300"
                }`}
                style={{ cursor: !localPreviewUrl ? "pointer" : "default" }}
                onDragOver={(e) => {
                  if (!localPreviewUrl) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                onDrop={(e) => {
                  if (!localPreviewUrl) {
                    handleFileDrop(e);
                  }
                }}
              >
                {!localPreviewUrl ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-green-700 hover:text-green-800 transition-colors hover:cursor-pointer focus:ring-2 focus:ring-offset-2 bg-transparent border-none p-0 m-0 outline-none"
                    aria-label="Upload radiograph image"
                    tabIndex={-1}
                  >
                    <UploadCloud size={48} className="mb-3" />
                    <span className="text-base font-medium mb-1">Drag a file here, or</span>
                    <span className="text-sm text-green-600 underline">
                      Choose a file to upload
                    </span>
                    <span className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</span>
                    <input
                      type="file"
                      id={`radiograph-image-${entry.id}`}
                      ref={fileInputRef}
                      accept="image/png, image/jpeg"
                      onChange={handleImageUpload}
                      className="hidden"
                      aria-label="Upload radiograph image"
                    />
                  </button>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={localPreviewUrl}
                      alt={`Radiograph ${entry.id}`}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full h-8 w-8 cursor-pointer"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Findings</label>

              <div className="space-y-2">
                {/* Toolbar */}
                {editor && (
                  <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-200 rounded-lg bg-gray-50">
                    {/* Formatting */}
                    <EditorButton
                      active={editor.isActive("bold")}
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      icon={<Bold size={14} />}
                    />
                    <EditorButton
                      active={editor.isActive("italic")}
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      icon={<Italic size={14} />}
                    />
                    <EditorButton
                      active={editor.isActive("underline")}
                      onClick={() => editor.chain().focus().toggleUnderline().run()}
                      icon={<UnderlineIcon size={14} />}
                    />
                    <EditorButton
                      active={editor.isActive("strike")}
                      onClick={() => editor.chain().focus().toggleStrike().run()}
                      icon={<Strikethrough size={14} />}
                    />

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Lists */}
                    <EditorButton
                      active={editor.isActive("bulletList")}
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      icon={<List size={14} />}
                    />
                    <EditorButton
                      active={editor.isActive("orderedList")}
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      icon={<ListOrdered size={14} />}
                    />

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Alignment */}
                    <EditorButton
                      active={editor.isActive({ textAlign: "left" })}
                      onClick={() => editor.chain().focus().setTextAlign("left").run()}
                      icon={<AlignLeft size={14} />}
                    />
                    <EditorButton
                      active={editor.isActive({ textAlign: "center" })}
                      onClick={() => editor.chain().focus().setTextAlign("center").run()}
                      icon={<AlignCenter size={14} />}
                    />
                    <EditorButton
                      active={editor.isActive({ textAlign: "right" })}
                      onClick={() => editor.chain().focus().setTextAlign("right").run()}
                      icon={<AlignRight size={14} />}
                    />

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Undo / Redo */}
                    <EditorButton
                      onClick={() => editor.chain().focus().undo().run()}
                      icon={<Undo size={14} />}
                    />
                    <EditorButton
                      onClick={() => editor.chain().focus().redo().run()}
                      icon={<Redo size={14} />}
                    />
                  </div>
                )}

                {/* Editor with fixed height matching image */}
                <div
                  className="h-56 border border-gray-300 rounded-lg p-3 prose prose-sm max-w-none hover:cursor-text overflow-y-auto bg-white"
                  onClick={() => editor?.chain().focus().run()}
                >
                  <EditorContent editor={editor} className="tiptap h-full outline-none" />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

const RadiographicExamination: React.FC<Props> = ({ formData, handleChange }) => {
  // Generate unique ID for new entries
  const generateUniqueId = () =>
    `radiograph-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Initialize with one entry if none exist
  const initializeEntries = useCallback(() => {
    if (
      (!formData || !formData.entries || formData.entries.length === 0) &&
      handleChange &&
      typeof handleChange === "function"
    ) {
      try {
        const initialEntry: RadiographEntry = {
          id: generateUniqueId(),
          radiographType: "",
          findings: "",
          image: null,
          imageData: null,
          previewUrl: "",
        };
        handleChange("entries", [initialEntry]);
      } catch (error) {
        console.error("Error initializing radiographic entries:", error);
      }
    }
  }, [formData, handleChange]);

  useEffect(() => {
    initializeEntries();
  }, [initializeEntries]);

  const addNewEntry = () => {
    if (typeof handleChange !== "function") return;

    const newEntry: RadiographEntry = {
      id: generateUniqueId(),
      radiographType: "",
      findings: "",
      image: null,
      imageData: null,
      previewUrl: "",
    };

    // Add the new entry to the existing entries
    handleChange("entries", [
      ...(formData && Array.isArray(formData.entries) ? formData.entries : []),
      newEntry,
    ]);
  };

  const removeEntry = (id: string) => {
    if (
      !formData ||
      !Array.isArray(formData.entries) ||
      formData.entries.length <= 1 ||
      typeof handleChange !== "function"
    ) {
      return; // Don't remove if it's the last entry or handleChange is not a function
    }

    // Remove the entry from form data
    handleChange(
      "entries",
      formData.entries.filter((entry) => entry.id !== id),
    );
  };

  // Updated to handle both single fields and grouped fields (for image data)
  const handleEntryChange = (id: string, field: string, value: any) => {
    if (!formData || !Array.isArray(formData.entries) || typeof handleChange !== "function") {
      return;
    }

    // Special case for image fields to ensure they're updated atomically
    if (field === "imageFields") {
      handleChange(
        "entries",
        formData.entries.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                image: value.image,
                imageData: value.imageData,
                previewUrl: value.previewUrl,
              }
            : entry,
        ),
      );
    } else {
      // Standard field update
      handleChange(
        "entries",
        formData.entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
      );
    }
  };

  if (!formData || !formData.entries || formData.entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Camera className="h-12 w-12 mx-auto mb-3 text-gray-400" />
        <p className="text-lg font-medium">No radiographic examinations yet</p>
        <p className="text-sm">Click "Add New Radiograph" to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {formData?.entries?.map((entry, index) => (
        <div key={entry.id}>
          <RadiographEntryComponent
            entry={entry}
            entryIndex={index}
            onEntryChange={handleEntryChange}
            onRemoveEntry={removeEntry}
            isRemovable={(formData?.entries?.length || 0) > 1}
          />
        </div>
      )) || []}

      <div className="flex justify-start pt-4 border-t border-gray-200">
        <Button
          type="button"
          onClick={addNewEntry}
          variant="outline"
          className="hover:bg-green-50 hover:border-green-500 text-green-700 hover:text-green-800 cursor-pointer"
          aria-label="Add another radiograph"
        >
          <Plus size={16} className="mr-2" />
          Add New Radiograph
        </Button>
      </div>
    </div>
  );
};

export default RadiographicExamination;
