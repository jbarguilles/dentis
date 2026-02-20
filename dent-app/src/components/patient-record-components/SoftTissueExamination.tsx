import React, { useState } from "react";
import SoftTissueModal from "./SoftTissueModal";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import { addSoftTissueExaminationApi } from "../../services/softTissueExaminationService";
import { SoftTissueExaminationData } from "../../types/patient-record";

interface Props {
  formData: Partial<SoftTissueExaminationData>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFieldChange?: (fieldName: string, content: string) => void; // New prop for direct field updates
  patientId?: number; // Add patientId prop for saving drawings
}

// EditorButton Component for consistent styling
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

// Tiptap Editor Component
const TiptapEditor: React.FC<{
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[200px] prose prose-sm max-w-none p-3",
      },
    },
    immediatelyRender: false,
  });

  // Sync editor content when the value prop changes
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-2">
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
        className="min-h-[200px] border rounded-md cursor-text"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="tiptap min-h-[200px] outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const SoftTissueExamination: React.FC<Props> = ({
  formData,
  handleChange,
  onFieldChange,
  patientId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    src: "",
    alt: "",
    title: "",
  });
  const [drawings, setDrawings] = useState<{ [key: string]: string }>({});

  const handleImageClick = (src: string, alt: string, title: string) => {
    setSelectedImage({ src, alt, title });
    setShowModal(true);
  };

  const handleDrawingChange = async (imageSrc: string, dataUrl: string) => {
    // Just store the drawing locally for now
    // The actual saving will happen when the user clicks "Save Soft Tissue Examination"
    setDrawings((prev) => ({
      ...prev,
      [imageSrc]: dataUrl,
    }));

    console.log("Drawing updated for:", imageSrc);
    console.log("Drawing will be saved when form is submitted");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Function to load and display saved composite images
  const loadCompositeImage = (imagePath: string): string => {
    // If there's a saved image path, construct the full URL
    if (imagePath) {
      return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imagePath}`;
    }
    return "";
  };

  // Function to create composite image (base image + drawing)
  const createCompositeImage = (imageSrc: string, drawingDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set canvas size to match the displayed image size
      canvas.width = 270;
      canvas.height = 200;

      // Load the base image
      const baseImage = new Image();
      baseImage.crossOrigin = "anonymous";
      baseImage.onload = () => {
        // Draw the base image
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

        // If there's a drawing, overlay it
        if (drawingDataUrl) {
          const drawingImage = new Image();
          drawingImage.onload = () => {
            // Draw the drawing overlay
            ctx.drawImage(drawingImage, 0, 0, canvas.width, canvas.height);

            // Convert to data URL
            const compositeDataUrl = canvas.toDataURL("image/png");
            resolve(compositeDataUrl);
          };
          drawingImage.onerror = () => {
            // If drawing fails to load, just return the base image
            const compositeDataUrl = canvas.toDataURL("image/png");
            resolve(compositeDataUrl);
          };
          drawingImage.src = drawingDataUrl;
        } else {
          // No drawing, just return the base image
          const compositeDataUrl = canvas.toDataURL("image/png");
          resolve(compositeDataUrl);
        }
      };
      baseImage.onerror = () => {
        reject(new Error("Failed to load base image"));
      };
      baseImage.src = imageSrc;
    });
  };

  // Function to convert base64 data URL to byte array
  const dataURLToByteArray = (dataURL: string): number[] => {
    if (!dataURL) return [];

    // Remove data URL prefix (data:image/png;base64,)
    const base64String = dataURL.split(",")[1];
    if (!base64String) return [];

    // Decode base64 to binary string
    const binaryString = atob(base64String);

    // Convert binary string to byte array
    const bytes = new Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  };

  // Function to save soft tissue examination data
  const handleSaveSoftTissueExamination = async () => {
    if (!patientId) {
      // alert('Patient ID is required to save data');
      // return;
      patientId = 1;
    }

    try {
      // Create composite images (base + drawing) for each examination area
      const mouthCompositeDataUrl = await createCompositeImage(
        "/soft-tissue-examination/mouth.png",
        drawings["/soft-tissue-examination/mouth.png"],
      );
      const neckCompositeDataUrl = await createCompositeImage(
        "/soft-tissue-examination/neck.png",
        drawings["/soft-tissue-examination/neck.png"],
      );
      const tongueCompositeDataUrl = await createCompositeImage(
        "/soft-tissue-examination/tongue.png",
        drawings["/soft-tissue-examination/tongue.png"],
      );
      const underTongueCompositeDataUrl = await createCompositeImage(
        "/soft-tissue-examination/under-tongue.png",
        drawings["/soft-tissue-examination/under-tongue.png"],
      );

      // Convert composite images to byte arrays
      const mouthImageData = dataURLToByteArray(mouthCompositeDataUrl);
      const neckImageData = dataURLToByteArray(neckCompositeDataUrl);
      const tongueImageData = dataURLToByteArray(tongueCompositeDataUrl);
      const underTongueImageData = dataURLToByteArray(underTongueCompositeDataUrl);

      // Map frontend data to backend DTO format
      const dataToSave = {
        patientNumber: patientId,
        DATE: new Date().toISOString().split("T")[0],
        HEAD_NECK_TMJ: formData.headNeckTmj || "",
        LIPS_FRENUM: formData.lipsFrenum || "",
        MUCOSA: formData.mucosa || "",
        PALATE: formData.palate || "",
        PHARYNX: formData.pharynx || "",
        FLOOR_OF_MOUTH: formData.floorMouth || "",
        TONGUE: formData.tongue || "",
        LYMPH_NODES: formData.lymphNodes || "",
        SALIVARY_GLAND: formData.salivaryGland || "",
        THYROID: formData.thyroid || "",
        GINGIVA: formData.gingiva || "",
        // Include composite image byte arrays
        mouth_image_data: mouthImageData.length > 0 ? mouthImageData : undefined,
        neck_image_data: neckImageData.length > 0 ? neckImageData : undefined,
        tongue_image_data: tongueImageData.length > 0 ? tongueImageData : undefined,
        under_tongue_image_data: underTongueImageData.length > 0 ? underTongueImageData : undefined,
        // Include image paths for reference
        mouth_image_path: formData.mouthImagePath || "",
        neck_image_path: formData.neckImagePath || "",
        tongue_image_path: formData.tongueImagePath || "",
        under_tongue_image_path: formData.underTongueImagePath || "",
      };

      console.log("Saving soft tissue examination data:", {
        ...dataToSave,
        // Don't log full byte arrays as they're huge
        mouth_image_data:
          mouthImageData.length > 0 ? `[${mouthImageData.length} bytes]` : undefined,
        neck_image_data: neckImageData.length > 0 ? `[${neckImageData.length} bytes]` : undefined,
        tongue_image_data:
          tongueImageData.length > 0 ? `[${tongueImageData.length} bytes]` : undefined,
        under_tongue_image_data:
          underTongueImageData.length > 0 ? `[${underTongueImageData.length} bytes]` : undefined,
      });

      const response = await addSoftTissueExaminationApi(dataToSave);
      console.log("Save response:", response);

      alert("Soft tissue examination data saved successfully!");
    } catch (error) {
      console.error("Failed to save soft tissue examination:", error);
      alert("Failed to save soft tissue examination data. Please check the console for details.");
    }
  };

  // Helper for Tiptap value change
  const handleEditorChange = (name: string, content: string) => {
    // Try the new direct field change method first (like ChiefComplaintSection)
    if (onFieldChange && typeof onFieldChange === "function") {
      onFieldChange(name, content);
    }
    // Fallback to the old synthetic event method
    else if (handleChange && typeof handleChange === "function") {
      handleChange({
        target: {
          name,
          value: content,
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    }
  };

  const softTissueImages = [
    { src: "/soft-tissue-examination/mouth.png", alt: "Mouth examination", title: "Mouth" },
    { src: "/soft-tissue-examination/neck.png", alt: "Neck examination", title: "Neck" },
    { src: "/soft-tissue-examination/tongue.png", alt: "Tongue examination", title: "Tongue" },
    {
      src: "/soft-tissue-examination/under-tongue.png",
      alt: "Under tongue examination",
      title: "Under Tongue",
    },
  ];

  return (
    <div>
      {/* Soft Tissue Images */}
      <div className="mb-6">
        <div className="flex justify-between w-full">
          {softTissueImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleImageClick(image.src, image.alt, image.title)}
              title={image.title}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={270}
                  height={200}
                  className="rounded-md border border-gray-300"
                />
                {/* Show saved composite image if available */}
                {formData.mouthImagePath && image.src === "/soft-tissue-examination/mouth.png" && (
                  <img
                    src={loadCompositeImage(formData.mouthImagePath)}
                    alt="Saved mouth examination"
                    className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
                  />
                )}
                {formData.neckImagePath && image.src === "/soft-tissue-examination/neck.png" && (
                  <img
                    src={loadCompositeImage(formData.neckImagePath)}
                    alt="Saved neck examination"
                    className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
                  />
                )}
                {formData.tongueImagePath &&
                  image.src === "/soft-tissue-examination/tongue.png" && (
                    <img
                      src={loadCompositeImage(formData.tongueImagePath)}
                      alt="Saved tongue examination"
                      className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
                    />
                  )}
                {formData.underTongueImagePath &&
                  image.src === "/soft-tissue-examination/under-tongue.png" && (
                    <img
                      src={loadCompositeImage(formData.underTongueImagePath)}
                      alt="Saved under tongue examination"
                      className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
                    />
                  )}
                {/* Show current drawing overlay if available and no saved composite */}
                {drawings[image.src] &&
                  !formData.mouthImagePath &&
                  !formData.neckImagePath &&
                  !formData.tongueImagePath &&
                  !formData.underTongueImagePath && (
                    <img
                      src={drawings[image.src]}
                      alt="Drawing overlay"
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label className="text-base font-medium">Head, Neck, TMJ</Label>
          <TiptapEditor
            value={formData.headNeckTmj || ""}
            onChange={(content) => handleEditorChange("headNeckTmj", content)}
            placeholder="Enter head, neck, TMJ examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Lips/Frenum</Label>
          <TiptapEditor
            value={formData.lipsFrenum || ""}
            onChange={(content) => handleEditorChange("lipsFrenum", content)}
            placeholder="Enter lips and frenum examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Mucosa</Label>
          <TiptapEditor
            value={formData.mucosa || ""}
            onChange={(content) => handleEditorChange("mucosa", content)}
            placeholder="Enter mucosa examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Palate</Label>
          <TiptapEditor
            value={formData.palate || ""}
            onChange={(content) => handleEditorChange("palate", content)}
            placeholder="Enter palate examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Pharynx</Label>
          <TiptapEditor
            value={formData.pharynx || ""}
            onChange={(content) => handleEditorChange("pharynx", content)}
            placeholder="Enter pharynx examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Floor of the Mouth</Label>
          <TiptapEditor
            value={formData.floorMouth || ""}
            onChange={(content) => handleEditorChange("floorMouth", content)}
            placeholder="Enter floor of the mouth examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Tongue</Label>
          <TiptapEditor
            value={formData.tongue || ""}
            onChange={(content) => handleEditorChange("tongue", content)}
            placeholder="Enter tongue examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Lymph Nodes</Label>
          <TiptapEditor
            value={formData.lymphNodes || ""}
            onChange={(content) => handleEditorChange("lymphNodes", content)}
            placeholder="Enter lymph nodes examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Salivary Gland</Label>
          <TiptapEditor
            value={formData.salivaryGland || ""}
            onChange={(content) => handleEditorChange("salivaryGland", content)}
            placeholder="Enter salivary gland examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Thyroid</Label>
          <TiptapEditor
            value={formData.thyroid || ""}
            onChange={(content) => handleEditorChange("thyroid", content)}
            placeholder="Enter thyroid examination findings..."
          />
        </div>

        <Separator className="my-6" />

        <div>
          <Label className="text-base font-medium">Gingiva</Label>
          <TiptapEditor
            value={formData.gingiva || ""}
            onChange={(content) => handleEditorChange("gingiva", content)}
            placeholder="Enter gingiva examination findings..."
          />
        </div>
      </div>

      {/* Modal for drawing on images */}
      <SoftTissueModal
        isOpen={showModal}
        onClose={handleModalClose}
        imageSrc={selectedImage.src}
        imageAlt={selectedImage.alt}
        imageTitle={selectedImage.title}
        savedDrawing={drawings[selectedImage.src]}
        onDrawingChange={handleDrawingChange}
      />
    </div>
  );
};

export default SoftTissueExamination;
