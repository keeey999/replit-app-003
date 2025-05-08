// Geometric patterns for transmutation circles
export function drawGeometricPattern(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number,
  style: string,
  color: string
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  // Inner circle - common to all designs
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
  ctx.stroke();

  // Apply different patterns based on style and complexity
  switch (style) {
    case "classic": // FMA style
      drawClassicPattern(ctx, centerX, centerY, radius, complexity);
      break;
    case "elemental":
      drawElementalPattern(ctx, centerX, centerY, radius, complexity);
      break;
    case "runic":
      drawRunicPattern(ctx, centerX, centerY, radius, complexity);
      break;
    case "celestial":
      drawCelestialPattern(ctx, centerX, centerY, radius, complexity);
      break;
    case "modern":
      drawModernPattern(ctx, centerX, centerY, radius, complexity);
      break;
    default:
      drawClassicPattern(ctx, centerX, centerY, radius, complexity);
  }
}

// Classic FMA style pattern
function drawClassicPattern(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number
): void {
  // Triangle (level 2+)
  if (complexity >= 2) {
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const angle = (i * (2 * Math.PI) / 3) - Math.PI / 2;
      const x = centerX + radius * 0.8 * Math.cos(angle);
      const y = centerY + radius * 0.8 * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Square (level 3+)
  if (complexity >= 3) {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * (2 * Math.PI) / 4) - Math.PI / 4;
      const x = centerX + radius * 0.7 * Math.cos(angle);
      const y = centerY + radius * 0.7 * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Pentagram (level 4+)
  if (complexity >= 4) {
    drawPentagram(ctx, centerX, centerY, radius * 0.75);
    
    // Connect to inner circle
    for (let i = 0; i < 5; i++) {
      const angle = (i * (2 * Math.PI) / 5) - Math.PI / 2;
      const outerX = centerX + radius * 0.75 * Math.cos(angle);
      const outerY = centerY + radius * 0.75 * Math.sin(angle);
      const innerX = centerX + radius * 0.3 * Math.cos(angle);
      const innerY = centerY + radius * 0.3 * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(outerX, outerY);
      ctx.lineTo(innerX, innerY);
      ctx.stroke();
    }
  }

  // Hexagram (level 5)
  if (complexity >= 5) {
    drawHexagram(ctx, centerX, centerY, radius * 0.85);
    
    // Additional inner patterns
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Radial lines
    for (let i = 0; i < 12; i++) {
      const angle = i * Math.PI / 6;
      ctx.beginPath();
      ctx.moveTo(centerX + radius * 0.4 * Math.cos(angle), centerY + radius * 0.4 * Math.sin(angle));
      ctx.lineTo(centerX + radius * 0.6 * Math.cos(angle), centerY + radius * 0.6 * Math.sin(angle));
      ctx.stroke();
    }
  }
}

// Elemental style pattern
function drawElementalPattern(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number
): void {
  // Four elements pattern
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw triangles representing the four elements
  const elementCount = Math.min(complexity + 1, 4);
  for (let i = 0; i < elementCount; i++) {
    const angle = (i * (2 * Math.PI) / 4);
    
    ctx.save();
    ctx.translate(
      centerX + radius * 0.7 * Math.cos(angle),
      centerY + radius * 0.7 * Math.sin(angle)
    );
    ctx.rotate(angle);
    
    // Draw element symbol (simplified)
    const size = radius * 0.15;
    switch (i % 4) {
      case 0: // Fire (upward triangle)
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, size);
        ctx.lineTo(-size, size);
        ctx.closePath();
        ctx.stroke();
        break;
        
      case 1: // Water (downward triangle)
        ctx.beginPath();
        ctx.moveTo(0, size);
        ctx.lineTo(size, -size);
        ctx.lineTo(-size, -size);
        ctx.closePath();
        ctx.stroke();
        break;
        
      case 2: // Air (upward triangle with line)
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
        
      case 3: // Earth (downward triangle with line)
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
    }
    
    ctx.restore();
  }
  
  if (complexity >= 3) {
    // Connect elements with lines
    for (let i = 0; i < elementCount; i++) {
      const angle1 = (i * (2 * Math.PI) / 4);
      const angle2 = ((i + 1) % 4) * (2 * Math.PI) / 4;
      
      const x1 = centerX + radius * 0.7 * Math.cos(angle1);
      const y1 = centerY + radius * 0.7 * Math.sin(angle1);
      const x2 = centerX + radius * 0.7 * Math.cos(angle2);
      const y2 = centerY + radius * 0.7 * Math.sin(angle2);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
  
  if (complexity >= 4) {
    // Add outer circle with notches
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85, 0, Math.PI * 2);
    ctx.stroke();
    
    // Add notches
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      const outerX = centerX + radius * 0.85 * Math.cos(angle);
      const outerY = centerY + radius * 0.85 * Math.sin(angle);
      const innerX = centerX + radius * 0.8 * Math.cos(angle);
      const innerY = centerY + radius * 0.8 * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(outerX, outerY);
      ctx.lineTo(innerX, innerY);
      ctx.stroke();
    }
  }
  
  if (complexity === 5) {
    // Complete the pattern with more connections
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.stroke();
    
    // Cross in center
    ctx.beginPath();
    ctx.moveTo(centerX - radius * 0.2, centerY);
    ctx.lineTo(centerX + radius * 0.2, centerY);
    ctx.moveTo(centerX, centerY - radius * 0.2);
    ctx.lineTo(centerX, centerY + radius * 0.2);
    ctx.stroke();
  }
}

