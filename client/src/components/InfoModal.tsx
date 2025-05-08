import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-cinzel text-secondary">錬成陣について</DialogTitle>
        </DialogHeader>
        
        <div className="prose prose-invert max-w-none">
          <h3 className="text-secondary font-cinzel">錬成陣とは</h3>
          <p>
            錬成陣（<em>れんせいじん</em>）は、神秘的な力を秘めた幾何学的な図形です。様々な文化において、これらの図形は特別な力や意味を持つとされてきました。
          </p>
          
          <h3 className="text-secondary font-cinzel mt-4">デザイン要素</h3>
          <ul className="space-y-2">
            <li><strong>幾何学模様：</strong> 基本構造には円、三角形、四角形、六芒星などが含まれます。</li>
            <li><strong>古代文字：</strong> 錬成式や呪文を表す古代文字が刻まれています。</li>
            <li><strong>象徴的要素：</strong> 元素や概念を表すアイコン。</li>
            <li><strong>数学的精度：</strong> 配置は特定の数学的原理に従います。</li>
          </ul>
          
          <h3 className="text-secondary font-cinzel mt-4">神秘の法則</h3>
          <blockquote className="border-l-4 border-accent pl-4 italic">
            「何かを得るためには、同等の代価が必要である」
          </blockquote>
          <p>
            この基本原理がすべての錬成陣に適用されます。錬成陣のデザインは、入力材料と望む出力の両方を考慮する必要があります。
          </p>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>閉じる</Button>
          <Button asChild>
            <Link href="/about">詳細を見る</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
