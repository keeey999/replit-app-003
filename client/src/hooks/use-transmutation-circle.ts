import { useState, useRef, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateTransmutationCircle } from "@/lib/circle-generator";
import { CircleConfig, Circle } from "@shared/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const DEFAULT_CONFIG: CircleConfig = {
  complexity: 3,
  style: "classic",
  colorScheme: "gold",
  backgroundColor: "dark",
  customPrimaryColor: "#FFD700",
  customBackgroundColor: "#121212",
  useCustomColors: false,
  themeId: undefined,
  size: 500,
  symbolDensity: 3,
  showText: true,
  animation: true,
};

export function useTransmutationCircle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circleConfig, setCircleConfig] = useState<CircleConfig>(DEFAULT_CONFIG);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch saved circles
  const { data: savedCircles = [] } = useQuery<Circle[]>({
    queryKey: ['/api/circles'],
  });

  // Save circle mutation
  const saveCircleMutation = useMutation({
    mutationFn: async (circleData: Partial<Circle>) => {
      const response = await apiRequest('POST', '/api/circles', circleData);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "保存に失敗しました");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circles'] });
      toast({
        title: "成功",
        description: "錬成陣をギャラリーに保存しました",
      });
    },
    onError: (error) => {
      console.error("Save error:", error);
      toast({
        title: "エラー",
        description: "保存に失敗しました: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Delete circle mutation
  const deleteCircleMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/circles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circles'] });
    },
  });

  // Clear gallery mutation
  const clearGalleryMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('DELETE', '/api/circles');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "ギャラリーのクリアに失敗しました");
      }
      
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circles'] });
      toast({
        title: "完了",
        description: "ギャラリーをクリアしました",
      });
    },
    onError: (error) => {
      console.error("Clear gallery error:", error);
      toast({
        title: "エラー",
        description: "ギャラリーのクリアに失敗しました: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Generate a new transmutation circle
  const generateCircle = useCallback(() => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      if (canvasRef.current) {
        generateTransmutationCircle(canvasRef.current, circleConfig);
      }
      setIsGenerating(false);
    }, 500);
  }, [circleConfig]);

  // Update circle configuration
  const updateCircleConfig = useCallback((newConfig: Partial<CircleConfig>) => {
    setCircleConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  }, []);

  // Download the current circle
  const downloadCircle = useCallback(() => {
    if (!canvasRef.current) return;
    
    try {
      // Create a temporary canvas to ensure we have a clean image
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Match the dimensions of the original canvas
      tempCanvas.width = canvasRef.current.width;
      tempCanvas.height = canvasRef.current.height;
      
      // Draw the original canvas content onto the temporary canvas
      if (tempCtx) {
        // Fill with a transparent background first
        tempCtx.fillStyle = 'rgba(0, 0, 0, 0)';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Draw the original canvas
        tempCtx.drawImage(canvasRef.current, 0, 0);
        
        // Get the data URL from the temporary canvas
        const dataUrl = tempCanvas.toDataURL('image/png');
        
        // Use FileSaver.js approach for broader compatibility
        const binStr = atob(dataUrl.split(',')[1]);
        const len = binStr.length;
        const arr = new Uint8Array(len);
        
        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        
        // Create a Blob and trigger download
        const blob = new Blob([arr], { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `alchemaker-${Date.now()}.png`;
        
        // Add to document to ensure it works across browsers
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        }, 100);
        
        toast({
          title: "ダウンロード完了",
          description: "錬成陣を端末に保存しました",
        });
      }
    } catch (error) {
      console.error("ダウンロードエラー:", error);
      toast({
        title: "エラー",
        description: "錬成陣のダウンロードに失敗しました",
        variant: "destructive",
      });
    }
  }, [canvasRef, toast]);

  // Share the current circle
  const shareCircle = useCallback(async () => {
    if (!canvasRef.current) return;
    
    try {
      if (navigator.share && canvasRef.current.toBlob) {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvasRef.current?.toBlob(resolve);
        });
        
        if (blob) {
          const file = new File([blob], "alchemaker.png", { type: "image/png" });
          
          await navigator.share({
            title: "AlcheMaker 錬成陣",
            text: "AlcheMakerで作成した錬成陣をチェックしてください！",
            files: [file],
          });
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        const dataUrl = canvasRef.current.toDataURL('image/png');
        
        // Copy image to clipboard when supported
        if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
          const blob = await (await fetch(dataUrl)).blob();
          await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
          
          toast({
            title: "クリップボードにコピー",
            description: "画像をクリップボードにコピーしました。別の場所に貼り付けることができます。",
          });
        } else {
          // Open image in new tab as last resort
          const newTab = window.open();
          if (newTab) {
            newTab.document.write(`<img src="${dataUrl}" alt="AlcheMaker 錬成陣">`);
          }
        }
      }
    } catch (error) {
      console.error("共有エラー:", error);
      toast({
        title: "共有失敗",
        description: "画像を共有できませんでした。代わりにダウンロードをお試しください。",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Save current circle to gallery
  const saveCurrentCircle = useCallback(() => {
    if (!canvasRef.current) return;
    
    try {
      // Compress the image size to reduce payload
      const imageUrl = canvasRef.current.toDataURL('image/jpeg', 0.7);
      
      const newCircle = {
        name: `錬成陣 ${new Date().toLocaleString('ja-JP')}`,
        complexity: circleConfig.complexity,
        style: circleConfig.style,
        colorScheme: circleConfig.colorScheme,
        size: circleConfig.size,
        symbolDensity: circleConfig.symbolDensity,
        showText: circleConfig.showText,
        animation: circleConfig.animation,
        config: circleConfig,
        imageUrl,
        createdAt: new Date().toISOString(),
      };
      
      toast({
        title: "保存中...",
        description: "錬成陣をギャラリーに保存しています",
      });
      
      saveCircleMutation.mutate(newCircle);
    } catch (error) {
      console.error("保存エラー:", error);
      toast({
        title: "エラー",
        description: "保存に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  }, [circleConfig, saveCircleMutation, toast]);

  // Clear all saved circles
  const clearGallery = useCallback(() => {
    if (window.confirm("すべての保存された錬成陣を削除してもよろしいですか？")) {
      clearGalleryMutation.mutate();
    }
  }, [clearGalleryMutation]);

  // Select a circle from the gallery
  const selectCircle = useCallback((circle: Circle) => {
    if (circle.config) {
      setCircleConfig(circle.config as CircleConfig);
      
      // Apply the selected circle's configuration
      setTimeout(() => {
        if (canvasRef.current) {
          generateTransmutationCircle(canvasRef.current, circle.config as CircleConfig);
        }
      }, 100);
    }
  }, []);

  // Generate a circle on initial render
  useEffect(() => {
    generateCircle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    canvasRef,
    circleConfig,
    updateCircleConfig,
    isGenerating,
    generateCircle,
    downloadCircle,
    shareCircle,
  };
}
