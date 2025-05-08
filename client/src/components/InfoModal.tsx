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
          <DialogTitle className="text-xl font-cinzel text-secondary">About Transmutation Circles</DialogTitle>
        </DialogHeader>
        
        <div className="prose prose-invert max-w-none">
          <h3 className="text-secondary font-cinzel">What are Transmutation Circles?</h3>
          <p>
            Transmutation circles (錬成陣, <em>renseijin</em>) are a key element in the practice of alchemy as portrayed in Fullmetal Alchemist. They serve as the conduit through which alchemists direct and control the power of transmutation.
          </p>
          
          <h3 className="text-secondary font-cinzel mt-4">Design Elements</h3>
          <ul className="space-y-2">
            <li><strong>Geometric Patterns:</strong> The basic structure often features circles, triangles, squares, and hexagrams.</li>
            <li><strong>Runic Inscriptions:</strong> Ancient text that defines the alchemical formula.</li>
            <li><strong>Symbolic Elements:</strong> Icons representing elements or concepts being transmuted.</li>
            <li><strong>Mathematical Precision:</strong> The arrangement follows specific mathematical principles.</li>
          </ul>
          
          <h3 className="text-secondary font-cinzel mt-4">The Law of Equivalent Exchange</h3>
          <blockquote className="border-l-4 border-accent pl-4 italic">
            "In order to obtain something, something of equal value must be lost."
          </blockquote>
          <p>
            This fundamental principle governs all transmutation circles. The circle's design must account for both the input materials and the desired output.
          </p>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
