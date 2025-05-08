// Runic text generator for transmutation circles
export function drawRunicText(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  style: string,
  color: string
): void {
  ctx.fillStyle = color;
  
  let text = "";
  
  // Choose text based on style
  switch (style) {
    case "classic":
      text = "EQUIVALENT EXCHANGE • HUMANKIND CANNOT GAIN ANYTHING WITHOUT GIVING SOMETHING IN RETURN •";
      break;
    case "elemental":
      text = "EARTH • AIR • FIRE • WATER • SPIRIT • MATTER • ENERGY • TRANSFORMATION • BALANCE •";
      break;
    case "runic":
      text = "ANSUZ • URUZ • THURISAZ • KENAZ • RAIDO • GEBO • SOWILO • HAGALAZ • TIWAZ • BERKANA • ALGIZ •";
      break;
    case "celestial":
      text = "SUN • MOON • MERCURY • VENUS • MARS • JUPITER • SATURN • CELESTIAL ORDER • COSMIC BALANCE •";
      break;
    case "modern":
      text = "MATTER • ENERGY • TIME • SPACE • ENTROPY • ORDER • CHAOS • CREATION • DESTRUCTION • UNITY •";
      break;
    default:
      text = "EQUIVALENT EXCHANGE • HUMANKIND CANNOT GAIN ANYTHING WITHOUT GIVING SOMETHING IN RETURN •";
  }
  
  // Calculate font size based on radius
  const fontSize = Math.floor(radius * 0.05);
  
  // Draw text along the outer circle
  drawTextAlongCircle(
    ctx,
    text,
    centerX,
    centerY,
    radius * 0.9, // Text radius
    fontSize,
    "Cinzel, serif"
  );
  
  // Add inner text circle for more complex patterns
  if (style === "runic" || style === "celestial") {
    // Use Japanese text for runic style
    const innerText = style === "runic"
      ? "守護の印 • 力の源 • 創造の力 • 変革の理 • 反応の環 • 等価交換 •"
      : "AS ABOVE • SO BELOW • THE MACROCOSM • THE MICROCOSM • HARMONY • BALANCE •";
    
    drawTextAlongCircle(
      ctx,
      innerText,
      centerX,
      centerY,
      radius * 0.45, // Inner text radius
      fontSize * 0.8,
      style === "runic" ? "'Noto Sans JP', sans-serif" : "Cinzel, serif"
    );
  }
}

// Function to draw text along a circular path
function drawTextAlongCircle(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  fontSize: number,
  fontFamily: string
): void {
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  const charCount = text.length;
  const anglePerChar = (Math.PI * 2) / charCount;
  
  for (let i = 0; i < charCount; i++) {
    const char = text[i];
    const angle = i * anglePerChar - Math.PI / 2; // Start at top
    
    ctx.save();
    ctx.translate(
      centerX + radius * Math.cos(angle),
      centerY + radius * Math.sin(angle)
    );
    ctx.rotate(angle + Math.PI / 2); // Rotate text to follow circle
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }
}

// Generate random pseudo-runic text
export function generateRunicText(length: number): string {
  const runes = [
    "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ",
    "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ",
    "ᛚ", "ᛜ", "ᛞ", "ᛟ"
  ];
  
  const alchemicalCharacters = [
    "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉",
    "🜊", "🜋", "🜌", "🜍", "🜎", "🜏", "🜐", "🜑", "🜒", "🜓",
    "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝",
    "🜞", "🜟", "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧",
    "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯", "🜰", "🜱",
    "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻",
    "🜼", "🜽", "🜾", "🜿"
  ];
  
  // Combine both character sets
  const allChars = [...runes, ...alchemicalCharacters];
  
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    result += allChars[randomIndex];
  }
  
  return result;
}
