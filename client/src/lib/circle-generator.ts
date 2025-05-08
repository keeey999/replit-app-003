import { CircleConfig } from "@shared/schema";
import { drawGeometricPattern } from "./shapes";
import { drawSymbols } from "./symbols";
import { drawRunicText } from "./texts";

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

  // Set color based on the color scheme
  let primaryColor = "#FFD700"; // Gold by default
  switch (config.colorScheme) {
    case "azure":
      primaryColor = "#3B82F6";
      break;
    case "crimson":
      primaryColor = "#E11D48";
      break;
    case "emerald":
      primaryColor = "#10B981";
      break;
    case "purple":
      primaryColor = "#9333EA";
      break;
    default:
      primaryColor = "#FFD700"; // Gold
  }

  // Background
  ctx.fillStyle = "#121212";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

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
