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
      {/* モバイルでは順序を入れ替え、デスクトップでは元の順序を維持 */}
      <div className="block lg:hidden mb-4">
        {/* モバイル表示時のコントロール（先頭に表示） */}
        <div className="flex flex-col gap-4">
          <Controls
            config={circleConfig}
            onConfigChange={updateCircleConfig}
            onInfoClick={() => setIsInfoModalOpen(true)}
          />
          
          {/* モバイル表示時の生成ボタン（コントロールの下に配置） */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={generateCircle}
              className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full"
              disabled={isGenerating}
            >
              <span className="mr-2 text-xl">✨</span>
              <span>新しい錬成陣を生成</span>
            </button>
            
            <div className="flex justify-center gap-4 mt-2">
              <button 
                onClick={downloadCircle}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg shadow-md flex items-center justify-center transition-all hover:shadow-lg border border-slate-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex-1"
                disabled={isGenerating}
              >
                <span className="mr-2 text-lg">⬇️</span>
                <span>ダウンロード</span>
              </button>
              
              <button 
                onClick={shareCircle}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg shadow-md flex items-center justify-center transition-all hover:shadow-lg border border-slate-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex-1"
                disabled={isGenerating}
              >
                <span className="mr-2 text-lg">🔗</span>
                <span>共有</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
        
        {/* Desktop Only - Controls */}
        <div className="hidden lg:flex flex-col gap-4 lg:w-1/3">
          <Controls
            config={circleConfig}
            onConfigChange={updateCircleConfig}
            onInfoClick={() => setIsInfoModalOpen(true)}
          />
          
          {/* デスクトップ表示時の生成ボタン */}
          <div className="mt-4">
            <button 
              onClick={generateCircle}
              className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center justify-center w-full transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isGenerating}
            >
              <span className="mr-2 text-xl">✨</span>
              <span>新しい錬成陣を生成</span>
            </button>
          </div>
        </div>
      </div>
      
      <InfoModal 
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
      />
    </div>
  );
}
