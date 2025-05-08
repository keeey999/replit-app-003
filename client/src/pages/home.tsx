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
          <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button 
              onClick={generateCircle}
              className="action-button px-4 py-2 sm:px-6 sm:py-3 flex items-center"
              disabled={isGenerating}
            >
              <span className="mr-2">✨</span>
              <span>新しい錬成陣を生成</span>
            </button>
            
            <button 
              onClick={downloadCircle}
              className="action-button px-4 py-2 sm:px-6 sm:py-3 flex items-center"
              disabled={isGenerating}
            >
              <span className="mr-2">⬇️</span>
              <span>ダウンロード</span>
            </button>
            
            <button 
              onClick={shareCircle}
              className="action-button px-4 py-2 sm:px-6 sm:py-3 flex items-center"
              disabled={isGenerating}
            >
              <span className="mr-2">🔗</span>
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
