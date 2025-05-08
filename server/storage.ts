import { users, type User, type InsertUser, type Circle, type InsertCircle } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Circle storage methods
  getAllCircles(): Promise<Circle[]>;
  getCircle(id: number): Promise<Circle | undefined>;
  saveCircle(circle: InsertCircle): Promise<Circle>;
  deleteCircle(id: number): Promise<void>;
  clearCircles(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private circles: Map<number, Circle>;
  private userId: number;
  private circleId: number;

  constructor() {
    this.users = new Map();
    this.circles = new Map();
    this.userId = 1;
    this.circleId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCircles(): Promise<Circle[]> {
    return Array.from(this.circles.values()).sort((a, b) => {
      // Sort by creation date, newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getCircle(id: number): Promise<Circle | undefined> {
    return this.circles.get(id);
  }

  async saveCircle(insertCircle: InsertCircle): Promise<Circle> {
    const id = this.circleId++;
    const circle: Circle = { ...insertCircle, id, userId: null };
    this.circles.set(id, circle);
    return circle;
  }

  async deleteCircle(id: number): Promise<void> {
    this.circles.delete(id);
  }

  async clearCircles(): Promise<void> {
    this.circles.clear();
  }
}

export const storage = new MemStorage();
