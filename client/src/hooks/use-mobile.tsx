import { useState, useEffect, useCallback } from "react";

// モバイルデバイスかどうかを判定するhook
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileDevices = [
        'android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'
      ];
      
      // モバイルデバイスのユーザーエージェントを含むか、画面幅が768px以下ならモバイルとみなす
      const isMobileDevice = mobileDevices.some(device => userAgent.includes(device)) || 
                           window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice);
    };

    // 初期チェック
    checkMobile();
    
    // リサイズ時に再チェック
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

// メディアクエリをreactiveに監視するhook
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // 初期値設定
    setMatches(mediaQuery.matches);
    
    // 変更検知用のリスナー
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // メディアクエリ変更の監視を開始
    mediaQuery.addEventListener('change', handleChange);
    
    // クリーンアップ
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// スワイプジェスチャーを検出するhook
export function useSwipeGesture(
  onSwipeLeft: () => void = () => {}, 
  onSwipeRight: () => void = () => {},
  minDistance: number = 50,  // スワイプと認識する最小距離
  maxVerticalOffset: number = 100  // 許容される縦方向のずれ
) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // タッチ開始時の処理
  const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    setIsSwiping(true);
  }, []);

  // タッチ移動時の処理
  const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
    // タッチ開始位置がなければ何もしない
    if (!touchStart || !isSwiping) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchStart.x - touchEndX;
    const deltaY = Math.abs(touchStart.y - touchEndY);

    // 縦方向の移動が大きすぎる場合はスクロールと判定してスワイプ処理をキャンセル
    if (deltaY > maxVerticalOffset) {
      setIsSwiping(false);
      return;
    }

    // 左右のスワイプを検出
    if (Math.abs(deltaX) > minDistance) {
      if (deltaX > 0) {
        // 左スワイプ
        onSwipeLeft();
      } else {
        // 右スワイプ
        onSwipeRight();
      }
      // 一度スワイプ検出したら連続で発火しないようにリセット
      setIsSwiping(false);
      setTouchStart(null);
    }
  }, [touchStart, isSwiping, onSwipeLeft, onSwipeRight, minDistance, maxVerticalOffset]);

  // タッチ終了時の処理
  const handleTouchEnd = useCallback(() => {
    setIsSwiping(false);
    setTouchStart(null);
  }, []);

  // スワイプジェスチャー用のイベントハンドラを返す
  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}