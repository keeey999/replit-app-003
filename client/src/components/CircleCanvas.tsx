import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

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
  return (
    <div className="bg-card-gradient rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 relative min-h-[400px] md:min-h-[650px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,rgba(180,120,255,0.35)_0%,rgba(18,18,18,0)_70%)]"></div>
        </div>
        
        {/* Decorative spinning elements - placed to be partially visible around the canvas */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 md:block hidden">
          <div className="w-[120%] h-[120%] border-2 border-primary/30 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[115%] h-[115%] border-2 border-secondary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '18s' }}></div>
          <div className="absolute w-[110%] h-[110%] border border-accent/30 rounded-full animate-spin-slow" style={{ animationDelay: '-2s', animationDuration: '20s' }}></div>
          <div className="absolute w-[105%] h-[105%] border border-secondary/20 rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDelay: '-5s' }}></div>
        </div>
        
        {/* Mobile-optimized decorative elements - simpler, better performance */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 md:hidden block">
          <div className="w-[120%] h-[120%] border-2 border-primary/30 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[110%] h-[110%] border border-secondary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
        </div>
      </div>
      
      {/* Canvas Container - with circular clip to show background effects */}
      <div className="relative z-10 rounded-full overflow-hidden">
        <canvas 
          ref={canvasRef}
          width={600} 
          height={600} 
          className="max-w-full h-auto bg-transparent"
          style={{ 
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)"
          }}
        />
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
