// カラーコントラスト比の計算とアクセシビリティ機能のためのユーティリティ

/**
 * 16進数カラーをRGBに変換する
 * @param hex 16進数カラーコード (例: #FF0000)
 * @returns RGB値の配列 [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] {
  // 短縮形対応 (#FFF -> #FFFFFF)
  const normalizedHex = hex.length === 4 
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` 
    : hex;
  
  const r = parseInt(normalizedHex.slice(1, 3), 16);
  const g = parseInt(normalizedHex.slice(3, 5), 16);
  const b = parseInt(normalizedHex.slice(5, 7), 16);
  
  return [r, g, b];
}

/**
 * RGBを16進数カラーに変換する
 * @param r 赤 (0-255)
 * @param g 緑 (0-255)
 * @param b 青 (0-255)
 * @returns 16進数カラーコード
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * 相対輝度を計算する (WCAG 2.0)
 * @param rgb RGB値の配列 [r, g, b]
 * @returns 相対輝度 (0-1)
 */
export function calculateRelativeLuminance([r, g, b]: [number, number, number]): number {
  // sRGB色空間からリニア値への変換
  const [sR, sG, sB] = [r / 255, g / 255, b / 255];
  
  // リニア値への変換（WCAG 2.0式）
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  // 相対輝度の計算
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * 2色間のコントラスト比を計算する
 * @param color1 カラー1 (#RRGGBB形式)
 * @param color2 カラー2 (#RRGGBB形式)
 * @returns コントラスト比 (1-21)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const luminance1 = calculateRelativeLuminance(hexToRgb(color1));
  const luminance2 = calculateRelativeLuminance(hexToRgb(color2));
  
  // 明るい方を分子に、暗い方を分母に配置
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * コントラスト比に基づくWCAGコンプライアンスレベルを取得する
 * @param ratio コントラスト比
 * @returns コンプライアンスレベルの説明
 */
export function getContrastComplianceLevel(ratio: number): {
  aaLarge: boolean;
  aa: boolean;
  aaaLarge: boolean;
  aaa: boolean;
  description: string;
} {
  const aaLarge = ratio >= 3; // AA 大テキスト (18pt以上 or 14pt以上の太字)
  const aa = ratio >= 4.5; // AA 通常テキスト
  const aaaLarge = ratio >= 4.5; // AAA 大テキスト
  const aaa = ratio >= 7; // AAA 通常テキスト
  
  let description = "";
  
  if (aaa) {
    description = "優れた視認性 (AAA準拠)";
  } else if (aa) {
    description = "良好な視認性 (AA準拠)";
  } else if (aaLarge) {
    description = "大きいテキストには十分 (AA準拠)";
  } else {
    description = "視認性が低い (非準拠)";
  }
  
  return { aaLarge, aa, aaaLarge, aaa, description };
}

/**
 * カラーとコントラストに関する情報を取得する
 * @param foreground 前景色 (#RRGGBB形式)
 * @param background 背景色 (#RRGGBB形式)
 * @returns コントラスト情報
 */
export function getColorContrastInfo(foreground: string, background: string) {
  const contrastRatio = calculateContrastRatio(foreground, background);
  const compliance = getContrastComplianceLevel(contrastRatio);
  
  return {
    contrastRatio: contrastRatio.toFixed(2),
    compliance,
    isAccessible: compliance.aa,
  };
}