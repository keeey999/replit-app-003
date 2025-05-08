import { useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { setTheme } = useNextTheme();
  
  // 常に固定テーマを使用
  useEffect(() => {
    setTheme("dark"); // ダークテーマに固定
  }, [setTheme]);
  
  // テーマ切り替え関数は空の関数を返す
  return { 
    theme: "dark", 
    setTheme: () => {}, // 何もしない関数
    systemTheme: "dark" 
  };
}
