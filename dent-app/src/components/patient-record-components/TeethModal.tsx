import React, { useRef, useEffect, useState } from "react";
import { ArrowUp, Image } from "lucide-react";
import { ToothValues, ConditionOption } from "@/types/dental-chart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ToothIllustrationDialog from "./ToothIllustrationDialog";

interface TeethModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: {
    index: number;
    position: string;
  };
  treatmentValues: ToothValues;
  lesionValues: ToothValues;
  icdasValues: ToothValues;
  onTreatmentChange: (values: ToothValues) => void;
  onLesionChange: (values: ToothValues) => void;
  onICDASChange: (values: ToothValues) => void;
  savedDrawing?: string;
  onDrawingChange: (toothNumber: string, dataUrl: string) => void;
  existingCondition: string[];
  onConditionSelect: (code: string) => void;
  conditionOptions: ConditionOption[];
  extracted: boolean;
  setExtracted: (val: boolean) => void;
}

// BigSquare component
const BigSquare: React.FC<{
  options: string[];
  values: ToothValues;
  setValues: (values: ToothValues) => void;
}> = ({ options, values, setValues }) => {
  const handleClick = (
    event: React.MouseEvent,
    direction: "top" | "right" | "bottom" | "left" | "center",
  ) => {
    event.preventDefault();
    const newValues = {
      ...values,
      [direction]: (values[direction] + 1) % options.length,
    };
    setValues(newValues);
  };

  return (
    <svg
      viewBox="0 0 240 135"
      id="popup-box"
      className="w-full max-w-[196px] mx-auto block"
      style={{ userSelect: "none", cursor: "pointer" }}
    >
      <g id="buttons">
        <polygon
          id="top"
          points="0,0 240,0 180,39 60,39"
          fill="white"
          stroke="black"
          strokeWidth="1"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, "top")}
        />
        <text x="120" y="28" textAnchor="middle" fill="black" fontSize="24" pointerEvents="none">
          {options[values.top]}
        </text>

        <polygon
          id="right"
          points="240,0 180,39 180,96 240,135"
          fill="white"
          stroke="black"
          strokeWidth="1"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, "right")}
        />
        <text x="211" y="77" textAnchor="middle" fill="black" fontSize="24" pointerEvents="none">
          {options[values.right]}
        </text>

        <polygon
          id="bottom"
          points="240,135 180,96 60,96 0,135"
          fill="white"
          stroke="black"
          strokeWidth="1"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, "bottom")}
        />
        <text x="120" y="124" textAnchor="middle" fill="black" fontSize="24" pointerEvents="none">
          {options[values.bottom]}
        </text>

        <polygon
          id="left"
          points="0,135 60,96 60,39 0,0"
          fill="white"
          stroke="black"
          strokeWidth="1"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, "left")}
        />
        <text x="28" y="77" textAnchor="middle" fill="black" fontSize="24" pointerEvents="none">
          {options[values.left]}
        </text>

        <rect
          id="center"
          x="60"
          y="39"
          height="57"
          width="120"
          fill="white"
          stroke="black"
          strokeWidth="1"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, "center")}
        />
        <text x="120" y="77" textAnchor="middle" fill="black" fontSize="24" pointerEvents="none">
          {options[values.center]}
        </text>
      </g>
    </svg>
  );
};

