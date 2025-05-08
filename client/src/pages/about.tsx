import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-primary/20 font-cinzel font-bold">
          <h1 className="text-2xl">About Transmutation Circles</h1>
        </div>
        
        <div className="p-6 prose prose-invert max-w-none">
          <h2 className="text-secondary font-cinzel">What are Transmutation Circles?</h2>
          <p>
            Transmutation circles (錬成陣, <em>renseijin</em>) are a key element in the practice of alchemy as portrayed in Fullmetal Alchemist. They serve as the conduit through which alchemists direct and control the power of transmutation.
          </p>
          
          <h2 className="text-secondary font-cinzel mt-6">Design Elements</h2>
          <ul className="space-y-2">
            <li><strong>Geometric Patterns:</strong> The basic structure often features circles, triangles, squares, and hexagrams.</li>
            <li><strong>Runic Inscriptions:</strong> Ancient text that defines the alchemical formula.</li>
            <li><strong>Symbolic Elements:</strong> Icons representing elements or concepts being transmuted.</li>
            <li><strong>Mathematical Precision:</strong> The arrangement follows specific mathematical principles.</li>
          </ul>
          
          <h2 className="text-secondary font-cinzel mt-6">The Law of Equivalent Exchange</h2>
          <blockquote className="border-l-4 border-accent pl-4 italic">
            "In order to obtain something, something of equal value must be lost."
          </blockquote>
          <p>
            This fundamental principle governs all transmutation circles. The circle's design must account for both the input materials and the desired output.
          </p>
          
          <h2 className="text-secondary font-cinzel mt-6">About This Generator</h2>
          <p>
            This application creates unique transmutation circles inspired by those seen in Fullmetal Alchemist and other alchemical traditions. Each generated circle is mathematically sound and follows the aesthetic principles of alchemical design.
          </p>
          <p>
            The circles generated are purely artistic and fictional - any resemblance to actual alchemical symbols is coincidental. This tool is created for fans and creative purposes only.
          </p>
          
          <div className="flex justify-center mt-8">
            <Button asChild className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
              <Link href="/">Return to Generator</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
