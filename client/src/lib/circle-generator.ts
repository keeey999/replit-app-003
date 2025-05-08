import { CircleConfig, CircleTheme } from "@shared/schema";
import { drawGeometricPattern } from "./shapes";
import { drawSymbols } from "./symbols";
import { drawRunicText } from "./texts";
import { getThemeById } from "./theme-presets";

export function generateTransmutationCircle(
  canvas: HTMLCanvasElement,
  config: CircleConfig
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Center of the canvas
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) * 0.9;

  // 選択されたテーマを取得（存在する場合）
  let theme: CircleTheme | undefined;
  if (config.themeId) {
    theme = getThemeById(config.themeId);
  }
  
  // テーマに基づいて背景色とプライマリカラーを設定
  let bgColor = "#1E1E2A"; // デフォルトの背景色（明るめに調整）
  let primaryColor = "#FFD700"; // デフォルトのプライマリカラー
  const bgType = config.backgroundColor || "dark";
  
  try {
    // 優先順位を修正: カスタムカラー > テーマ > プリセット
    if (config.useCustomColors && config.customBackgroundColor) {
      // カスタム背景色を最優先
      bgColor = config.customBackgroundColor;
    } else if (theme) {
      // テーマが選択されている場合はそのテーマの背景色を使用
      bgColor = theme.backgroundColor;
    } else if (bgType === "gradient") {
      // グラデーションの場合は直接描画
      const gradientBg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientBg.addColorStop(0, "#4338ca");
      gradientBg.addColorStop(0.5, "#6d28d9");
      gradientBg.addColorStop(1, "#be185d");
      ctx.fillStyle = gradientBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // プライマリカラーの決定
      primaryColor = getPrimaryColor(config, theme);
      
      // グラデーションの場合は表示のための追加調整は不要
      return drawRemainingElements(ctx, centerX, centerY, radius, config, primaryColor);
    } else {
      // プリセット背景色
      switch (bgType) {
        case "night":
          bgColor = "#172554";
          break;
        case "mystic":
          bgColor = "#581c87"; // purple-900
          break;
        case "forest":
          bgColor = "#14532d"; // green-900
          break;
        case "blood":
          bgColor = "#7f1d1d"; // red-900
          break;
        case "paper":
          bgColor = "#fef3c7";
          break;
        case "stone":
          bgColor = "#4b5563";
          break;
        default: // dark
          bgColor = "#1E1E2A"; 
      }
    }
    
    // 背景色を適用
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // プライマリカラーの決定
    primaryColor = getPrimaryColor(config, theme);
    
  } catch (error) {
    console.error("カラー設定エラー:", error);
    // エラー時はデフォルト値を使用（明るめの背景色）
    ctx.fillStyle = "#1E1E2A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    primaryColor = "#FFD700";
  }
  
  // 特定の背景タイプに対する追加の処理
  if (bgType === "paper") {
    // For light backgrounds, add a contrasting circle
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 残りの要素を描画
  drawRemainingElements(ctx, centerX, centerY, radius, config, primaryColor);
}

// プライマリカラーを決定する関数
function getPrimaryColor(config: CircleConfig, theme?: CircleTheme): string {
  // 優先順位を修正: カスタムカラー > テーマ > プリセット
  if (config.useCustomColors && config.customPrimaryColor) {
    return config.customPrimaryColor;
  } else if (theme) {
    return theme.primaryColor;
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

// 残りの要素を描画する関数
function drawRemainingElements(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  config: CircleConfig,
  primaryColor: string
): void {

  // Draw outer circle
  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Draw second outer circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.95, 0, Math.PI * 2);
  ctx.stroke();

  // Draw geometric pattern
  drawGeometricPattern(
    ctx,
    centerX,
    centerY,
    radius,
    config.complexity,
    config.style,
    primaryColor
  );

  // Draw symbols
  drawSymbols(
    ctx,
    centerX,
    centerY,
    radius,
    config.complexity,
    config.symbolDensity,
    config.style,
    primaryColor
  );

  // Draw text if enabled
  if (config.showText) {
    drawRunicText(
      ctx,
      centerX,
      centerY,
      radius,
      config.style,
      primaryColor
    );
  }

  // Apply animation effects if enabled (this would be handled on the frontend)
  // Animation is handled by CSS in the CircleCanvas component
}

// Helper function to add subtle glow effect
export function addGlowEffect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void {
  const gradient = ctx.createRadialGradient(
    x,
    y,
    radius * 0.7,
    x,
    y,
    radius * 1.2
  );
  gradient.addColorStop(0, `${color}00`);
  gradient.addColorStop(0.5, `${color}10`);
  gradient.addColorStop(1, `${color}00`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
  ctx.fill();
}