// Runic style pattern
function drawRunicPattern(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number
): void {
  // Base circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
  ctx.stroke();
  
  // Runic crosses at different angles
  const runeCount = complexity * 2;
  for (let i = 0; i < runeCount; i++) {
    const angle = (i * (2 * Math.PI) / runeCount);
    const x = centerX + radius * 0.75 * Math.cos(angle);
    const y = centerY + radius * 0.75 * Math.sin(angle);
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    // Draw rune (simplified)
    const size = radius * 0.08;
    
    // Different rune for each position
    switch (i % 5) {
      case 0: // Tiwaz (arrow)
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.5);
        ctx.lineTo(0, size * 1.5);
        ctx.moveTo(-size, -size * 0.5);
        ctx.lineTo(0, -size * 1.5);
        ctx.lineTo(size, -size * 0.5);
        ctx.stroke();
        break;
        
      case 1: // Algiz (protection)
        ctx.beginPath();
        ctx.moveTo(0, size * 1.5);
        ctx.lineTo(0, -size * 0.5);
        ctx.moveTo(0, -size * 0.5);
        ctx.lineTo(-size, -size * 1.5);
        ctx.moveTo(0, -size * 0.5);
        ctx.lineTo(size, -size * 1.5);
        ctx.stroke();
        break;
        
      case 2: // Ehwaz (horse)
        ctx.beginPath();
        ctx.moveTo(-size * 0.5, -size * 1.5);
        ctx.lineTo(-size * 0.5, size * 1.5);
        ctx.moveTo(size * 0.5, -size * 1.5);
        ctx.lineTo(size * 0.5, size * 1.5);
        ctx.moveTo(-size * 0.5, 0);
        ctx.lineTo(size * 0.5, 0);
        ctx.stroke();
        break;
        
      case 3: // Dagaz (day)
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
        
      case 4: // Hagalaz (hail)
        ctx.beginPath();
        ctx.moveTo(-size * 0.5, -size * 1.5);
        ctx.lineTo(-size * 0.5, size * 1.5);
        ctx.moveTo(-size * 0.5, 0);
        ctx.lineTo(size * 0.5, -size * 1.5);
        ctx.lineTo(size * 0.5, size * 1.5);
        ctx.stroke();
        break;
    }
    
    ctx.restore();
  }
  
  if (complexity >= 3) {
    // Inner pattern
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * (2 * Math.PI) / 4);
      const r = radius * 0.3;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
  
  if (complexity >= 4) {
    // Binding rune in center
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius * 0.2);
    ctx.lineTo(centerX, centerY + radius * 0.2);
    ctx.moveTo(centerX - radius * 0.1, centerY - radius * 0.15);
    ctx.lineTo(centerX + radius * 0.1, centerY - radius * 0.15);
    ctx.moveTo(centerX - radius * 0.1, centerY + radius * 0.15);
    ctx.lineTo(centerX + radius * 0.1, centerY + radius * 0.15);
    ctx.stroke();
  }
  
  if (complexity === 5) {
    // Outer binding circle with notches
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85, 0, Math.PI * 2);
    ctx.stroke();
    
    // Add notches with runes
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      const x = centerX + radius * 0.85 * Math.cos(angle);
      const y = centerY + radius * 0.85 * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.05, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

