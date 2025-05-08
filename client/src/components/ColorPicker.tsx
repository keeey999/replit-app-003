import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  // クリックイベントハンドラーを追加し、外側をクリックした場合にポップオーバーを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popover.current && !popover.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="relative">
        <div
          className="w-8 h-8 rounded-full cursor-pointer border-2 border-white dark:border-white"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(true)}
        />

        {isOpen && (
          <div
            className="absolute z-50 mt-2 bg-card rounded-lg shadow-lg p-3 left-0 sm:left-auto bottom-full sm:bottom-auto"
            ref={popover}
            onClick={(e) => e.stopPropagation()}
          >
            <HexColorPicker color={color} onChange={onChange} />
            <div className="mt-2 text-xs flex justify-between">
              <span>現在の色: {color}</span>
              <button 
                className="text-primary hover:text-accent ml-2 px-2 py-1 bg-slate-700 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}