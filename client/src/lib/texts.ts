// 錬成陣のテキスト生成
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
  
  // スタイルに基づいてテキストを選択
  switch (style) {
    case "classic":
      text = "神秘なる力 • 調和と均衡 • 知恵と理解 • 魂の成長 • 内なる変化 • 光の回廊 • 真理の探求 •";
      break;
    case "elemental":
      text = "地 • 風 • 火 • 水 • 霊 • 物質 • エネルギー • 変換 • バランス •";
      break;
    case "runic":
      text = "叡智 • 力 • 守護 • 創造 • 運命 • 贈与 • 太陽 • 変化 • 勝利 • 成長 • 保護 •";
      break;
    case "celestial":
      text = "太陽 • 月 • 水星 • 金星 • 火星 • 木星 • 土星 • 天体秩序 • 宇宙調和 •";
      break;
    case "modern":
      text = "物質 • エネルギー • 時間 • 空間 • エントロピー • 秩序 • 混沌 • 創造 • 破壊 • 統一 •";
      break;
    default:
      text = "神秘なる力 • 調和と均衡 • 知恵と理解 • 魂の成長 • 内なる変化 • 光の回廊 • 真理の探求 •";
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
  
  // 複雑なパターンには内側のテキスト円を追加
  if (style === "runic" || style === "celestial") {
    // スタイルに基づいて日本語テキストを使用
    const innerText = style === "runic"
      ? "守護の印 • 力の源 • 創造の力 • 変革の理 • 反応の環 • 変容の法則 •"
      : "上なるもの • 下なるもの • 大宇宙 • 小宇宙 • 調和 • バランス •";
    
    drawTextAlongCircle(
      ctx,
      innerText,
      centerX,
      centerY,
      radius * 0.45, // 内側テキストの半径
      fontSize * 0.8,
      "'Noto Sans JP', sans-serif"
    );
  }
}

// 円形に沿ってテキストを描画する関数
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
    const angle = i * anglePerChar - Math.PI / 2; // 上部から開始
    
    ctx.save();
    ctx.translate(
      centerX + radius * Math.cos(angle),
      centerY + radius * Math.sin(angle)
    );
    ctx.rotate(angle + Math.PI / 2); // テキストを円に沿って回転
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }
}

// ランダムな神秘文字テキストを生成
export function generateRunicText(length: number): string {
  // ルーン文字
  const runes = [
    "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ",
    "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ",
    "ᛚ", "ᛜ", "ᛞ", "ᛟ"
  ];
  
  // 錬金術シンボル
  const alchemicalCharacters = [
    "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉",
    "🜊", "🜋", "🜌", "🜍", "🜎", "🜏", "🜐", "🜑", "🜒", "🜓",
    "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝",
    "🜞", "🜟", "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧",
    "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯", "🜰", "🜱",
    "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻",
    "🜼", "🜽", "🜾", "🜿"
  ];
  
  // 両方の文字セットを組み合わせる
  const allChars = [...runes, ...alchemicalCharacters];
  
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    result += allChars[randomIndex];
  }
  
  return result;
}
