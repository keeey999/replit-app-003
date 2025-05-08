import { useState } from "react";
import CircleCanvas from "@/components/CircleCanvas";
import Controls from "@/components/Controls";

import InfoModal from "@/components/InfoModal";
import { CircleConfig } from "@shared/schema";
import { useTransmutationCircle } from "@/hooks/use-transmutation-circle";

export default function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  const {
    canvasRef,
    circleConfig,
    updateCircleConfig,
    isGenerating,
    generateCircle,
    downloadCircle,
    shareCircle,
  } = useTransmutationCircle();
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Circle Display */}
        <div className="lg:w-2/3 flex flex-col">
          <CircleCanvas 
            canvasRef={canvasRef}
            isGenerating={isGenerating}
            onDownload={downloadCircle}
            onShare={shareCircle}
          />
          
          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-5">
            <button 
              onClick={generateCircle}
              className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isGenerating}
            >
              <span className="mr-2 text-xl">✨</span>
              <span>新しい錬成陣を生成</span>
            </button>
            
            <button 
              onClick={downloadCircle}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-lg shadow-md flex items-center justify-center transition-all hover:shadow-lg border border-slate-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isGenerating}
            >
              <span className="mr-2 text-lg">⬇️</span>
              <span>ダウンロード</span>
            </button>
            
            <button 
              onClick={shareCircle}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-lg shadow-md flex items-center justify-center transition-all hover:shadow-lg border border-slate-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isGenerating}
            >
              <span className="mr-2 text-lg">🔗</span>
              <span>共有</span>
            </button>
          </div>
        </div>
        
        {/* Right Side - Controls */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <Controls
            config={circleConfig}
            onConfigChange={updateCircleConfig}
            onInfoClick={() => setIsInfoModalOpen(true)}
          />
        </div>
      </div>
      
      <InfoModal 
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
      />
    </div>
  );
}
