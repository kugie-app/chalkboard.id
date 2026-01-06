import { pgTable, varchar, uuid, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';

export const pricingPackages = pgTable('pricing_packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }),
  category: varchar('category', { length: 50 }).notNull(), // 'hourly' or 'per_minute'
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  perMinuteRate: decimal('per_minute_rate', { precision: 10, scale: 2 }),
  isDefault: boolean('is_default').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: decimal('sort_order', { precision: 10, scale: 0 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type PricingPackage = typeof pricingPackages.$inferSelect;
export type NewPricingPackage = typeof pricingPackages.$inferInsert;