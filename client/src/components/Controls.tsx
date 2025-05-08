import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CircleConfig } from "@shared/schema";
import { CircleHelp, ChevronUp, ChevronDown } from "lucide-react";

interface ControlsProps {
  config: CircleConfig;
  onConfigChange: (config: Partial<CircleConfig>) => void;
  onInfoClick: () => void;
}

export default function Controls({ config, onConfigChange, onInfoClick }: ControlsProps) {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const complexityLabels = ["Simple", "Basic", "Medium", "Complex", "Master"];
  const symbolDensityLabels = ["Minimal", "Low", "Medium", "High", "Maximum"];
  
  const colorOptions = [
    { value: "gold", label: "Gold", bgClass: "bg-yellow-500" },
    { value: "azure", label: "Azure", bgClass: "bg-blue-400" },
    { value: "crimson", label: "Crimson", bgClass: "bg-red-600" },
    { value: "emerald", label: "Emerald", bgClass: "bg-green-500" },
    { value: "purple", label: "Purple", bgClass: "bg-purple-600" },
  ];

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-primary/20 font-cinzel font-bold flex justify-between items-center">
        <h2 className="text-lg flex items-center">
          Customization
          <button onClick={onInfoClick} className="ml-2 text-accent hover:text-secondary transition-colors">
            <CircleHelp className="h-5 w-5" />
          </button>
        </h2>
        <button 
          onClick={() => setIsControlsOpen(!isControlsOpen)} 
          className="text-accent hover:text-secondary transition-colors"
        >
          {isControlsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {isControlsOpen && (
        <div className="p-4 space-y-4">
          {/* Complexity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="complexity" className="text-sm">Complexity</Label>
              <span className="text-secondary text-sm">{complexityLabels[config.complexity - 1]}</span>
            </div>
            <Slider
              id="complexity"
              min={1}
              max={5}
              step={1}
              value={[config.complexity]}
              onValueChange={(value) => onConfigChange({ complexity: value[0] })}
              className="w-full"
            />
          </div>
          
          {/* Style Selector */}
          <div className="space-y-2">
            <Label htmlFor="style" className="text-sm">Style</Label>
            <Select
              value={config.style}
              onValueChange={(value) => onConfigChange({ style: value })}
            >
              <SelectTrigger id="style" className="w-full bg-muted">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic (FMA)</SelectItem>
                <SelectItem value="elemental">Elemental</SelectItem>
                <SelectItem value="runic">Runic</SelectItem>
                <SelectItem value="celestial">Celestial</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Color Scheme */}
          <div className="space-y-2">
            <Label className="text-sm">Color Scheme</Label>
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onConfigChange({ colorScheme: color.value })}
                  className={`w-8 h-8 rounded-full ${color.bgClass} ${
                    config.colorScheme === color.value 
                      ? "border-2 border-white" 
                      : "border-2 border-transparent"
                  }`}
                  title={color.label}
                  aria-label={`Set color to ${color.label}`}
                />
              ))}
            </div>
          </div>
          
          {/* Advanced Options */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Advanced Options</Label>
              <button 
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} 
                className="text-accent hover:text-secondary text-xs transition-colors flex items-center"
              >
                {isAdvancedOpen ? "Hide" : "Show"}
                {isAdvancedOpen ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
              </button>
            </div>
            
            {isAdvancedOpen && (
              <div className="space-y-3 pt-2">
                {/* Size Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="size" className="text-xs">Size</Label>
                    <span className="text-secondary text-xs">{config.size}px</span>
                  </div>
                  <Slider
                    id="size"
                    min={300}
                    max={1000}
                    step={100}
                    value={[config.size]}
                    onValueChange={(value) => onConfigChange({ size: value[0] })}
                    className="w-full"
                  />
                </div>
                
                {/* Symbol Density */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="symbolDensity" className="text-xs">Symbol Density</Label>
                    <span className="text-secondary text-xs">{symbolDensityLabels[config.symbolDensity - 1]}</span>
                  </div>
                  <Slider
                    id="symbolDensity"
                    min={1}
                    max={5}
                    step={1}
                    value={[config.symbolDensity]}
                    onValueChange={(value) => onConfigChange({ symbolDensity: value[0] })}
                    className="w-full"
                  />
                </div>
                
                {/* Text Visibility */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="showText" className="text-xs">Runic Text</Label>
                  <Switch
                    id="showText"
                    checked={config.showText}
                    onCheckedChange={(checked) => onConfigChange({ showText: checked })}
                  />
                </div>
                
                {/* Animation Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="animation" className="text-xs">Animation Effects</Label>
                  <Switch
                    id="animation"
                    checked={config.animation}
                    onCheckedChange={(checked) => onConfigChange({ animation: checked })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