const TeethModal: React.FC<TeethModalProps> = ({
  isOpen,
  onClose,
  section,
  treatmentValues,
  lesionValues,
  icdasValues,
  onTreatmentChange,
  onLesionChange,
  onICDASChange,
  savedDrawing,
  onDrawingChange,
  existingCondition,
  onConditionSelect,
  conditionOptions,
  extracted,
  setExtracted,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isIllustrationDialogOpen, setIsIllustrationDialogOpen] = useState(false);

  // Canvas drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentColor, setCurrentColor] = useState("#0000FF"); // Default blue
  const [thickness, setThickness] = useState(5);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  // Add logging to see what savedDrawing is being passed
  useEffect(() => {
    if (isOpen) {
      // Reset any necessary state when modal opens
      // Initialize canvas when modal opens
      const timer = setTimeout(() => {
        initializeCanvas();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, section]);

  // Initialize canvas function
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return false;
    }

    // Get the actual container dimensions
    const container = canvas.parentElement;
    if (!container) {
      return false;
    }

    // Load tooth image first to get its natural dimensions
    const toothNumber =
      section.position === "top"
        ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
        : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

    const toothImg = document.createElement("img");
    toothImg.onload = () => {
      // Use the original image dimensions but scale them appropriately for the dialog
      const originalWidth = toothImg.naturalWidth;
      const originalHeight = toothImg.naturalHeight;
      const aspectRatio = originalWidth / originalHeight;

      // Get actual container dimensions for precise sizing
      const containerRect = container.getBoundingClientRect();
      const availableWidth = Math.max(0, containerRect.width - 16); // small padding allowance
      const availableHeight = Math.max(0, containerRect.height - 16); // keep it roomy

      const maxWidth = availableWidth;
      const maxHeight = availableHeight;

      let canvasWidth, canvasHeight;

      // Calculate dimensions maintaining aspect ratio, prioritizing height usage
      if (aspectRatio > maxWidth / maxHeight) {
        // Image is wider relative to available space - constrain by width
        canvasWidth = maxWidth;
        canvasHeight = maxWidth / aspectRatio;
      } else {
        // Image is taller relative to available space - constrain by height
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * aspectRatio;
      }

      // Ensure canvas doesn't exceed available space
      if (canvasHeight > availableHeight) {
        canvasHeight = availableHeight;
        canvasWidth = availableHeight * aspectRatio;
      }
      if (canvasWidth > availableWidth) {
        canvasWidth = availableWidth;
        canvasHeight = availableWidth / aspectRatio;
      }

      // Use device pixel ratio for high-DPI displays
      const devicePixelRatio = window.devicePixelRatio || 1;
      const scaledWidth = canvasWidth * devicePixelRatio;
      const scaledHeight = canvasHeight * devicePixelRatio;

      // Set canvas internal dimensions (high resolution)
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      // Set canvas display dimensions (what user sees)
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      // Scale the context to match device pixel ratio
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Set drawing properties for smooth, round lines with high quality
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Clear canvas (use logical dimensions since we scaled the context)
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw tooth image as background with high quality scaling
      ctx.drawImage(toothImg, 0, 0, canvasWidth, canvasHeight);

      // If there's a saved drawing, load it on top
      if (savedDrawing) {
        const savedImg = document.createElement("img");
        savedImg.onload = () => {
          ctx.drawImage(savedImg, 0, 0, canvasWidth, canvasHeight);
          const loadedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
          setDrawingHistory([loadedState]);
          setCurrentStep(0);
        };
        savedImg.onerror = () => {
          const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
          setDrawingHistory([initialState]);
          setCurrentStep(0);
        };
        savedImg.src = savedDrawing;
      } else {
        const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([initialState]);
        setCurrentStep(0);
      }
    };
    toothImg.onerror = () => {
      // If tooth image fails to load, use default dimensions
      const defaultWidth = 300;
      const defaultHeight = 600; // 1:2 aspect ratio like original tooth images

      const devicePixelRatio = window.devicePixelRatio || 1;
      const scaledWidth = defaultWidth * devicePixelRatio;
      const scaledHeight = defaultHeight * devicePixelRatio;

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      canvas.style.width = `${defaultWidth}px`;
      canvas.style.height = `${defaultHeight}px`;

      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      ctx.clearRect(0, 0, defaultWidth, defaultHeight);
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory([initialState]);
      setCurrentStep(0);
    };
    toothImg.src = `/teeth-image/${toothNumber}.png`;

    return true;
  };

  // Update drawing properties when they change
  const updateCanvasProperties = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }
  };

  const getCanvasCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    let clientX: number;
    let clientY: number;

    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const logicalWidth = parseFloat(canvas.style.width) || canvas.width;
    const logicalHeight = parseFloat(canvas.style.height) || canvas.height;

    const scaleX = logicalWidth / rect.width;
    const scaleY = logicalHeight / rect.height;

    const scaledX = x * scaleX;
    const scaledY = y * scaleY;

    const clampedX = Math.max(0, Math.min(scaledX, logicalWidth));
    const clampedY = Math.max(0, Math.min(scaledY, logicalHeight));

    return {
      x: clampedX,
      y: clampedY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (canvas.width === 0 || canvas.height === 0) {
      if (!initializeCanvas()) {
        setTimeout(() => {
          if (initializeCanvas()) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const { x, y } = getCanvasCoordinates(e);
              ctx.beginPath();
              ctx.moveTo(x, y);
              setIsDrawing(true);
            }
          }
        }, 50);
        return;
      }
    }

    updateCanvasProperties();

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Capture the current state before starting to draw (only if we haven't captured the initial state yet)
      if (drawingHistory.length === 0 || currentStep === -1) {
        const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([initialState]);
        setCurrentStep(0);
      }

      const { x, y } = getCanvasCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setLastPoint({ x, y });
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const { x, y } = getCanvasCoordinates(e);

      const midX = (lastPoint.x + x) / 2;
      const midY = (lastPoint.y + y) / 2;

      ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midX, midY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(midX, midY);

      setLastPoint({ x, y });
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && isDrawing) {
      ctx.closePath();
      setIsDrawing(false);
      setLastPoint(null);

      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory((prev) => [...prev.slice(0, currentStep + 1), currentState]);
      setCurrentStep((prev) => prev + 1);

      const tempCanvas = document.createElement("canvas");
      const standardWidth = 600;
      const standardHeight = 1200;
      tempCanvas.width = standardWidth;
      tempCanvas.height = standardHeight;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = "high";
        tempCtx.clearRect(0, 0, standardWidth, standardHeight);
        tempCtx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          standardWidth,
          standardHeight,
        );

        const toothNumber =
          section.position === "top"
            ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
            : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

        const dataUrl = tempCanvas.toDataURL("image/png");
        onDrawingChange(toothNumber.toString(), dataUrl);
      }
    }
  };

  const handleCanvasUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    // Check if canvas is properly initialized
    if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) {
      return;
    }

    // Check if we have history to undo to
    if (currentStep <= 0 || drawingHistory.length <= currentStep) {
      return;
    }

    const previousStep = currentStep - 1;

    // Ensure the previous step exists in history
    if (previousStep < 0 || !drawingHistory[previousStep]) {
      return;
    }

    try {
      ctx.putImageData(drawingHistory[previousStep], 0, 0);
      setCurrentStep(previousStep);

      // Update the saved drawing state after undo
      const tempCanvas = document.createElement("canvas");
      const standardWidth = 600;
      const standardHeight = 1200;
      tempCanvas.width = standardWidth;
      tempCanvas.height = standardHeight;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = "high";
        tempCtx.clearRect(0, 0, standardWidth, standardHeight);
        tempCtx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          standardWidth,
          standardHeight,
        );

        const toothNumber =
          section.position === "top"
            ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
            : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

        const dataUrl = tempCanvas.toDataURL("image/png");
        onDrawingChange(toothNumber.toString(), dataUrl);
      }
    } catch (error) {
      console.error("Error during undo operation:", error);
    }
  };

  const handleCanvasClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      if (canvas.width === 0) {
        if (!initializeCanvas()) {
          return;
        }
        return;
      }

      const toothNumber =
        section.position === "top"
          ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
          : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

      const toothImg = document.createElement("img");
      toothImg.onload = () => {
        const originalWidth = toothImg.naturalWidth;
        const originalHeight = toothImg.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;

        // Get the container dimensions to maintain proper sizing
        const container = canvas.parentElement;
        if (!container) {
          return;
        }

        const containerRect = container.getBoundingClientRect();
        const availableWidth = Math.max(0, containerRect.width - 16);
        const availableHeight = Math.max(0, containerRect.height - 16);

        const maxWidth = availableWidth;
        const maxHeight = availableHeight;

        let canvasWidth, canvasHeight;

        // Calculate dimensions maintaining aspect ratio, prioritizing height usage
        if (aspectRatio > maxWidth / maxHeight) {
          // Image is wider relative to available space - constrain by width
          canvasWidth = maxWidth;
          canvasHeight = maxWidth / aspectRatio;
        } else {
          // Image is taller relative to available space - constrain by height
          canvasHeight = maxHeight;
          canvasWidth = maxHeight * aspectRatio;
        }

        // Ensure canvas doesn't exceed available space
        if (canvasHeight > availableHeight) {
          canvasHeight = availableHeight;
          canvasWidth = availableHeight * aspectRatio;
        }
        if (canvasWidth > availableWidth) {
          canvasWidth = availableWidth;
          canvasHeight = availableWidth / aspectRatio;
        }

        // Use device pixel ratio for high-DPI displays
        const devicePixelRatio = window.devicePixelRatio || 1;
        const scaledWidth = canvasWidth * devicePixelRatio;
        const scaledHeight = canvasHeight * devicePixelRatio;

        // Set canvas internal dimensions (high resolution)
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        // Set canvas display dimensions (what user sees)
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        // Scale the context to match device pixel ratio
        ctx.scale(devicePixelRatio, devicePixelRatio);

        // Set drawing properties
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.globalCompositeOperation = "source-over";
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // Clear canvas and draw tooth image (use logical dimensions since we scaled the context)
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(toothImg, 0, 0, canvasWidth, canvasHeight);

        const blankState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([blankState]);
        setCurrentStep(0);
      };
      toothImg.src = `/teeth-image/${toothNumber}.png`;

      onDrawingChange(toothNumber.toString(), "");
    }
  };

  const treatmentPlans = [" ", "N", "T"];
  const lesionStatus = [" ", "+", "-"];
  const icdasCode = [" ", "0", "A", "B", "C"];

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const scrollTop = modalRef.current.scrollTop;
        setShowScrollButton(scrollTop > 200); // Show button after scrolling 200px
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("scroll", handleScroll);
      return () => modalElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (!isOpen) return null;

  const getModalTitle = () => {
    const toothNumber =
      section.position === "top"
        ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
        : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

    return `Tooth ${toothNumber} Details`;
  };

  const handleTreatmentSquareChange = (newValues: any) => {
    onTreatmentChange(newValues);
  };

  const handleLesionSquareChange = (newValues: any) => {
    onLesionChange(newValues);
  };

  const handleICDASSquareChange = (newValues: any) => {
    onICDASChange(newValues);
  };

  const scrollToTop = () => {
    modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-[85vw] w-[85vw] max-h-[95vh] overflow-hidden p-0">
        <div ref={modalRef} className="flex flex-col h-full max-h-[95vh] overflow-y-auto min-h-0">
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <DialogTitle>{getModalTitle()}</DialogTitle>
                <Button
                  variant={extracted ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setExtracted(!extracted)}
                  type="button"
                  className="hover:cursor-pointer"
                >
                  {extracted ? "Mark as Not Extracted" : "Mark as Extracted"}
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 p-6 overflow-y-auto min-h-0">
            <div className="flex flex-col gap-6 h-full min-h-0">
              <div className="flex flex-row gap-4 w-full h-full min-h-0">
                {/* Column 1: Treatment, Lesion, ICDAS */}
                <div
                  className="flex-1 min-w-0 h-full"
                  style={
                    extracted ? { pointerEvents: "none", opacity: 0.6 } : { pointerEvents: "auto" }
                  }
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-green-700 text-base">
                        Treatment Plan, Lesion Status & ICDAS Code
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col min-h-0 gap-4">
                      {/* Treatment Plan Section */}
                      <div className="flex flex-col min-h-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-green-600">Treatment Plan</h4>
                          <Badge variant="secondary" className="text-xs">
                            Values: N, T
                          </Badge>
                        </div>
                        <div className="flex items-center justify-center py-2">
                          <div className="max-w-[196px] w-full">
                            <BigSquare
                              options={treatmentPlans}
                              values={treatmentValues}
                              setValues={handleTreatmentSquareChange}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Lesion Status Section */}
                      <div className="flex flex-col min-h-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-green-600">Lesion Status</h4>
                          <Badge variant="secondary" className="text-xs">
                            Values: +, -
                          </Badge>
                        </div>
                        <div className="flex items-center justify-center py-2">
                          <div className="max-w-[196px] w-full">
                            <BigSquare
                              options={lesionStatus}
                              values={lesionValues}
                              setValues={handleLesionSquareChange}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* ICDAS Code Section */}
                      <div className="flex flex-col min-h-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-green-600">ICDAS Code</h4>
                          <Badge variant="secondary" className="text-xs">
                            Values: 0, A, B, C
                          </Badge>
                        </div>
                        <div className="flex items-center justify-center py-2">
                          <div className="max-w-[196px] w-full">
                            <BigSquare
                              options={icdasCode}
                              values={icdasValues}
                              setValues={handleICDASSquareChange}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Column 2: Existing Condition */}
                <div
                  className="flex-1 min-w-0 h-full"
                  style={
                    extracted ? { pointerEvents: "none", opacity: 0.6 } : { pointerEvents: "auto" }
                  }
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-green-700 text-base">Existing Condition</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col min-h-0">
                      <div className="w-full flex flex-col items-center gap-4 flex-1">
                        <div className="relative w-[240px] h-[135px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                          <div className="absolute w-full h-full flex items-center justify-center gap-6">
                            {existingCondition &&
                              existingCondition.map((code, i) => (
                                <Badge
                                  key={code}
                                  variant="default"
                                  className="text-2xl font-bold px-4 py-2"
                                >
                                  {code}
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 w-full overflow-y-auto flex-1 max-h-80 min-h-0">
                          {conditionOptions.map((opt) => (
                            <Button
                              key={opt.code}
                              variant={existingCondition.includes(opt.code) ? "default" : "outline"}
                              size="sm"
                              className="text-xs h-auto py-2 px-2"
                              onClick={() => onConditionSelect(opt.code)}
                              disabled={
                                existingCondition.length === 2 &&
                                !existingCondition.includes(opt.code)
                              }
                            >
                              <div className="flex flex-col items-center">
                                <span className="font-mono font-bold">{opt.code}</span>
                                <span className="text-[10px] leading-tight">{opt.label}</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Select up to 2 conditions
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Column 3: Tooth Illustration */}
                <div
                  className="flex-1 min-w-0 h-full"
                  style={
                    extracted ? { pointerEvents: "none", opacity: 0.6 } : { pointerEvents: "auto" }
                  }
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-green-700 text-base">Tooth Illustration</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
                      {/* Drawing Controls */}
                      <div className="flex flex-col">
                        {/* Drawing tool controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 items-center">
                            {/* Color Popover */}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2 hover:cursor-pointer text-xs h-8 px-3"
                                >
                                  <div
                                    className="w-4 h-4 rounded border border-gray-300"
                                    style={{ backgroundColor: currentColor }}
                                  />
                                  Color
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-3"
                                align="center"
                                onInteractOutside={(e) => e.preventDefault()}
                              >
                                <div className="flex flex-col gap-2">
                                  <Label className="text-sm font-medium">Select Color</Label>
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant={currentColor === "#0000FF" ? "default" : "outline"}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentColor("#0000FF");
                                        updateCanvasProperties();
                                      }}
                                      className="w-8 h-8 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                      title="Blue"
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant={currentColor === "#FF0000" ? "default" : "outline"}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentColor("#FF0000");
                                        updateCanvasProperties();
                                      }}
                                      className="w-8 h-8 bg-red-600 hover:bg-red-700 cursor-pointer"
                                      title="Red"
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant={currentColor === "#00FF00" ? "default" : "outline"}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentColor("#00FF00");
                                        updateCanvasProperties();
                                      }}
                                      className="w-8 h-8 bg-green-600 hover:bg-green-700 cursor-pointer"
                                      title="Green"
                                    />
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>

                            {/* Thickness Popover */}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2 hover:cursor-pointer text-xs h-8 px-3"
                                >
                                  <div
                                    className="w-4 h-1 bg-current rounded"
                                    style={{ height: `${Math.max(2, thickness / 4)}px` }}
                                  />
                                  {thickness}px
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-64 p-3"
                                align="center"
                                onInteractOutside={(e) => e.preventDefault()}
                              >
                                <div className="flex flex-col gap-3">
                                  <Label className="text-sm font-medium">Brush Thickness</Label>
                                  <div className="flex items-center gap-3">
                                    <Input
                                      type="number"
                                      value={thickness}
                                      onChange={(e) => {
                                        const value = Math.max(
                                          1,
                                          Math.min(30, parseInt(e.target.value) || 1),
                                        );
                                        setThickness(value);
                                        updateCanvasProperties();
                                      }}
                                      min={1}
                                      max={30}
                                      className="w-16 h-8 text-sm"
                                    />
                                    <div className="flex-1">
                                      <Slider
                                        value={[thickness]}
                                        onValueChange={(value) => {
                                          setThickness(value[0]);
                                          updateCanvasProperties();
                                        }}
                                        max={30}
                                        min={1}
                                        step={1}
                                        className="w-full"
                                      />
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500 text-center">
                                    Range: 1-30 pixels
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2 items-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCanvasClear();
                              }}
                              className="hover:cursor-pointer text-xs h-8 px-3"
                            >
                              Clear
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCanvasUndo();
                              }}
                              disabled={currentStep <= 0}
                              className="hover:cursor-pointer text-xs h-8 px-3 disabled:cursor-not-allowed"
                            >
                              Undo
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Canvas */}
                      <div className="flex-1 flex items-center justify-center">
                        <canvas
                          ref={canvasRef}
                          className="border-2 border-dashed border-gray-300 rounded-lg w-full h-full"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          onTouchCancel={stopDrawing}
                          style={{ touchAction: "none", cursor: "crosshair" }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll to top button */}
          {showScrollButton && (
            <Button
              onClick={scrollToTop}
              size="icon"
              className="fixed bottom-6 right-6 rounded-full shadow-lg z-10"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>

      {/* Tooth Illustration Dialog */}
      <ToothIllustrationDialog
        isOpen={isIllustrationDialogOpen}
        onClose={() => setIsIllustrationDialogOpen(false)}
        section={section}
        savedDrawing={savedDrawing}
        onDrawingChange={onDrawingChange}
        extracted={extracted}
      />
    </Dialog>
  );
};

export default TeethModal;
