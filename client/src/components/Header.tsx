import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, HelpCircle } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Used to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isHome = location === "/";
  const isAbout = location === "/about";
  
  return (
    <header className="bg-card p-4 shadow-lg border-b border-primary/30">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2 symbol-glow">
            <span className="text-secondary text-2xl">⚗️</span>
          </div>
          <h1 className="text-xl md:text-2xl font-cinzel font-bold">
            <Link href="/">
              <div className="flex items-center">
                <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent font-bold">
                  Alche<span className="text-accent">Maker</span>
                </span>{" "}
                <span className="text-secondary ml-2 text-glow">錬成陣</span>
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
              className="text-accent hover:text-secondary transition-colors"
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
              className="text-accent hover:text-secondary transition-colors"
            >
              <Link href="/">ホーム</Link>
            </Button>
          )}
          
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-accent hover:text-secondary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          
          <div className="hidden md:block">
            <span className="font-japanese text-sm">
              <span className="text-secondary text-glow">神秘の図形</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
