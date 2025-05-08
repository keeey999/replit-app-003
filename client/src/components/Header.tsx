import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const isHome = location === "/";
  const isAbout = location === "/about";
  
  return (
    <header className="bg-card p-4 shadow-lg border-b border-primary/30">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-cinzel font-bold">
            <Link href="/">
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="text-secondary text-2xl mr-1">✦</span>
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent font-bold">
                    Alche<span className="text-accent">Maker</span>
                  </span>
                  <span className="text-secondary mx-1">✦</span>
                </div>
                <span className="text-secondary ml-1">錬成陣</span>
              </div>
            </Link>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isAbout && (
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className="text-primary hover:text-secondary transition-colors"
            >
              <Link href="/about">
                <HelpCircle className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          {!isHome && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary hover:text-secondary transition-colors"
            >
              <Link href="/">ホーム</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
