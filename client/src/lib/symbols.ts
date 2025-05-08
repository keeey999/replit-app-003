// Symbols and elements for transmutation circles
export function drawSymbols(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number,
  density: number,
  style: string,
  color: string
): void {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  
  const symbolCount = Math.min(complexity + density + 1, 12);
  
  for (let i = 0; i < symbolCount; i++) {
    const angle = (i * (2 * Math.PI) / symbolCount);
    const x = centerX + radius * 0.8 * Math.cos(angle);
    const y = centerY + radius * 0.8 * Math.sin(angle);
    
    // Draw symbol circle
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.07, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw symbol inside (based on style and position)
    let symbolType: number;
    
    switch (style) {
      case "elemental":
        symbolType = i % 8; // More elemental symbols
        break;
      case "runic":
        symbolType = 8 + (i % 8); // Runic symbols (8-15)
        break;
      case "celestial":
        symbolType = 16 + (i % 8); // Celestial symbols (16-23)
        break;
      case "modern":
        symbolType = 24 + (i % 8); // Modern symbols (24-31)
        break;
      default: // classic
        symbolType = i % 20; // Mix of all
        break;
    }
    
    drawAlchemicalSymbol(ctx, x, y, radius * 0.05, symbolType);
  }
}

function drawAlchemicalSymbol(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  symbolIndex: number
): void {
  ctx.save();
  ctx.translate(x, y);
  
  switch (symbolIndex % 32) {
    case 0: // Fire (triangle)
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, size);
      ctx.lineTo(-size, size);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 1: // Water (inverted triangle)
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size, -size);
      ctx.lineTo(-size, -size);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 2: // Air (triangle with line)
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, size);
      ctx.lineTo(-size, size);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.7, 0);
      ctx.lineTo(size * 0.7, 0);
      ctx.stroke();
      break;
      
    case 3: // Earth (inverted triangle with line)
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(size, -size);
      ctx.lineTo(-size, -size);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.7, 0);
      ctx.lineTo(size * 0.7, 0);
      ctx.stroke();
      break;
      
    case 4: // Sun (circle with dot)
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 5: // Mercury (circle with horns and cross)
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(0, -size * 1.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.5, -size * 1.2);
      ctx.lineTo(size * 0.5, -size * 1.2);
      ctx.stroke();
      break;
      
    case 6: // Salt (circle with line)
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      break;
      
    case 7: // Sulfur (triangle on cross)
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.2);
      ctx.lineTo(0, size * 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size, -size * 0.8);
      ctx.lineTo(size, -size * 0.8);
      ctx.stroke();
      // Triangle
      ctx.beginPath();
      ctx.moveTo(0, size * 0.2);
      ctx.lineTo(-size * 0.7, size * 1.2);
      ctx.lineTo(size * 0.7, size * 1.2);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 8: // Copper/Venus (circle with cross below)
      ctx.beginPath();
      ctx.arc(0, -size * 0.5, size * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, size * 0.2);
      ctx.lineTo(0, size * 1.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.7, size * 0.8);
      ctx.lineTo(size * 0.7, size * 0.8);
      ctx.stroke();
      break;
      
    case 9: // Iron/Mars (circle with arrow)
      ctx.beginPath();
      ctx.arc(0, -size * 0.5, size * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      // Arrow from circle
      ctx.beginPath();
      ctx.moveTo(0, size * 0.2);
      ctx.lineTo(size * 0.7, size * 1.2);
      ctx.moveTo(0, size * 0.2);
      ctx.lineTo(-size * 0.3, size);
      ctx.moveTo(0, size * 0.2);
      ctx.lineTo(size * 0.3, size);
      ctx.stroke();
      break;
      
    case 10: // Silver/Luna (crescent)
      ctx.beginPath();
      ctx.arc(size * 0.4, 0, size, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(-size * 0.4, 0, size, Math.PI * 1.5, Math.PI * 0.5, true);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 11: // Tin/Jupiter (crescent with cross)
      ctx.beginPath();
      ctx.moveTo(-size, size * 0.3);
      ctx.lineTo(size, size * 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, -size);
      ctx.lineTo(-size * 0.4, size * 1.5);
      ctx.stroke();
      break;
      
    case 12: // Tiwaz rune (arrow up)
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.5);
      ctx.lineTo(0, size * 1.5);
      ctx.moveTo(-size, -size * 0.5);
      ctx.lineTo(0, -size * 1.5);
      ctx.lineTo(size, -size * 0.5);
      ctx.stroke();
      break;
      
    case 13: // Algiz rune (protection)
      ctx.beginPath();
      ctx.moveTo(0, size * 1.5);
      ctx.lineTo(0, -size * 0.5);
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(-size, -size * 1.5);
      ctx.moveTo(0, -size * 0.5);
      ctx.lineTo(size, -size * 1.5);
      ctx.stroke();
      break;
      
    case 14: // Dagaz rune (day/awakening)
      ctx.beginPath();
      ctx.moveTo(-size, -size);
      ctx.lineTo(size, -size);
      ctx.lineTo(size, size);
      ctx.lineTo(-size, size);
      ctx.lineTo(-size, -size);
      ctx.moveTo(-size, size);
      ctx.lineTo(size, -size);
      ctx.stroke();
      break;
      
    case 15: // Uruz rune (strength)
      ctx.beginPath();
      ctx.moveTo(-size, -size);
      ctx.lineTo(-size, size);
      ctx.lineTo(size, 0);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 16: // Star symbol
      for (let i = 0; i < 5; i++) {
        const angle = i * Math.PI * 0.4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size * Math.cos(angle), size * Math.sin(angle));
        ctx.stroke();
      }
      break;
      
    case 17: // Moon phases
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-size * 0.3, 0, size * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      break;
      
    case 18: // Saturn symbol
      ctx.beginPath();
      ctx.moveTo(-size, size);
      ctx.lineTo(size, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.lineTo(0, -size);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -size * 0.3, size * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      break;
      
    case 19: // Jupiter symbol
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-size * 0.5, -size * 0.5, size * 0.4, Math.PI * 0.5, Math.PI * 1.5);
      ctx.stroke();
      break;
      
    case 20: // Square and circle
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(-size * 0.5, -size * 0.5, size, size);
      ctx.stroke();
      break;
      
    case 21: // Squared cross
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(-size * 0.3, -size * 0.3, size * 0.6, size * 0.6);
      ctx.stroke();
      break;
      
    case 22: // Spiral
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const radius = size * (1 - i * 0.2);
        const startAngle = i * Math.PI * 0.5;
        const endAngle = (i + 1) * Math.PI * 0.5;
        ctx.arc(0, 0, radius, startAngle, endAngle);
      }
      ctx.stroke();
      break;
      
    case 23: // Atom symbol
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const angle = i * Math.PI / 1.5;
        ctx.ellipse(0, 0, size, size * 0.4, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
      
    case 24: // Diamond
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size, 0);
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 25: // Hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3;
        const x = size * Math.cos(angle);
        const y = size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      break;
      
    case 26: // Three interlocking circles
      for (let i = 0; i < 3; i++) {
        const angle = i * Math.PI * 2 / 3;
        const x = size * 0.5 * Math.cos(angle);
        const y = size * 0.5 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
      
    case 27: // Grid pattern
      ctx.beginPath();
      ctx.rect(-size, -size, size * 2, size * 2);
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      break;
      
    case 28: // Circuit pattern
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      for (let i = 0; i < 4; i++) {
        const angle = i * Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(size * 0.3 * Math.cos(angle), size * 0.3 * Math.sin(angle));
        ctx.lineTo(size * Math.cos(angle), size * Math.sin(angle));
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(size * Math.cos(angle), size * Math.sin(angle), size * 0.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
      
    case 29: // DNA helix suggestion
      ctx.beginPath();
      ctx.moveTo(-size, -size);
      ctx.bezierCurveTo(
        -size * 0.5, 0,
        size * 0.5, 0,
        size, size
      );
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-size, size);
      ctx.bezierCurveTo(
        -size * 0.5, 0,
        size * 0.5, 0,
        size, -size
      );
      ctx.stroke();
      
      // Cross connections
      for (let i = -1; i <= 1; i += 0.5) {
        ctx.beginPath();
        ctx.moveTo(-size * 0.5 + i * size, -size * 0.5 * i);
        ctx.lineTo(size * 0.5 + i * size, size * 0.5 * i);
        ctx.stroke();
      }
      break;
      
    case 30: // Triangle with eye
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, size);
      ctx.lineTo(-size, size);
      ctx.closePath();
      ctx.stroke();
      
      // Eye
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.5, size * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Pupil
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 31: // Infinity symbol
      ctx.beginPath();
      ctx.moveTo(-size * 0.5, 0);
      ctx.bezierCurveTo(
        -size * 0.5, -size,
        size * 0.5, -size,
        size * 0.5, 0
      );
      ctx.bezierCurveTo(
        size * 0.5, size,
        -size * 0.5, size,
        -size * 0.5, 0
      );
      ctx.stroke();
      break;
  }
  
  ctx.restore();
}
