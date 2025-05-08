import { useState } from "react";
import { CircleTheme } from "@shared/schema";
import { presetThemes, themeCategories } from "@/lib/theme-presets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeGesture } from "@/hooks/use-mobile";
import { calculateContrastRatio } from "@/lib/color-utils";

interface ThemeSelectorProps {
  selectedThemeId?: string;
  onSelectTheme: (theme: CircleTheme) => void;
}

export default function ThemeSelector({ selectedThemeId, onSelectTheme }: ThemeSelectorProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = themeCategories[activeCategoryIndex];

  // スワイプジェスチャー対応
  const swipeHandlers = useSwipeGesture(
    // 左スワイプで次のカテゴリへ
    () => {
      setActiveCategoryIndex((prev) => (prev + 1) % themeCategories.length);
    },
    // 右スワイプで前のカテゴリへ
    () => {
      setActiveCategoryIndex((prev) => 
        prev === 0 ? themeCategories.length - 1 : prev - 1
      );
    }
  );

  const themesInCategory = presetThemes.filter(
    (theme) => theme.category === activeCategory.id
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setActiveCategoryIndex((prev) => 
              prev === 0 ? themeCategories.length - 1 : prev - 1
            );
          }}
          className="p-1.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white shadow-sm hover:shadow transition-all"
          aria-label="前のカテゴリー"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <span className="font-medium text-sm bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-1.5 rounded-md shadow-sm">
          {activeCategory.name}
        </span>
        
        <button
          onClick={() => {
            setActiveCategoryIndex((prev) => (prev + 1) % themeCategories.length);
          }}
          className="p-1.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white shadow-sm hover:shadow transition-all"
          aria-label="次のカテゴリー"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div 
        className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto px-1 pb-2 theme-grid" 
        {...swipeHandlers}
      >
        {themesInCategory.map((theme) => (
          <ThemePreviewCard
            key={theme.id}
            theme={theme}
            isSelected={theme.id === selectedThemeId}
            onSelect={() => onSelectTheme(theme)}
          />
        ))}
      </div>
    </div>
  );
}

interface ThemePreviewCardProps {
  theme: CircleTheme;
  isSelected: boolean;
  onSelect: () => void;
}

function ThemePreviewCard({ theme, isSelected, onSelect }: ThemePreviewCardProps) {
  const contrastRatio = calculateContrastRatio(
    theme.primaryColor,
    theme.backgroundColor
  );
  
  // アクセシビリティレベルを視覚的に表示するためのクラス
  let contrastClass = "bg-red-600"; // 基本は低コントラスト
  if (contrastRatio >= 7) {
    contrastClass = "bg-green-500"; // AAA
  } else if (contrastRatio >= 4.5) {
    contrastClass = "bg-yellow-500"; // AA
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col rounded-md overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-purple-500 transition-all ${
        isSelected 
          ? "ring-2 ring-offset-2 ring-purple-500 scale-[1.05] shadow-xl" 
          : "ring-0 scale-100"
      }`}
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* テーマのプレビュー */}
      <div className="h-24 flex items-center justify-center p-2">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ 
            border: `2px solid ${theme.primaryColor}`,
            boxShadow: `0 0 15px ${theme.primaryColor}80`
          }}
        >
          <div 
            className="w-16 h-16 rounded-full"
            style={{ 
              border: `1px solid ${theme.primaryColor}`,
              background: `radial-gradient(circle, ${theme.primaryColor}20 0%, ${theme.backgroundColor} 100%)`
            }}
          />
        </div>
      </div>
      
      {/* テーマ名 */}
      <div 
        className="w-full text-center py-1.5 px-2 text-xs font-medium truncate"
        style={{ 
          backgroundColor: `${theme.backgroundColor}CC`,
          color: theme.primaryColor
        }}
      >
        {theme.name}
      </div>
      
      {/* アクセシビリティインジケーター */}
      <div 
        className={`absolute top-1 right-1 w-2 h-2 rounded-full ${contrastClass}`}
        title={`コントラスト比: ${contrastRatio.toFixed(1)}`}
      />
    </button>
  );
}