import React, { useRef, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface ToothIllustrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  section: {
    index: number;
    position: string;
  };
  savedDrawing?: string;
  onDrawingChange: (toothNumber: string, dataUrl: string) => void;
  extracted: boolean;
}

const ToothIllustrationDialog: React.FC<ToothIllustrationDialogProps> = ({
  isOpen,
  onClose,
  section,
  savedDrawing,
  onDrawingChange,
  extracted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentColor, setCurrentColor] = useState("#0000FF"); // Default blue
  const [thickness, setThickness] = useState(8);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  // Initialize canvas when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeCanvas();
      }, 100);

      // Handle window resize to reinitialize canvas
      const handleResize = () => {
        if (canvasRef.current) {
          setTimeout(initializeCanvas, 100);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen, savedDrawing]);

  // Initialize canvas when needed instead of using useEffect
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

    const toothImg = new Image();
    toothImg.onload = () => {
      // Use the original image dimensions but scale them appropriately for the dialog
      const originalWidth = toothImg.naturalWidth;
      const originalHeight = toothImg.naturalHeight;
      const aspectRatio = originalWidth / originalHeight;

      // Get actual container dimensions for precise sizing
      const containerRect = container.getBoundingClientRect();
      const availableWidth = containerRect.width - 20; // Account for padding/margins
      const availableHeight = containerRect.height - 20; // Account for padding/margins

      // Set maximum constraints while maintaining aspect ratio
      const maxWidth = Math.min(800, availableWidth);
      const maxHeight = Math.min(1000, availableHeight);

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
      // Additional smoothing properties
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Clear canvas (use logical dimensions since we scaled the context)
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw tooth image as background with high quality scaling
      ctx.drawImage(toothImg, 0, 0, canvasWidth, canvasHeight);

      // If there's a saved drawing, load it on top
      if (savedDrawing) {
        const savedImg = new Image();
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
      const defaultWidth = 400;
      const defaultHeight = 800; // 1:2 aspect ratio like original tooth images

      // Use device pixel ratio for high-DPI displays
      const devicePixelRatio = window.devicePixelRatio || 1;
      const scaledWidth = defaultWidth * devicePixelRatio;
      const scaledHeight = defaultHeight * devicePixelRatio;

      // Set canvas internal dimensions (high resolution)
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      // Set canvas display dimensions (what user sees)
      canvas.style.width = `${defaultWidth}px`;
      canvas.style.height = `${defaultHeight}px`;

      // Scale the context to match device pixel ratio
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Set drawing properties with high quality
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

  const getModalTitle = () => {
    const toothNumber =
      section.position === "top"
        ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
        : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

    return `Tooth ${toothNumber} Illustration`;
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
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Calculate position relative to canvas display area
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // For high-DPI canvases, we need to use logical coordinates
    // The canvas context is scaled, so we use the display dimensions
    const logicalWidth = parseFloat(canvas.style.width) || canvas.width;
    const logicalHeight = parseFloat(canvas.style.height) || canvas.height;

    // Scale coordinates to match canvas logical dimensions
    const scaleX = logicalWidth / rect.width;
    const scaleY = logicalHeight / rect.height;

    const scaledX = x * scaleX;
    const scaledY = y * scaleY;

    // Clamp coordinates to logical canvas boundaries
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
    e.preventDefault(); // Prevent scrolling on touch

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ensure canvas is properly initialized before drawing
    if (canvas.width === 0 || canvas.height === 0) {
      if (!initializeCanvas()) {
        // Retry initialization after a short delay
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

    // Update canvas properties in case they changed
    updateCanvasProperties();

    const ctx = canvas.getContext("2d");
    if (ctx) {
      const { x, y } = getCanvasCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setLastPoint({ x, y });
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;
    e.preventDefault(); // Prevent scrolling on touch

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const { x, y } = getCanvasCoordinates(e);

      // Use quadratic curves for smoother lines
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

      // Save current state to history
      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory((prev) => [...prev.slice(0, currentStep + 1), currentState]);
      setCurrentStep((prev) => prev + 1);

      // Save drawing to parent component with high-quality dimensions
      const tempCanvas = document.createElement("canvas");
      // Use higher resolution for better quality (8x the preview size)
      const standardWidth = 600; // Higher resolution for better quality
      const standardHeight = 1200; // Higher resolution for better quality
      tempCanvas.width = standardWidth;
      tempCanvas.height = standardHeight;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        // Set high-quality rendering for the export canvas
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = "high";

        // Clear the temp canvas
        tempCtx.clearRect(0, 0, standardWidth, standardHeight);
        // Copy and scale the current canvas content with high quality
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

        // Export with high quality JPEG (90% quality) or PNG for best results
        const dataUrl = tempCanvas.toDataURL("image/png");
        onDrawingChange(toothNumber.toString(), dataUrl);
      }
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && currentStep > 0) {
      const previousStep = currentStep - 1;
      ctx.putImageData(drawingHistory[previousStep], 0, 0);
      setCurrentStep(previousStep);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      // Initialize canvas if needed
      if (canvas.width === 0) {
        if (!initializeCanvas()) {
          return;
        }
        return; // initializeCanvas will handle the clearing and redrawing
      }

      // Clear canvas and redraw tooth image maintaining aspect ratio
      const toothNumber =
        section.position === "top"
          ? [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28][section.index]
          : [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38][section.index];

      const toothImg = new Image();
      toothImg.onload = () => {
        // Maintain the original aspect ratio
        const originalWidth = toothImg.naturalWidth;
        const originalHeight = toothImg.naturalHeight;
        const aspectRatio = originalWidth / originalHeight;

        // Use current canvas dimensions but ensure aspect ratio is maintained
        const currentWidth = canvas.width;
        const currentHeight = canvas.height;
        const currentAspectRatio = currentWidth / currentHeight;

        // If aspect ratios don't match, adjust canvas size
        if (Math.abs(aspectRatio - currentAspectRatio) > 0.01) {
          let newWidth, newHeight;
          if (aspectRatio > currentAspectRatio) {
            newWidth = currentWidth;
            newHeight = currentWidth / aspectRatio;
          } else {
            newHeight = currentHeight;
            newWidth = currentHeight * aspectRatio;
          }

          canvas.width = newWidth;
          canvas.height = newHeight;
          canvas.style.width = `${newWidth}px`;
          canvas.style.height = `${newHeight}px`;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(toothImg, 0, 0, canvas.width, canvas.height);

        // Reset history with the tooth image as base
        const blankState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([blankState]);
        setCurrentStep(0);
      };
      toothImg.src = `/teeth-image/${toothNumber}.png`;

      // Clear the saved drawing in parent component
      onDrawingChange(toothNumber.toString(), "");
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas && canvas.width > 0) {
      // Create a high-quality canvas for saving
      const tempCanvas = document.createElement("canvas");
      const standardWidth = 600; // Higher resolution for better quality
      const standardHeight = 1200; // Higher resolution for better quality
      tempCanvas.width = standardWidth;
      tempCanvas.height = standardHeight;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        // Set high-quality rendering
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

        // Export as high-quality PNG
        const dataUrl = tempCanvas.toDataURL("image/png");
        onDrawingChange(toothNumber.toString(), dataUrl);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          saveDrawing();
          onClose();
        }
      }}
    >
      <DialogContent
        className="max-w-[50vw] max-h-[95vh] w-[50vw] h-[95vh] min-h-[500px] p-0 overflow-hidden flex flex-col"
        onInteractOutside={(e) => {
          saveDrawing();
        }}
      >
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
            <DialogTitle>{getModalTitle()}</DialogTitle>
          </DialogHeader>

          <div
            className="flex flex-col gap-4 flex-1 p-6 min-h-0 overflow-hidden"
            style={extracted ? { pointerEvents: "none", opacity: 0.6 } : { pointerEvents: "auto" }}
          >
            {/* Drawing Controls */}
            <div className="flex justify-between items-center flex-shrink-0 gap-4">
              {/* Color + Thickness controls */}
              <div className="flex gap-2 items-center">
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
                />

                {/* Thickness Controls */}
                <div className="ml-4 flex items-center gap-2">
                  <Label className="text-sm font-medium whitespace-nowrap">Thickness:</Label>
                  <Input
                    type="number"
                    value={thickness}
                    onChange={(e) => {
                      const value = Math.max(1, Math.min(30, parseInt(e.target.value) || 1));
                      setThickness(value);
                      updateCanvasProperties();
                    }}
                    min={1}
                    max={30}
                    className="w-16 h-8"
                  />
                  <div className="w-32">
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
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="hover:cursor-pointer"
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUndo();
                  }}
                  className="hover:cursor-pointer"
                >
                  Undo
                </Button>
              </div>
            </div>

            <Separator className="flex-shrink-0" />

            {/* Tooth Diagram */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                className="border-2 border-dashed border-gray-300 rounded-lg max-w-full max-h-full"
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToothIllustrationDialog;
