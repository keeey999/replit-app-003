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
          className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(true)}
        />

        {isOpen && (
          <div
            className="fixed z-[100] bg-card rounded-lg shadow-lg p-3 border border-slate-600"
            style={{ 
              bottom: window.innerHeight / 2 - 100,
              left: window.innerWidth / 2 - 100,
            }}
            ref={popover}
            onClick={(e) => e.stopPropagation()}
          >
            <HexColorPicker color={color} onChange={onChange} />
            <div className="mt-2 text-xs">
              <span>現在の色: {color}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}