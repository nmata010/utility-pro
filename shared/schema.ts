import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  serial
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Landlord settings table
export const landlordSettings = pgTable("landlord_settings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  landlordName: text("landlord_name"),
  landlordAddress: text("landlord_address"),
  landlordPhone: text("landlord_phone"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLandlordSettingsSchema = createInsertSchema(landlordSettings).omit({ id: true, updatedAt: true });
export type InsertLandlordSettings = z.infer<typeof insertLandlordSettingsSchema>;
export type LandlordSettings = typeof landlordSettings.$inferSelect;

// Tenant information table
export const tenants = pgTable("tenants", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  tenantName: text("tenant_name").notNull(),
  tenantAddress: text("tenant_address"),
  tenantPhone: text("tenant_phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTenantSchema = createInsertSchema(tenants).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type Tenant = typeof tenants.$inferSelect;

// Invoice history table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  invoiceType: varchar("invoice_type").notNull(), // 'electrical' or 'water'
  invoiceNumber: text("invoice_number").notNull(),
  invoiceDate: timestamp("invoice_date").notNull(),
  landlordData: jsonb("landlord_data").notNull(),
  tenantData: jsonb("tenant_data").notNull(),
  calculationData: jsonb("calculation_data").notNull(),
  totalAmount: text("total_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({ id: true, createdAt: true });
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  landlordSettings: many(landlordSettings),
  tenants: many(tenants),
  invoices: many(invoices),
}));

export const landlordSettingsRelations = relations(landlordSettings, ({ one }) => ({
  user: one(users, {
    fields: [landlordSettings.userId],
    references: [users.id],
  }),
}));

export const tenantsRelations = relations(tenants, ({ one }) => ({
  user: one(users, {
    fields: [tenants.userId],
    references: [users.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  user: one(users, {
    fields: [invoices.userId],
    references: [users.id],
  }),
}));
