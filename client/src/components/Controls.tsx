import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CircleConfig, CircleTheme } from "@shared/schema";
import { CircleHelp, ChevronUp, ChevronDown, Brush, Palette, MousePointer, Zap } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import EnhancedColorPicker from "./EnhancedColorPicker";
import ColorPicker from "./ColorPicker";
import { useSwipeGesture } from "@/hooks/use-mobile";
import { getThemeById } from "@/lib/theme-presets";
import { calculateContrastRatio } from "@/lib/color-utils";

interface ControlsProps {
  config: CircleConfig;
  onConfigChange: (config: Partial<CircleConfig>) => void;
  onInfoClick: () => void;
}

// カラースキームに基づいてプライマリカラーを取得する関数
function getPrimaryColor(config: CircleConfig): string {
  if (config.useCustomColors && config.customPrimaryColor) {
    return config.customPrimaryColor;
  } else {
    // 既定のカラースキームを使用
    switch (config.colorScheme) {
      case "azure":
        return "#3B82F6";
      case "crimson":
        return "#E11D48";
      case "emerald":
        return "#10B981";
      case "purple":
        return "#9333EA";
      case "silver":
        return "#CBD5E1";
      case "pink":
        return "#F472B6";
      default:
        return "#FFD700"; // Gold
    }
  }
}

