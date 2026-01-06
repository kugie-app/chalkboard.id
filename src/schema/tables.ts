import { pgTable, serial, varchar, decimal, boolean, timestamp, integer, uuid } from 'drizzle-orm/pg-core';
import { pricingPackages } from './pricing-packages';

export const tables = pgTable('tables', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  status: varchar('status', { length: 20 }).default('available'), // available, occupied, maintenance, reserved
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }).notNull(),
  perMinuteRate: decimal('per_minute_rate', { precision: 10, scale: 4 }), // Rate per minute (optional)
  pricingPackageId: uuid('pricing_package_id').references(() => pricingPackages.id), // New field for package reference
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tableSessions = pgTable('table_sessions', {
  id: serial('id').primaryKey(),
  tableId: integer('table_id').references(() => tables.id).notNull(),
  customerName: varchar('customer_name', { length: 100 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }), // Enhanced customer tracking
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  plannedDuration: integer('planned_duration').notNull(), // in minutes (0 means open table)
  actualDuration: integer('actual_duration'), // in minutes
  originalDuration: integer('original_duration'), // in minutes - tracks actual time before manual adjustments
  durationType: varchar('duration_type', { length: 20 }).default('hourly'), // hourly, per_minute
  pricingPackageId: uuid('pricing_package_id').references(() => pricingPackages.id), // Track which package was used
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 20 }).default('active'), // active, completed, cancelled
  paymentId: integer('payment_id'), // Will reference payments.id (reverse reference pattern)
  staffId: integer('staff_id'), // Will reference staff.id (avoid circular import)
  sessionRating: integer('session_rating'), // 1-5 customer satisfaction
  fnbOrderCount: integer('fnb_order_count').default(0), // Denormalized for analytics
  createdAt: timestamp('created_at').defaultNow(),
});

export type Table = typeof tables.$inferSelect;
export type NewTable = typeof tables.$inferInsert;
export type TableSession = typeof tableSessions.$inferSelect;
export type NewTableSession = typeof tableSessions.$inferInsert; 