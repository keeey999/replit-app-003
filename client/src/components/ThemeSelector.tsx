import { useState } from "react";
import { CircleTheme } from "@shared/schema";
import { presetThemes, themeCategories } from "@/lib/theme-presets";
import { Label } from "@/components/ui/label";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Plus, Heart, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-mobile";

interface ThemeSelectorProps {
  onSelectTheme: (theme: CircleTheme) => void;
  selectedThemeId?: string;
}

export default function ThemeSelector({ onSelectTheme, selectedThemeId }: ThemeSelectorProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // テーマをフィルタリング
  const filteredThemes = activeCategory === "all" 
    ? presetThemes 
    : presetThemes.filter(theme => theme.category === activeCategory);

  // スマホ用の最適化：1列の場合は4つまで、それ以外は2列で表示
  const mobileItemsPerRow = 4;
  const itemsPerRow = isMobile ? mobileItemsPerRow : 5;

  return (
    <div className="space-y-4 pb-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm flex items-center">
          <Palette className="w-4 h-4 mr-1" />
          テーマプリセット
        </Label>
      </div>

      <Tabs 
        defaultValue="all" 
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <div className="relative overflow-auto pb-1 no-scrollbar">
          <TabsList className="flex whitespace-nowrap bg-muted">
            <TabsTrigger value="all" className="text-xs">すべて</TabsTrigger>
            {themeCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-2">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {filteredThemes.map(theme => (
              <ThemePreviewButton
                key={theme.id}
                theme={theme}
                isSelected={theme.id === selectedThemeId}
                onClick={() => onSelectTheme(theme)}
              />
            ))}
            
            {/* カスタムテーマ作成ボタン */}
            <button
              className="w-full aspect-square bg-muted/50 rounded-md border border-dashed border-muted-foreground/50 hover:border-primary/50 hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="新しいテーマを作成"
            >
              <Plus className="h-6 w-6 text-muted-foreground/70" />
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// テーマのプレビューボタン
interface ThemePreviewButtonProps {
  theme: CircleTheme;
  isSelected: boolean;
  onClick: () => void;
}

function ThemePreviewButton({ theme, isSelected, onClick }: ThemePreviewButtonProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`w-full aspect-square rounded-md overflow-hidden relative transition-all ${
              isSelected ? 'ring-2 ring-primary scale-105' : 'ring-1 ring-border hover:ring-secondary/50'
            }`}
            style={{ 
              background: theme.backgroundColor 
            }}
            onClick={onClick}
            aria-label={`テーマ: ${theme.name}`}
          >
            {/* テーマの視覚的なプレビュー */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-1/2 h-1/2 rounded-full"
                style={{ 
                  border: `2px solid ${theme.primaryColor}`,
                  boxShadow: `0 0 10px ${theme.primaryColor}80`
                }}
              />
              {theme.accentColor && (
                <div 
                  className="absolute w-1/3 h-1/3 rounded-full"
                  style={{ 
                    border: `1px solid ${theme.accentColor}` 
                  }}
                />
              )}
            </div>
            
            {/* テーマ名 */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 text-[8px] sm:text-[10px] p-0.5 text-center truncate">
              {theme.name}
            </div>
            
            {/* 選択済みの場合はアイコン表示 */}
            {isSelected && (
              <div className="absolute top-0.5 right-0.5">
                <Heart className="h-3 w-3 text-primary fill-primary" />
              </div>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <div className="space-y-1">
            <p className="font-bold">{theme.name}</p>
            {theme.description && (
              <p className="text-xs text-muted-foreground">{theme.description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}