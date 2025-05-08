import { CircleTheme } from "@shared/schema";

// プリセットテーマ定義
export const presetThemes: CircleTheme[] = [
  {
    id: "traditional-japanese",
    name: "和風",
    description: "伝統的な日本のデザインに基づく落ち着いたテーマ",
    primaryColor: "#BA2636", // 深紅
    backgroundColor: "#2C2C2C", // 墨色
    accentColor: "#E8B568", // 金色
    category: "japanese",
    isPreset: true,
  },
  {
    id: "zen-garden",
    name: "禅庭",
    description: "禅の精神と日本庭園からインスピレーションを得たテーマ",
    primaryColor: "#7BA05B", // 緑青
    backgroundColor: "#EBE8E1", // 生成り色
    accentColor: "#8C754A", // 朽葉色
    category: "japanese",
    isPreset: true,
  },
  {
    id: "sakura",
    name: "桜",
    description: "桜の花びらと優しい春の色合い",
    primaryColor: "#F2AEB1", // 桜色
    backgroundColor: "#0D0D0D", // 漆黒
    accentColor: "#F8F1E9", // 白磁
    category: "japanese",
    isPreset: true,
  },
  {
    id: "futuristic",
    name: "未来的",
    description: "サイバーパンク風の鮮やかで未来的なデザイン",
    primaryColor: "#00FFFF", // シアン
    backgroundColor: "#0A0A1E", // 深い青黒
    accentColor: "#FF00FF", // マゼンタ
    category: "futuristic",
    isPreset: true,
  },
  {
    id: "neon-dream",
    name: "ネオン夢幻",
    description: "ネオンサインに囲まれた夜の都市からインスピレーション",
    primaryColor: "#FE53BB", // ネオンピンク
    backgroundColor: "#1A1A2E", // 深い青黒
    accentColor: "#08F7FE", // 明るい青
    category: "futuristic",
    isPreset: true,
  },
  {
    id: "ancient-stone",
    name: "古代石板",
    description: "古代の魔術書や石板をイメージしたテーマ",
    primaryColor: "#BCA37F", // 古びた金
    backgroundColor: "#3E3232", // 渋い茶色
    accentColor: "#822F2F", // 錆びた赤
    category: "ancient",
    isPreset: true,
  },
  {
    id: "mystical-forest",
    name: "神秘の森",
    description: "神秘的な森の中の魔法をイメージしたテーマ",
    primaryColor: "#70E2A3", // エメラルド緑
    backgroundColor: "#1B3440", // 深い森の青
    accentColor: "#EDD892", // 魔法の光
    category: "mystical",
    isPreset: true,
  },
  {
    id: "celestial",
    name: "天体",
    description: "星空や宇宙をイメージした神秘的なテーマ",
    primaryColor: "#F0E7DB", // 星明かり
    backgroundColor: "#081F2D", // 夜空
    accentColor: "#FFCB6B", // 星の光
    category: "celestial",
    isPreset: true,
  },
  {
    id: "blood-moon",
    name: "血の月",
    description: "血の月と暗い夜をイメージした不気味なテーマ",
    primaryColor: "#D33C36", // 血の色
    backgroundColor: "#130B13", // 闇の色
    accentColor: "#782020", // 暗い赤
    category: "dark",
    isPreset: true,
  },
  {
    id: "alchemist-gold",
    name: "錬金術師の黄金",
    description: "伝統的な錬金術のイメージに基づくテーマ",
    primaryColor: "#F1C40F", // 鮮やかな金
    backgroundColor: "#2C3E50", // 暗い紺
    accentColor: "#E67E22", // 燃える炎
    category: "alchemy",
    isPreset: true,
  },
];

// テーマカテゴリの定義
export const themeCategories = [
  { id: "japanese", name: "和風" },
  { id: "futuristic", name: "未来的" },
  { id: "ancient", name: "古代" },
  { id: "mystical", name: "神秘的" },
  { id: "celestial", name: "天体" },
  { id: "dark", name: "暗黒" },
  { id: "alchemy", name: "錬金術" },
];

// テーマIDからテーマを取得する関数
export function getThemeById(id: string): CircleTheme | undefined {
  return presetThemes.find(theme => theme.id === id);
}

// カテゴリからテーマのリストを取得する関数
export function getThemesByCategory(category: string): CircleTheme[] {
  return presetThemes.filter(theme => theme.category === category);
}