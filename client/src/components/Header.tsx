import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const isHome = location === "/";
  const isAbout = location === "/about";
  
  return (
    <header className="bg-slate-800 p-2 sm:p-3 md:p-4 shadow-lg border-b border-primary/30">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
          <h1 className="text-lg md:text-2xl font-cinzel font-bold">
            <Link href="/">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex items-center bg-gradient-to-br from-slate-900 to-slate-800 px-2 md:px-3 py-1 rounded-lg shadow-inner border border-slate-700">
                  <span className="text-yellow-400 text-xl md:text-2xl mr-1 md:mr-2">✧</span>
                  <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-500 bg-clip-text text-transparent font-bold tracking-wider">
                    Alche<span className="text-pink-400">Maker</span>
                  </span>
                  <span className="text-yellow-400 text-xl md:text-2xl mx-1 md:mx-2">✧</span>
                </div>
              </div>
            </Link>
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4 mt-2 sm:mt-0">
          {!isAbout && (
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className="text-primary hover:text-secondary transition-colors px-2 py-1 h-auto text-xs md:text-sm"
            >
              <Link href="/about">
                <HelpCircle className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                <span className="hidden sm:inline">情報</span>
              </Link>
            </Button>
          )}
          
          {!isHome && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary hover:text-secondary transition-colors px-2 py-1 h-auto text-xs md:text-sm"
            >
              <Link href="/">ホーム</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
