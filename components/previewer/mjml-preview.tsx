"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useViewport } from "@/hooks/use-viewport";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { Maximize, Minimize } from "lucide-react";
import { useLayout } from "@/hooks/use-layout";
import { useHotkeys } from "react-hotkeys-hook";
import { useKeyboard } from "@/hooks/use-keyboard";

interface MJMLPreviewProps {
  html?: string;
}

export const MJMLPreview = ({ html }: MJMLPreviewProps) => {
  const { isFullScreen } = useLayout();
  const { size } = useViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isScaleMode, setIsScaleMode] = useLocalStorage(STORAGE_KEYS.PREVIEW_SCALE_MODE, true);
  const { isAltPressed } = useKeyboard();

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newScale = Math.min(1, (containerWidth - 48) / size.width);
      setScale(newScale);
    }
  }, [size.width]);

  useEffect(() => {
    if (!isScaleMode) {
      setScale(1);
      return;
    }

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [size.width, isScaleMode, updateScale]);

  useHotkeys('alt+f', (e) => {
    e.preventDefault();
    setIsScaleMode(!isScaleMode);
  }, { enableOnFormTags: true });

  if (!html) return (
    <div className="h-full flex items-center justify-center">
      <span className="font-sans">No preview available</span>
    </div>
  );
  
  return (
    <div className="relative h-full">
      <div 
        ref={containerRef}
        className={`h-full w-full flex items-start justify-center bg-gray-100 dark:bg-gray-800 p-6 ${
          isScaleMode ? 'overflow-y-hidden overflow-x-hidden' : 'overflow-auto'
        }`}
      >
        <div className={`${isFullScreen ? 'mt-14' : ''}`}>
          <div 
            className="bg-white shadow-lg origin-top"
            style={{
              width: size.width,
              height: size.height,
              transform: isScaleMode ? `scale(${scale})` : 'none',
              transformOrigin: 'top center',
              marginBottom: isScaleMode ? `${size.height * (1 - scale)}px` : '0'
            }}
          >
            <iframe
              srcDoc={html}
              className="w-full h-full"
              style={{
                border: "none",
                margin: "0 auto",
                width: size.width,
                height: size.height,
              }}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsScaleMode(!isScaleMode)}
        className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${
          isScaleMode 
            ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" 
            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        title={isScaleMode ? "Switch to overflow mode" : "Switch to scale mode"}
      >
        {isScaleMode ? (
          <Minimize className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Maximize className="h-[1.2rem] w-[1.2rem]" />
        )}
        {isAltPressed && (
          <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
            f
          </span>
        )}
      </button>
    </div>
  );
}

export default MJMLPreview;
