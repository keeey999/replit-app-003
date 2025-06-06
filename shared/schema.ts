import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Transmutation Circle schema
export const circles = pgTable("circles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  complexity: integer("complexity").notNull(),
  style: text("style").notNull(),
  colorScheme: text("color_scheme").notNull(),
  size: integer("size").notNull(),
  symbolDensity: integer("symbol_density").notNull(),
  showText: boolean("show_text").notNull(),
  config: jsonb("config").notNull(),
  imageUrl: text("image_url"),
  createdAt: text("created_at").notNull(),
});

export const circleSchema = createInsertSchema(circles).omit({
  id: true,
  userId: true,
});

export const circleThemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  accentColor: z.string().optional(),
  category: z.string().optional(), // 'japanese', 'futuristic', 'ancient' など
  isPreset: z.boolean().default(false),
});

export const circleConfigSchema = z.object({
  complexity: z.number().min(1).max(5),
  style: z.string(),
  colorScheme: z.string(),
  backgroundColor: z.string().default("dark"),
  customPrimaryColor: z.string().optional(),
  customBackgroundColor: z.string().optional(),
  useCustomColors: z.boolean().default(false),
  themeId: z.string().optional(),
  size: z.number().min(300).max(1000).default(600),
  symbolDensity: z.number().min(1).max(5),
  showText: z.boolean(),
});

export type CircleTheme = z.infer<typeof circleThemeSchema>;
export type CircleConfig = z.infer<typeof circleConfigSchema>;
export type InsertCircle = z.infer<typeof circleSchema>;
export type Circle = typeof circles.$inferSelect;
