import { useState, useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { calculateContrastRatio, getContrastComplianceLevel } from "@/lib/color-utils";
import { Check, Info, Pipette } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

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
  const [inputValue, setInputValue] = useState(color);
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // 背景色と選択中の色のコントラスト比を計算
  const contrastRatio = calculateContrastRatio(color, backgroundColor);
  const compliance = getContrastComplianceLevel(contrastRatio);
  
  // 入力値の変更を追跡
  useEffect(() => {
    setInputValue(color);
  }, [color]);

  // 色が変更されたときのハンドラー
  const handleColorChange = (newColor: string) => {
    setInputValue(newColor);
    onChange(newColor);
  };

  // プリセットカラーを選択したときのハンドラー
  const handlePresetSelect = (presetColor: string) => {
    handleColorChange(presetColor);
  };

  // 入力完了時のハンドラー
  const handleInputBlur = () => {
    try {
      // 有効な16進数カラーコードかチェック
      if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputValue)) {
        onChange(inputValue);
      } else {
        // 無効な値の場合は元の値に戻す
        setInputValue(color);
      }
    } catch (e) {
      setInputValue(color);
    }
  };

  // キーボードイベント処理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm flex items-center">
          {label}
          {backgroundColor && (
            <div 
              className="ml-2 text-xs px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: compliance.aa ? '#10b981' : compliance.aaLarge ? '#f59e0b' : '#ef4444',
                color: 'white'
              }}
              title={`コントラスト比: ${contrastRatio.toFixed(2)} - ${compliance.description}`}
            >
              {contrastRatio.toFixed(1)}:1
            </div>
          )}
        </Label>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-full h-9 rounded-md flex items-center gap-2 px-3 border border-input"
            style={{ 
              backgroundColor: color,
              color: contrastRatio > 4.5 ? color : calculateContrastRatio(color, "#FFFFFF") > 2 ? "#000000" : "#FFFFFF"
            }}
          >
            <div 
              className="w-4 h-4 rounded-full border border-white/50" 
              style={{ backgroundColor: color }}
            />
            <span style={{ 
              color: calculateContrastRatio(color, "#FFFFFF") > 4.5 ? "#FFFFFF" : "#000000",
              textShadow: '0 0 2px rgba(0,0,0,0.5)'
            }}>
              {inputValue.toUpperCase()}
            </span>
            <Pipette className="ml-auto w-4 h-4" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent 
          side={isMobile ? "bottom" : "right"} 
          className="w-64"
          sideOffset={5}
        >
          <div className="space-y-3">
            <HexColorPicker color={color} onChange={handleColorChange} />
            
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Label htmlFor="hex-input" className="sr-only">HEX値</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">#</span>
                  <HexColorInput
                    id="hex-input"
                    color={color}
                    onChange={handleColorChange}
                    prefixed={false}
                    className="w-full border h-9 px-7 rounded-md"
                  />
                </div>
              </div>
              <Button 
                size="sm" 
                className="h-9 px-3"
                onClick={() => setIsOpen(false)}
              >
                <Check className="w-4 h-4" />
              </Button>
            </div>
            
            {/* プリセットカラー */}
            <div className="space-y-1.5">
              <Label className="text-xs">プリセット</Label>
              <div className="flex flex-wrap gap-1.5">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-6 h-6 rounded-md ${
                      presetColor === color ? 'ring-2 ring-primary' : ''
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handlePresetSelect(presetColor)}
                    aria-label={`色を${presetColor}に設定`}
                  />
                ))}
              </div>
            </div>
            
            {/* コントラスト情報 */}
            {backgroundColor && (
              <div className="text-xs bg-muted/50 p-2 rounded-md space-y-1">
                <div className="flex items-center">
                  <Info className="w-3 h-3 mr-1 text-muted-foreground" />
                  <span>視認性情報</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>コントラスト比:</span>
                  <span 
                    className={`font-medium ${
                      compliance.aa 
                        ? 'text-green-500' 
                        : compliance.aaLarge 
                          ? 'text-amber-500' 
                          : 'text-red-500'
                    }`}
                  >
                    {contrastRatio.toFixed(2)}:1
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>視認性:</span>
                  <span className="font-medium">
                    {compliance.description}
                  </span>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}