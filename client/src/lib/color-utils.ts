/**
 * 16進数カラーをRGB値に変換する
 * @param hex 16進数カラーコード (#RRGGBB形式)
 * @returns RGB値の配列 [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] {
  // 先頭の#を削除して処理
  const sanitizedHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  
  // 3桁の場合は6桁に拡張
  const expandedHex = sanitizedHex.length === 3
    ? sanitizedHex[0] + sanitizedHex[0] + sanitizedHex[1] + sanitizedHex[1] + sanitizedHex[2] + sanitizedHex[2]
    : sanitizedHex;
  
  // 16進数からRGBに変換
  const r = parseInt(expandedHex.substring(0, 2), 16);
  const g = parseInt(expandedHex.substring(2, 4), 16);
  const b = parseInt(expandedHex.substring(4, 6), 16);
  
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
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * 相対輝度を計算する (WCAG 2.0)
 * @param rgb RGB値の配列 [r, g, b]
 * @returns 相対輝度 (0-1)
 */
export function calculateRelativeLuminance([r, g, b]: [number, number, number]): number {
  // sRGB値に変換
  const srgb = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928
      ? c / 12.92
      : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  // 相対輝度の計算 (WCAG 2.0)
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
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
  
  const light = Math.max(luminance1, luminance2);
  const dark = Math.min(luminance1, luminance2);
  
  return (light + 0.05) / (dark + 0.05);
}

/**
 * コントラスト比に基づくWCAGコンプライアンスレベルを取得する
 * @param ratio コントラスト比
 * @returns コンプライアンスレベルの説明
 */
export function getContrastComplianceLevel(ratio: number): {
  level: 'AAA' | 'AA' | 'FAIL',
  complianceLevel: string
} {
  if (ratio >= 7.0) {
    return {
      level: 'AAA',
      complianceLevel: 'AAA レベル準拠 (優れた可読性)'
    };
  } else if (ratio >= 4.5) {
    return {
      level: 'AA',
      complianceLevel: 'AA レベル準拠 (良好な可読性)'
    };
  } else {
    return {
      level: 'FAIL',
      complianceLevel: '未準拠 (可読性の問題あり)'
    };
  }
}

/**
 * カラーとコントラストに関する情報を取得する
 * @param foreground 前景色 (#RRGGBB形式)
 * @param background 背景色 (#RRGGBB形式)
 * @returns コントラスト情報
 */
export function getColorContrastInfo(foreground: string, background: string) {
  const ratio = calculateContrastRatio(foreground, background);
  const compliance = getContrastComplianceLevel(ratio);
  
  return {
    contrastRatio: ratio,
    ...compliance,
    rgb: hexToRgb(foreground)
  };
}