import { pgTable, serial, varchar, text, decimal, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  // Remove orderId and sessionId - managed via reverse references
  transactionNumber: varchar('transaction_number', { length: 50 }).unique().notNull(),
  customerName: varchar('customer_name', { length: 100 }),
  customerPhone: varchar('customer_phone', { length: 20 }),
  tableAmount: decimal('table_amount', { precision: 10, scale: 2 }).default('0'),
  fnbAmount: decimal('fnb_amount', { precision: 10, scale: 2 }).default('0'),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).default('0'),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethods: text('payment_methods'), // JSON array for multiple payment types
  staffId: integer('staff_id'), // Will reference staff.id
  status: varchar('status', { length: 20 }).default('pending'), // pending, success, failed, cancelled
  
  // Legacy Midtrans fields (keeping for backward compatibility)
  transactionId: varchar('transaction_id', { length: 100 }).unique(),
  midtransOrderId: varchar('midtrans_order_id', { length: 100 }).unique(),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('IDR'),
  paymentMethod: varchar('payment_method', { length: 50 }),
  midtransResponse: text('midtrans_response'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert; 