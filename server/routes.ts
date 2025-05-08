import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { circleConfigSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all saved circles
  app.get("/api/circles", async (req, res) => {
    try {
      const circles = await storage.getAllCircles();
      res.json(circles);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve circles" });
    }
  });

  // Save a new circle
  app.post("/api/circles", async (req, res) => {
    try {
      const circleData = req.body;
      
      // Validate circle data
      const validatedData = circleConfigSchema.parse(circleData.config);
      
      const newCircle = await storage.saveCircle({
        name: circleData.name || "Unnamed Circle",
        complexity: validatedData.complexity,
        style: validatedData.style,
        colorScheme: validatedData.colorScheme,
        size: validatedData.size,
        symbolDensity: validatedData.symbolDensity,
        showText: validatedData.showText,
        animation: validatedData.animation,
        config: circleData.config,
        imageUrl: circleData.imageUrl,
        createdAt: new Date().toISOString(),
      });
      
      res.status(201).json(newCircle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid circle data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save circle" });
      }
    }
  });

  // Delete a circle
  app.delete("/api/circles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid circle ID" });
      }
      
      await storage.deleteCircle(id);
      res.json({ message: "Circle deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete circle" });
    }
  });

  // Clear all circles
  app.delete("/api/circles", async (req, res) => {
    try {
      await storage.clearCircles();
      res.json({ message: "All circles cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear circles" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
