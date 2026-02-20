import React, { useRef, useEffect, useState } from "react";

interface SoftTissueModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  savedDrawing?: string;
  onDrawingChange: (imageSrc: string, dataUrl: string) => void;
}

const SoftTissueModal: React.FC<SoftTissueModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageTitle,
  savedDrawing,
  onDrawingChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentColor, setCurrentColor] = useState("#0000FF");
  const [thickness, setThickness] = useState(10);

  const getScaledCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      const { x, y } = getScaledCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      const { x, y } = getScaledCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && isDrawing) {
      ctx.closePath();
      setIsDrawing(false);
      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory((prev) => [...prev.slice(0, currentStep + 1), currentState]);
      setCurrentStep((prev) => prev + 1);
      onDrawingChange(imageSrc, canvas.toDataURL());
    }
  };

  const handleUndo = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && currentStep > 0) {
      const previous = drawingHistory[currentStep - 1];
      ctx.putImageData(previous, 0, 0);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const blankState = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      setDrawingHistory([blankState]);
      setCurrentStep(0);
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) onDrawingChange(imageSrc, canvas.toDataURL());
  };

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const container = image?.parentElement;

    if (canvas && container && image) {
      const size = Math.min(container.clientWidth, container.clientHeight);
      canvas.width = size;
      canvas.height = size;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.imageSmoothingEnabled = true;

        const blank = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([blank]);
        setCurrentStep(0);

        if (savedDrawing) {
          const img = new Image();
          img.src = savedDrawing;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50"
      onClick={() => {
        saveDrawing();
        onClose();
      }}
    >
      <div
        className="relative p-6 bg-white max-h-[95vh] rounded-lg select-none overflow-auto"
        style={{ width: "80vmin", height: "80vmin", maxWidth: "80vmin", maxHeight: "80vmin" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-800">{imageTitle} Examination</h2>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors cursor-pointer"
            onClick={() => {
              saveDrawing();
              onClose();
            }}
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4 justify-between mb-2">
          {/* Drawing Controls */}
          <div className="flex gap-4 justify-between">
            <div className="flex gap-3 items-center">
              <span className="font-medium text-sm">Color:</span>
              <div className="flex gap-2">
                {["#0000FF", "#FF0000", "#00FF00", "#000000"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentColor(color);
                    }}
                    className="w-6 h-6 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: color,
                      boxShadow: currentColor === color ? `0 0 0 2px ${color}` : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Thickness:</span>
              <input
                type="range"
                min="1"
                max="30"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-xs text-gray-600">{thickness}px</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUndo();
                }}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Drawing Area */}
          <div className="flex-1 flexitems-center justify-center">
            <div
              className="relative border-2 border-dashed border-gray-300 p-2"
              style={{ width: "100%", aspectRatio: "1" }}
            >
              <img
                ref={imageRef}
                src={imageSrc}
                alt={imageAlt}
                onLoad={handleImageLoad}
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ pointerEvents: "auto", touchAction: "none" }}
              />
            </div>
          </div>
          {/* <div className="h-16 w-full shrink-0"></div> */}
        </div>
      </div>
    </div>
  );
};

export default SoftTissueModal;
