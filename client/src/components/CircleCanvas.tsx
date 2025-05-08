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
    <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 relative min-h-[350px] md:min-h-[500px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,rgba(123,31,162,0.2)_0%,rgba(18,18,18,0)_70%)]"></div>
        </div>
        
        {/* Decorative spinning elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90%] h-[90%] border border-primary/20 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[95%] h-[95%] border border-secondary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
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
          onClick={onDownload}
          className="bg-primary hover:bg-primary/80 text-white flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
        
        <Button
          onClick={onShare}
          className="bg-accent hover:bg-accent/80 text-black flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
      
      {/* Generation Status */}
      <div 
        className={`absolute top-4 left-4 bg-background/80 px-3 py-1 rounded text-sm flex items-center space-x-2 transition-opacity duration-300 ${
          isGenerating ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-pulse h-2 w-2 rounded-full bg-secondary"></div>
        <span>Generating circle...</span>
      </div>
    </div>
  );
}
