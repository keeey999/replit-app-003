import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CircleConfig } from "@shared/schema";
import { CircleHelp, ChevronUp, ChevronDown } from "lucide-react";

interface ControlsProps {
  config: CircleConfig;
  onConfigChange: (config: Partial<CircleConfig>) => void;
  onInfoClick: () => void;
}

export default function Controls({ config, onConfigChange, onInfoClick }: ControlsProps) {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const complexityLabels = ["シンプル", "基本", "中級", "複雑", "マスター"];
  const symbolDensityLabels = ["最小", "少ない", "普通", "多い", "最大"];
  
  const colorOptions = [
    { value: "gold", label: "金", bgClass: "bg-yellow-500" },
    { value: "azure", label: "青", bgClass: "bg-blue-400" },
    { value: "crimson", label: "紅", bgClass: "bg-red-600" },
    { value: "emerald", label: "緑", bgClass: "bg-green-500" },
    { value: "purple", label: "紫", bgClass: "bg-purple-600" },
    { value: "silver", label: "銀", bgClass: "bg-gray-300" },
    { value: "pink", label: "桃", bgClass: "bg-pink-400" },
  ];
  
  const backgroundOptions = [
    { value: "dark", label: "暗黒", bgClass: "bg-black" },
    { value: "gradient", label: "虹彩", bgClass: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" },
    { value: "night", label: "夜空", bgClass: "bg-blue-900" },
    { value: "paper", label: "古紙", bgClass: "bg-amber-100" },
    { value: "stone", label: "石版", bgClass: "bg-gray-600" },
  ];

  return (
    <div className="bg-card-gradient rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-mystic-gradient font-cinzel font-bold flex justify-between items-center">
        <h2 className="text-lg flex items-center">
          カスタマイズ
          <button onClick={onInfoClick} className="ml-2 text-white hover:text-secondary transition-colors">
            <CircleHelp className="h-5 w-5" />
          </button>
        </h2>
        <button 
          onClick={() => setIsControlsOpen(!isControlsOpen)} 
          className="text-white hover:text-secondary transition-colors"
        >
          {isControlsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {isControlsOpen && (
        <div className="p-4 space-y-4">
          {/* Complexity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="complexity" className="text-sm">複雑さ</Label>
              <span className="text-secondary text-sm">{complexityLabels[config.complexity - 1]}</span>
            </div>
            <Slider
              id="complexity"
              min={1}
              max={5}
              step={1}
              value={[config.complexity]}
              onValueChange={(value) => onConfigChange({ complexity: value[0] })}
              className="w-full"
            />
          </div>
          
          {/* Style Selector */}
          <div className="space-y-2">
            <Label htmlFor="style" className="text-sm">スタイル</Label>
            <Select
              value={config.style}
              onValueChange={(value) => onConfigChange({ style: value })}
            >
              <SelectTrigger id="style" className="w-full bg-muted">
                <SelectValue placeholder="スタイルを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">クラシック</SelectItem>
                <SelectItem value="elemental">エレメンタル</SelectItem>
                <SelectItem value="runic">ルーン</SelectItem>
                <SelectItem value="celestial">天体</SelectItem>
                <SelectItem value="modern">モダン</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Color Scheme */}
          <div className="space-y-2">
            <Label className="text-sm">カラースキーム</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onConfigChange({ colorScheme: color.value })}
                  className={`w-8 h-8 rounded-full ${color.bgClass} ${
                    config.colorScheme === color.value 
                      ? "border-2 border-white dark:border-white" 
                      : "border-2 border-transparent"
                  }`}
                  title={color.label}
                  aria-label={`色を${color.label}に設定`}
                />
              ))}
            </div>
          </div>
          
          {/* Background Options */}
          <div className="space-y-2">
            <Label className="text-sm">背景</Label>
            <div className="flex flex-wrap gap-2">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => onConfigChange({ backgroundColor: bg.value })}
                  className={`w-8 h-8 rounded-md ${bg.bgClass} ${
                    (config.backgroundColor || 'dark') === bg.value 
                      ? "border-2 border-white dark:border-white" 
                      : "border-2 border-transparent"
                  }`}
                  title={bg.label}
                  aria-label={`背景を${bg.label}に設定`}
                />
              ))}
            </div>
          </div>
          
          {/* Advanced Options */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm">詳細設定</Label>
              <button 
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} 
                className="text-primary dark:text-accent hover:text-secondary text-xs transition-colors flex items-center"
              >
                {isAdvancedOpen ? "隠す" : "表示"}
                {isAdvancedOpen ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
              </button>
            </div>
            
            {isAdvancedOpen && (
              <div className="space-y-3 pt-2">
                {/* Size Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="size" className="text-xs">サイズ</Label>
                    <span className="text-secondary text-xs">{config.size}px</span>
                  </div>
                  <Slider
                    id="size"
                    min={300}
                    max={1000}
                    step={100}
                    value={[config.size]}
                    onValueChange={(value) => onConfigChange({ size: value[0] })}
                    className="w-full"
                  />
                </div>
                
                {/* Symbol Density */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="symbolDensity" className="text-xs">シンボル密度</Label>
                    <span className="text-secondary text-xs">{symbolDensityLabels[config.symbolDensity - 1]}</span>
                  </div>
                  <Slider
                    id="symbolDensity"
                    min={1}
                    max={5}
                    step={1}
                    value={[config.symbolDensity]}
                    onValueChange={(value) => onConfigChange({ symbolDensity: value[0] })}
                    className="w-full"
                  />
                </div>
                
                {/* Text Visibility */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="showText" className="text-xs">文字の表示</Label>
                  <Switch
                    id="showText"
                    checked={config.showText}
                    onCheckedChange={(checked) => onConfigChange({ showText: checked })}
                  />
                </div>
                
                {/* Animation Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="animation" className="text-xs">アニメーション効果</Label>
                  <Switch
                    id="animation"
                    checked={config.animation}
                    onCheckedChange={(checked) => onConfigChange({ animation: checked })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
