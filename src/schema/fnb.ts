import { pgTable, serial, varchar, text, decimal, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { tables } from './tables';

// Staff table for attribution and performance tracking
export const staff = pgTable('staff', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const fnbCategories = pgTable('fnb_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const fnbItems = pgTable('fnb_items', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => fnbCategories.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }),
  stockQuantity: integer('stock_quantity').default(0),
  minStockLevel: integer('min_stock_level').default(0),
  unit: varchar('unit', { length: 20 }).default('pcs'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const fnbOrders = pgTable('fnb_orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  tableId: integer('table_id').references(() => tables.id),
  customerName: varchar('customer_name', { length: 100 }),
  customerPhone: varchar('customer_phone', { length: 20 }), // For draft order tracking
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // draft, pending, billed, paid, cancelled
  paymentId: integer('payment_id'), // Will reference payments.id (reverse reference pattern)
  staffId: integer('staff_id').references(() => staff.id), // Track order creator
  notes: text('notes'), // Special instructions or customer notes
  createdAt: timestamp('created_at').defaultNow(),
});

export const fnbOrderItems = pgTable('fnb_order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => fnbOrders.id).notNull(),
  itemId: integer('item_id').references(() => fnbItems.id).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
});

// New table for analytics optimization
export const orderAnalytics = pgTable('order_analytics', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => fnbOrders.id).notNull(),
  orderDate: timestamp('order_date').notNull(),
  dayOfWeek: integer('day_of_week').notNull(), // 0-6 for analytics
  hourOfDay: integer('hour_of_day').notNull(), // 0-23 for analytics
  orderValue: decimal('order_value', { precision: 10, scale: 2 }).notNull(),
  itemCount: integer('item_count').notNull(),
  processingTime: integer('processing_time'), // Minutes from order to completion
});

export type Staff = typeof staff.$inferSelect;
export type NewStaff = typeof staff.$inferInsert;
export type FnbCategory = typeof fnbCategories.$inferSelect;
export type NewFnbCategory = typeof fnbCategories.$inferInsert;
export type FnbItem = typeof fnbItems.$inferSelect;
export type NewFnbItem = typeof fnbItems.$inferInsert;
export type FnbOrder = typeof fnbOrders.$inferSelect;
export type NewFnbOrder = typeof fnbOrders.$inferInsert;
export type FnbOrderItem = typeof fnbOrderItems.$inferSelect;
export type NewFnbOrderItem = typeof fnbOrderItems.$inferInsert;
export type OrderAnalytics = typeof orderAnalytics.$inferSelect;
export type NewOrderAnalytics = typeof orderAnalytics.$inferInsert; 