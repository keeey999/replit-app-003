import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { calculateContrastRatio, getColorContrastInfo } from "@/lib/color-utils";

interface EnhancedColorPickerProps {
  label: string;
  color: string;
  backgroundColor?: string; // コントラスト比計算用
  onChange: (color: string) => void;
  presetColors?: string[];
}

export default function EnhancedColorPicker({ 
  label, 
  color, 
  backgroundColor = "#121212", 
  onChange,
  presetColors = ["#FFD700", "#3B82F6", "#E11D48", "#10B981", "#9333EA", "#CBD5E1", "#F472B6"]
}: EnhancedColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  // コントラスト比の計算
  const contrastRatio = calculateContrastRatio(currentColor, backgroundColor);
  const contrastInfo = getColorContrastInfo(currentColor, backgroundColor);
  
  // 外部からのcolor変更を反映
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  // カラー変更時の処理
  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange(newColor);
  };

  // 外部クリック検出
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="space-y-2">
      <Label className="text-sm flex items-center">{label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-10 rounded-md flex items-center gap-2 px-3 hover:bg-opacity-80 transition-colors border border-input"
          style={{ backgroundColor: currentColor, color: contrastRatio > 4.5 ? "#FFFFFF" : "#000000" }}
          aria-label={`${label}を選択: 現在の色は${currentColor}`}
        >
          <span className="font-mono text-xs">{currentColor}</span>
          <div className="ml-auto">
            <span className="text-xs">
              {contrastRatio.toFixed(1)}:1
            </span>
          </div>
        </button>

        {isOpen && (
          <div
            ref={popoverRef}
            className="absolute z-50 left-0 transform -translate-y-full sm:translate-y-0 sm:top-12 w-full p-3 rounded-md shadow-lg bg-popover border border-border"
          >
            <HexColorPicker color={currentColor} onChange={handleColorChange} />
            
            {/* プリセットカラー */}
            <div className="mt-3">
              <Label className="text-xs mb-1 block">プリセット</Label>
              <div className="flex flex-wrap gap-1.5">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    onClick={() => handleColorChange(presetColor)}
                    className={`w-6 h-6 rounded-md ${
                      currentColor.toLowerCase() === presetColor.toLowerCase()
                        ? "ring-2 ring-primary ring-offset-1"
                        : ""
                    }`}
                    style={{ backgroundColor: presetColor }}
                    aria-label={`色を${presetColor}に設定`}
                  />
                ))}
              </div>
            </div>
            
            {/* コントラスト情報 */}
            <div className="mt-3 text-xs space-y-1">
              <Label className="text-xs">アクセシビリティ</Label>
              <div className={`py-1 px-2 rounded-sm ${
                contrastRatio >= 7 
                  ? "bg-green-800 text-green-100" 
                  : contrastRatio >= 4.5 
                  ? "bg-yellow-800 text-yellow-100" 
                  : "bg-red-800 text-red-100"
              }`}>
                {contrastInfo.complianceLevel}
              </div>
            </div>
            
            {/* 閉じるボタン */}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded-md"
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