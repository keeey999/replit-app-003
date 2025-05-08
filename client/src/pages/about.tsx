import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-primary/20 font-cinzel font-bold">
          <h1 className="text-2xl">錬成陣について</h1>
        </div>
        
        <div className="p-6 prose prose-invert max-w-none">
          <h2 className="text-secondary font-cinzel">錬成陣とは</h2>
          <p>
            錬成陣（<em>れんせいじん</em>）は、神秘的な力を秘めた幾何学的な図形です。様々な文化において、これらの図形は特別な力や意味を持つとされてきました。
          </p>
          
          <h2 className="text-secondary font-cinzel mt-6">デザイン要素</h2>
          <ul className="space-y-2">
            <li><strong>幾何学模様：</strong> 基本構造には円、三角形、四角形、六芒星などが含まれます。</li>
            <li><strong>古代文字：</strong> 錬成式や呪文を表す古代文字が刻まれています。</li>
            <li><strong>象徴的要素：</strong> 元素や概念を表すアイコン。</li>
            <li><strong>数学的精度：</strong> 配置は特定の数学的原理に従います。</li>
          </ul>
          
          <h2 className="text-secondary font-cinzel mt-6">神秘の法則</h2>
          <blockquote className="border-l-4 border-accent pl-4 italic">
            「何かを得るためには、同等の代価が必要である」
          </blockquote>
          <p>
            この基本原理がすべての錬成陣に適用されます。錬成陣のデザインは、入力材料と望む出力の両方を考慮する必要があります。
          </p>
          
          <h2 className="text-secondary font-cinzel mt-6">このジェネレーターについて</h2>
          <p>
            このアプリケーションは、様々な伝統や神秘学から着想を得た独自の錬成陣を作成します。生成された各錬成陣は数学的に洗練されており、神秘的なデザインの美学的原則に従っています。
          </p>
          <p>
            生成される錬成陣は純粋に芸術的かつ架空のものです。実際の神秘的シンボルとの類似性はすべて偶然です。このツールはファンやクリエイティブな目的のためだけに作成されています。
          </p>
          
          <div className="flex justify-center mt-8">
            <Button asChild className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
              <Link href="/">ジェネレーターに戻る</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
