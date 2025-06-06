import { useState } from "react";
import { Circle } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GalleryProps {
  circles: Circle[];
  onSelectCircle: (circle: Circle) => void;
  onClearGallery: () => void;
  onSaveCircle: () => void;
}

export default function Gallery({ circles, onSelectCircle, onClearGallery, onSaveCircle }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  return (
    <div className="bg-card-gradient rounded-lg shadow-lg overflow-hidden flex-grow">
      <div className="p-4 bg-mystic-gradient font-cinzel font-bold flex justify-between items-center">
        <h2 className="text-lg text-white">保存済み錬成陣</h2>
        <div className="flex space-x-2">
          <Button
            onClick={onSaveCircle}
            size="sm"
            variant="secondary"
            className="text-black hover:bg-secondary/80 transition-colors text-sm font-bold"
          >
            <Save className="h-4 w-4 mr-1" /> 保存
          </Button>
          <Button
            onClick={onClearGallery}
            size="sm"
            variant="outline"
            className="text-white hover:text-secondary transition-colors text-sm bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-1" /> クリア
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {circles.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-1">
              {circles.map((circle) => (
                <Dialog key={circle.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="aspect-square rounded bg-background flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-accent transition-all overflow-hidden"
                      onClick={() => {
                        onSelectCircle(circle);
                        setSelectedImage(circle.imageUrl || null);
                      }}
                    >
                      {circle.imageUrl ? (
                        <img 
                          src={circle.imageUrl} 
                          alt={`錬成陣: ${circle.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-sm text-muted-foreground">画像なし</div>
                      )}
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{circle.name || "錬成陣"}</DialogTitle>
                    </DialogHeader>
                    {selectedImage && (
                      <img 
                        src={selectedImage} 
                        alt="錬成陣の拡大表示" 
                        className="w-full rounded-md"
                      />
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="min-h-[100px] flex items-center justify-center text-center text-sm text-muted-foreground">
            錬成陣を生成して保存するとここに表示されます
          </div>
        )}
      </div>
    </div>
  );
}
