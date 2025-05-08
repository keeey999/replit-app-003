import { RefObject, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CircleCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  isGenerating: boolean;
  onDownload: () => void;
  onShare: () => void;
}

export default function CircleCanvas({ 
  canvasRef, 
  isGenerating, 
  onDownload, 
  onShare 
}: CircleCanvasProps) {
  const { toast } = useToast();
  
  // バックアップダウンロード機能
  const handleDirectDownload = useCallback(() => {
    try {
      if (!canvasRef.current) return;
      
      // Get the canvas data
      const dataUrl = canvasRef.current.toDataURL('image/png');
      
      // Create a new window and open the image
      const newWindow = window.open();
      if (!newWindow) {
        toast({
          title: "エラー",
          description: "新しいウィンドウを開けませんでした。ポップアップブロックを確認してください。",
          variant: "destructive",
        });
        return;
      }
      
      newWindow.document.write(`
        <html>
          <head>
            <title>AlcheMaker 錬成陣</title>
            <style>
              body { margin: 0; background: #1a1a1a; display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100vh; }
              img { max-width: 100%; }
              p { color: white; font-family: sans-serif; margin-top: 20px; }
              button { background: #8844ee; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" alt="AlcheMaker 錬成陣" />
            <p>右クリックして「名前を付けて画像を保存」を選択してください</p>
            <button onclick="window.print()">印刷する</button>
          </body>
        </html>
      `);
      
      toast({
        title: "画像を表示しました",
        description: "新しいウィンドウで画像を表示しています。右クリックして保存できます。",
      });
    } catch (error) {
      console.error("直接ダウンロードエラー:", error);
      // Call the original download function as fallback
      onDownload();
    }
  }, [canvasRef, onDownload, toast]);
  return (
    <div className="bg-card-gradient rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 relative min-h-[350px] md:min-h-[500px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,rgba(180,120,255,0.2)_0%,rgba(18,18,18,0)_70%)]"></div>
        </div>
        
        {/* Decorative spinning elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90%] h-[90%] border border-primary/30 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[95%] h-[95%] border border-secondary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
      
      {/* Canvas Container */}
      <div className="relative z-10">
        <canvas 
          ref={canvasRef}
          width={500} 
          height={500} 
          className="max-w-full h-auto bg-transparent"
        />
      </div>
      
      {/* Canvas Overlay Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button
          onClick={handleDirectDownload}
          className="bg-primary hover:bg-primary/80 text-white flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">ダウンロード</span>
        </Button>
        
        <Button
          onClick={onShare}
          className="bg-accent hover:bg-accent/80 text-black flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">共有</span>
        </Button>
      </div>
      
      {/* Generation Status */}
      <div 
        className={`absolute top-4 left-4 bg-background/80 px-3 py-1 rounded text-sm flex items-center space-x-2 transition-opacity duration-300 ${
          isGenerating ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-pulse h-2 w-2 rounded-full bg-secondary"></div>
        <span>生成中...</span>
      </div>
    </div>
  );
}