export default function Controls({ config, onConfigChange, onInfoClick }: ControlsProps) {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'themes' | 'advanced'>('basic');

  // スワイプジェスチャー対応
  const swipeHandlers = useSwipeGesture(
    // 左スワイプで次のタブへ
    () => {
      if (activeTab === 'basic') setActiveTab('themes');
      else if (activeTab === 'themes') setActiveTab('advanced');
    },
    // 右スワイプで前のタブへ
    () => {
      if (activeTab === 'advanced') setActiveTab('themes');
      else if (activeTab === 'themes') setActiveTab('basic');
    }
  );

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
      <div className="p-3 bg-mystic-gradient font-cinzel font-bold flex flex-col gap-2">
        <div className="flex justify-between items-center">
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
          <div className="flex border-b border-white/20 pb-1">
            <button
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-t-md transition-colors ${
                activeTab === 'basic' 
                  ? 'bg-background/10 text-white font-semibold' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('basic')}
            >
              <Brush className="w-4 h-4" />
              <span>基本</span>
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-t-md transition-colors ${
                activeTab === 'themes' 
                  ? 'bg-background/10 text-white font-semibold' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('themes')}
            >
              <Palette className="w-4 h-4" />
              <span>テーマ</span>
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-t-md transition-colors ${
                activeTab === 'advanced' 
                  ? 'bg-background/10 text-white font-semibold' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('advanced')}
            >
              <Zap className="w-4 h-4" />
              <span>詳細</span>
            </button>
          </div>
        )}
      </div>
      
      {isControlsOpen && (
        <div className="p-4 space-y-4" {...swipeHandlers}>
          {/* 基本タブ */}
          {activeTab === 'basic' && (
            <>
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
              
              {/* Custom Color Option */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="useCustomColors" className="text-sm flex items-center">
                    <Palette className="w-4 h-4 mr-1" />
                    カスタムカラー
                  </Label>
                  <Switch
                    id="useCustomColors"
                    checked={config.useCustomColors}
                    onCheckedChange={(checked) => onConfigChange({ useCustomColors: checked })}
                  />
                </div>
                
                {config.useCustomColors && (
                  <div className="pt-2 space-y-4 grid grid-cols-2 gap-4">
                    <ColorPicker
                      label="メイン色"
                      color={config.customPrimaryColor || "#FFD700"}
                      onChange={(color) => onConfigChange({ customPrimaryColor: color })}
                    />
                    <ColorPicker
                      label="背景色"
                      color={config.customBackgroundColor || "#121212"}
                      onChange={(color) => onConfigChange({ customBackgroundColor: color })}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* テーマタブ */}
          {activeTab === 'themes' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">テーマプリセット</Label>
                <p className="text-xs text-muted-foreground">
                  事前に設定されたカラーセットから選択できます。<br />
                  スワイプでカテゴリーを切り替え可能です。
                </p>
              </div>
              
              <ThemeSelector 
                selectedThemeId={config.themeId}
                onSelectTheme={(theme) => {
                  // テーマ選択時にカスタムカラーをオフに
                  onConfigChange({ 
                    themeId: theme.id,
                    useCustomColors: false
                  });
                }}
              />

              <div className="space-y-2 pt-2">
                <Label className="text-sm">配色の調整</Label>
                <div className="space-y-4">
                  <EnhancedColorPicker
                    label="メイン色"
                    color={config.themeId && !config.useCustomColors 
                      ? getThemeById(config.themeId)?.primaryColor || "#FFD700"
                      : config.customPrimaryColor || "#FFD700"
                    }
                    backgroundColor={config.themeId && !config.useCustomColors
                      ? getThemeById(config.themeId)?.backgroundColor || "#121212"
                      : config.customBackgroundColor || "#121212"
                    }
                    onChange={(color) => {
                      // カスタムカラーモードに切り替え
                      onConfigChange({ 
                        customPrimaryColor: color,
                        useCustomColors: true,
                        themeId: undefined // テーマの選択を解除
                      });
                    }}
                  />
                  
                  <EnhancedColorPicker
                    label="背景色"
                    color={config.themeId && !config.useCustomColors
                      ? getThemeById(config.themeId)?.backgroundColor || "#121212"
                      : config.customBackgroundColor || "#121212"
                    }
                    onChange={(color) => {
                      // カスタムカラーモードに切り替え
                      onConfigChange({ 
                        customBackgroundColor: color,
                        useCustomColors: true,
                        themeId: undefined // テーマの選択を解除
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 詳細設定タブ */}
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              {/* Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="size" className="text-sm">サイズ</Label>
                  <span className="text-secondary text-sm">{config.size}px</span>
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="symbolDensity" className="text-sm">シンボル密度</Label>
                  <span className="text-secondary text-sm">{symbolDensityLabels[config.symbolDensity - 1]}</span>
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
              <div className="space-y-2">
                <Label htmlFor="showText" className="text-sm">文字の表示</Label>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    円周に古代文字を表示します
                  </span>
                  <Switch
                    id="showText"
                    checked={config.showText}
                    onCheckedChange={(checked) => onConfigChange({ showText: checked })}
                  />
                </div>
              </div>
              
              {/* Animation Toggle */}
              <div className="space-y-2">
                <Label htmlFor="animation" className="text-sm">アニメーション効果</Label>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    ゆっくりと回転するエフェクトを追加します
                  </span>
                  <Switch
                    id="animation"
                    checked={config.animation}
                    onCheckedChange={(checked) => onConfigChange({ animation: checked })}
                  />
                </div>
              </div>

              {/* Accessibility Info */}
              <div className="rounded-md bg-muted/50 p-3 text-xs space-y-2 mt-4">
                <h3 className="font-medium">アクセシビリティ情報</h3>
                <p>現在の配色は、視覚障害をお持ちの方にも見やすい設計になっています。</p>
                <p>
                  コントラスト比: 
                  {config.useCustomColors 
                    ? calculateContrastRatio(
                        config.customPrimaryColor || "#FFD700", 
                        config.customBackgroundColor || "#121212"
                      ).toFixed(2)
                    : config.themeId 
                      ? calculateContrastRatio(
                          getThemeById(config.themeId)?.primaryColor || "#FFD700", 
                          getThemeById(config.themeId)?.backgroundColor || "#121212"
                        ).toFixed(2)
                      : calculateContrastRatio(
                          getPrimaryColor(config), 
                          "#121212"
                        ).toFixed(2)
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}