// Celestial style pattern
function drawCelestialPattern(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number
): void {
  // Sun in center
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
  ctx.stroke();
  
  // Rays from center
  const rayCount = complexity * 4;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i * (2 * Math.PI) / rayCount);
    
    ctx.beginPath();
    ctx.moveTo(centerX + radius * 0.2 * Math.cos(angle), centerY + radius * 0.2 * Math.sin(angle));
    ctx.lineTo(centerX + radius * 0.5 * Math.cos(angle), centerY + radius * 0.5 * Math.sin(angle));
    ctx.stroke();
  }
  
  // Moon orbit
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.65, 0, Math.PI * 2);
  ctx.stroke();
  
  // Planets
  const planetCount = Math.min(complexity + 2, 7);
  for (let i = 0; i < planetCount; i++) {
    const angle = (i * (2 * Math.PI) / planetCount);
    const x = centerX + radius * 0.65 * Math.cos(angle);
    const y = centerY + radius * 0.65 * Math.sin(angle);
    
    // Draw planet
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.06, 0, Math.PI * 2);
    ctx.stroke();
    
    if (complexity >= 3) {
      // Draw moon for each planet
      const moonX = x + radius * 0.1 * Math.cos(angle + Math.PI/4);
      const moonY = y + radius * 0.1 * Math.sin(angle + Math.PI/4);
      
      ctx.beginPath();
      ctx.arc(moonX, moonY, radius * 0.02, 0, Math.PI * 2);
      ctx.stroke();
      
      // Moon orbit
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.1, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  
  if (complexity >= 4) {
    // Zodiac ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85, 0, Math.PI * 2);
    ctx.stroke();
    
    // Zodiac segments
    for (let i = 0; i < 12; i++) {
      const angle1 = i * Math.PI / 6;
      const angle2 = (i + 1) * Math.PI / 6;
      
      // Arc between segments
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.85, angle1, angle2);
      ctx.stroke();
      
      // Radial line
      ctx.beginPath();
      ctx.moveTo(centerX + radius * 0.85 * Math.cos(angle1), centerY + radius * 0.85 * Math.sin(angle1));
      ctx.lineTo(centerX + radius * 0.78 * Math.cos(angle1), centerY + radius * 0.78 * Math.sin(angle1));
      ctx.stroke();
    }
  }
  
  if (complexity === 5) {
    // Star pattern connecting planets
    for (let i = 0; i < planetCount; i++) {
      const angle1 = (i * (2 * Math.PI) / planetCount);
      const angle2 = ((i + 2) % planetCount) * (2 * Math.PI) / planetCount;
      
      const x1 = centerX + radius * 0.65 * Math.cos(angle1);
      const y1 = centerY + radius * 0.65 * Math.sin(angle1);
      const x2 = centerX + radius * 0.65 * Math.cos(angle2);
      const y2 = centerY + radius * 0.65 * Math.sin(angle2);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
}

// Modern style pattern
function drawModernPattern(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  complexity: number
): void {
  // Center pattern
  ctx.beginPath();
  const innerCircleRadius = radius * 0.3;
  ctx.arc(centerX, centerY, innerCircleRadius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Grid pattern
  const gridSize = Math.max(3, complexity + 1);
  const cellSize = innerCircleRadius * 2 / gridSize;
  
  ctx.save();
  ctx.translate(centerX - innerCircleRadius, centerY - innerCircleRadius);
  
  for (let i = 0; i <= gridSize; i++) {
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(innerCircleRadius * 2, i * cellSize);
    ctx.stroke();
    
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, innerCircleRadius * 2);
    ctx.stroke();
  }
  
  ctx.restore();
  
  // Outer geometric shape
  const sides = complexity + 3;
  
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = (i * (2 * Math.PI) / sides);
    const x = centerX + radius * 0.8 * Math.cos(angle);
    const y = centerY + radius * 0.8 * Math.sin(angle);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();
  
  if (complexity >= 3) {
    // Connect outer shape to center
    for (let i = 0; i < sides; i++) {
      const angle = (i * (2 * Math.PI) / sides);
      const outerX = centerX + radius * 0.8 * Math.cos(angle);
      const outerY = centerY + radius * 0.8 * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
  }
  
  if (complexity >= 4) {
    // Add nodes at intersections
    const nodeRadius = radius * 0.02;
    
    for (let i = 0; i < sides; i++) {
      const angle = (i * (2 * Math.PI) / sides);
      const x = centerX + radius * 0.8 * Math.cos(angle);
      const y = centerY + radius * 0.8 * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Circle connecting the nodes
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  if (complexity === 5) {
    // Add inner connecting structure
    const innerSides = Math.floor(sides / 2);
    
    ctx.beginPath();
    for (let i = 0; i < innerSides; i++) {
      const angle = (i * (2 * Math.PI) / innerSides);
      const x = centerX + radius * 0.4 * Math.cos(angle);
      const y = centerY + radius * 0.4 * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    
    // Diagonal grid overlay
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.PI / 4);
    
    const gridHalfSize = innerCircleRadius * 0.7;
    
    for (let i = -2; i <= 2; i++) {
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(-gridHalfSize, i * gridHalfSize / 2);
      ctx.lineTo(gridHalfSize, i * gridHalfSize / 2);
      ctx.stroke();
      
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * gridHalfSize / 2, -gridHalfSize);
      ctx.lineTo(i * gridHalfSize / 2, gridHalfSize);
      ctx.stroke();
    }
    
    ctx.restore();
  }
}

// Helper functions for shapes

// Draw a pentagram
function drawPentagram(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  ctx.beginPath();
  
  for (let i = 0; i < 5; i++) {
    // Connect every second point to create the star
    const angle = ((i * 2) % 5) * (2 * Math.PI / 5) - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.closePath();
  ctx.stroke();
}

// Draw a hexagram (Star of David)
function drawHexagram(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  // First triangle
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const angle = (i * (2 * Math.PI) / 3);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  
  // Second triangle
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const angle = (i * (2 * Math.PI) / 3) + Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}
