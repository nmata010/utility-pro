import {
  users,
  landlordSettings,
  tenants,
  invoices,
  type User,
  type UpsertUser,
  type LandlordSettings,
  type InsertLandlordSettings,
  type Tenant,
  type InsertTenant,
  type Invoice,
  type InsertInvoice,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Landlord settings operations
  getLandlordSettings(userId: string): Promise<LandlordSettings | undefined>;
  upsertLandlordSettings(settings: InsertLandlordSettings): Promise<LandlordSettings>;
  
  // Tenant operations
  getTenants(userId: string): Promise<Tenant[]>;
  getTenant(id: number): Promise<Tenant | undefined>;
  createTenant(tenant: InsertTenant): Promise<Tenant>;
  updateTenant(id: number, tenant: Partial<InsertTenant>): Promise<Tenant>;
  deleteTenant(id: number): Promise<void>;
  
  // Invoice operations
  getInvoices(userId: string): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Landlord settings operations
  async getLandlordSettings(userId: string): Promise<LandlordSettings | undefined> {
    const [settings] = await db
      .select()
      .from(landlordSettings)
      .where(eq(landlordSettings.userId, userId));
    return settings;
  }

  async upsertLandlordSettings(settings: InsertLandlordSettings): Promise<LandlordSettings> {
    const existing = await this.getLandlordSettings(settings.userId);
    
    if (existing) {
      const [updated] = await db
        .update(landlordSettings)
        .set({
          ...settings,
          updatedAt: new Date(),
        })
        .where(eq(landlordSettings.userId, settings.userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(landlordSettings)
        .values(settings)
        .returning();
      return created;
    }
  }

  // Tenant operations
  async getTenants(userId: string): Promise<Tenant[]> {
    return await db
      .select()
      .from(tenants)
      .where(eq(tenants.userId, userId))
      .orderBy(desc(tenants.createdAt));
  }

  async getTenant(id: number): Promise<Tenant | undefined> {
    const [tenant] = await db
      .select()
      .from(tenants)
      .where(eq(tenants.id, id));
    return tenant;
  }

  async createTenant(tenant: InsertTenant): Promise<Tenant> {
    const [created] = await db
      .insert(tenants)
      .values(tenant)
      .returning();
    return created;
  }

  async updateTenant(id: number, tenant: Partial<InsertTenant>): Promise<Tenant> {
    const [updated] = await db
      .update(tenants)
      .set({
        ...tenant,
        updatedAt: new Date(),
      })
      .where(eq(tenants.id, id))
      .returning();
    return updated;
  }

  async deleteTenant(id: number): Promise<void> {
    await db.delete(tenants).where(eq(tenants.id, id));
  }

  // Invoice operations
  async getInvoices(userId: string): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, userId))
      .orderBy(desc(invoices.createdAt));
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    const [invoice] = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, id));
    return invoice;
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [created] = await db
      .insert(invoices)
      .values(invoice)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
