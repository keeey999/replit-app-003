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
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circles'] });
      toast({
        title: "Success",
        description: "Circle saved to gallery",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save circle: " + error.message,
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
      await apiRequest('DELETE', '/api/circles');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/circles'] });
      toast({
        title: "Success",
        description: "Gallery cleared",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to clear gallery: " + error.message,
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
    
    const link = document.createElement('a');
    link.download = `transmutation-circle-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    
    toast({
      title: "Downloaded",
      description: "Transmutation circle saved to your device",
    });
  }, [toast]);

  // Share the current circle
  const shareCircle = useCallback(async () => {
    if (!canvasRef.current) return;
    
    try {
      if (navigator.share && canvasRef.current.toBlob) {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvasRef.current?.toBlob(resolve);
        });
        
        if (blob) {
          const file = new File([blob], "transmutation-circle.png", { type: "image/png" });
          
          await navigator.share({
            title: "Transmutation Circle",
            text: "Check out this transmutation circle I created!",
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
            title: "Copied to clipboard",
            description: "Image copied to clipboard. You can now paste it elsewhere.",
          });
        } else {
          // Open image in new tab as last resort
          const newTab = window.open();
          if (newTab) {
            newTab.document.write(`<img src="${dataUrl}" alt="Transmutation Circle">`);
          }
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Share failed",
        description: "Could not share the image. Try downloading instead.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Save current circle to gallery
  const saveCurrentCircle = useCallback(() => {
    if (!canvasRef.current) return;
    
    const imageUrl = canvasRef.current.toDataURL('image/png');
    
    const newCircle = {
      name: `Circle ${new Date().toLocaleString()}`,
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
    
    saveCircleMutation.mutate(newCircle);
  }, [circleConfig, saveCircleMutation]);

  // Clear all saved circles
  const clearGallery = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all saved circles?")) {
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
    savedCircles,
    saveCurrentCircle,
    clearGallery,
    selectCircle,
  };
}
