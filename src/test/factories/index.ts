import { v4 as uuidv4 } from 'uuid';
import { 
  tables as billiardTables, 
  pricingPackages, 
  tableSessions, 
  fnbCategories,
  fnbItems,
  fnbOrders,
  fnbOrderItems,
  payments,
  users,
  staff
} from '@/schema';

// Counter for generating unique numeric IDs
let nextId = 1;

// Factory for creating test data
export const factories = {
  // User factory
  user: (overrides = {}) => ({
    id: uuidv4(),
    email: `user-${Date.now()}@test.com`,
    name: 'Test User',
    password: '$2a$10$K7L1OJ0/3X2iV9V9R9Hnze5lJF0GkR0MG9v2L2CJNqk9CTqgKl6Oi', // 'password123'
    role: 'CUSTOMER',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // Staff factory
  staff: (overrides = {}) => ({
    name: 'Test Staff',
    role: 'STAFF',
    isActive: true,
    createdAt: new Date(),
    ...overrides,
  }),

  // Billiard table factory
  billiardTable: (overrides = {}) => ({
    name: `Table ${Math.floor(Math.random() * 100)}`,
    status: 'available',
    hourlyRate: '50000.00',
    perMinuteRate: '1000.00',
    pricingPackageId: null, // Default to null for optional foreign key
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // Pricing package factory
  pricingPackage: (overrides = {}) => ({
    id: uuidv4(), // Generate UUID for consistent ID
    name: 'Standard Package',
    description: 'Standard hourly rate',
    category: 'hourly',
    hourlyRate: '50000.00',
    perMinuteRate: '1000.00',
    isDefault: false,
    isActive: true,
    sortOrder: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // Table session factory
  tableSession: (overrides = {}) => ({
    tableId: null, // Must be set in tests when creating related table
    customerName: 'Test Customer',
    customerPhone: '081234567890',
    startTime: new Date(),
    endTime: null,
    plannedDuration: 60,
    actualDuration: null,
    durationType: 'hourly',
    pricingPackageId: null, // Will be set in tests when referencing package
    totalCost: '50000.00',
    status: 'active',
    staffId: null, // Must be set in tests when creating related staff
    createdAt: new Date(),
    ...overrides,
  }),

  // F&B Category factory
  fnbCategory: (overrides = {}) => ({
    name: `Category ${nextId++}`,
    description: 'Test category',
    isActive: true,
    createdAt: new Date(),
    ...overrides,
  }),

  // F&B Menu Item factory
  fnbMenuItem: (overrides = {}) => ({
    name: `Item ${nextId++}`,
    description: 'Test menu item',
    categoryId: null, // Must be set in tests when creating related category
    price: '25000.00',
    stockQuantity: 100,
    minStockLevel: 10,
    unit: 'pcs',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // F&B Order factory
  fnbOrder: (overrides = {}) => ({
    orderNumber: `ORD-${nextId++}`,
    tableId: null, // Optional - can be null for standalone orders
    customerName: 'Test Customer',
    customerPhone: '081234567890',
    subtotal: '50000.00',
    tax: '5000.00',
    total: '55000.00',
    status: 'pending',
    staffId: null, // Must be set in tests when creating related staff
    notes: null,
    createdAt: new Date(),
    ...overrides,
  }),

  // Order Item factory
  orderItem: (overrides = {}) => ({
    orderId: null, // Must be set in tests when creating related order
    itemId: null, // Must be set in tests when creating related item
    quantity: 1,
    unitPrice: '25000.00',
    subtotal: '25000.00',
    ...overrides,
  }),

  // Payment factory
  payment: (overrides = {}) => ({
    transactionNumber: `TRX-${nextId++}`,
    customerName: 'Test Customer',
    customerPhone: '081234567890',
    tableAmount: '0.00',
    fnbAmount: '100000.00',
    discountAmount: '0.00',
    taxAmount: '10000.00',
    totalAmount: '110000.00',
    paymentMethods: '[{"type":"cash","amount":110000}]',
    staffId: null, // Must be set in tests when creating related staff
    status: 'pending',
    amount: '110000.00',
    currency: 'IDR',
    paymentMethod: 'cash',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),
};

// Bulk creation helpers
export async function createBulk<T>(
  db: any,
  table: any,
  factory: (overrides?: any) => any,
  count: number,
  overrides: any = {}
): Promise<T[]> {
  const items = Array.from({ length: count }, () => factory(overrides));
  const result = await db.insert(table).values(items).returning();
  return result;
}

// Helper functions for creating test data with proper dependencies
export async function createTestStaff(db: any, overrides = {}) {
  const staffData = factories.staff(overrides);
  const [staff] = await db.insert(staff).values(staffData).returning();
  return staff;
}

export async function createTestPricingPackage(db: any, overrides = {}) {
  const packageData = factories.pricingPackage(overrides);
  const [pricingPackage] = await db.insert(pricingPackages).values(packageData).returning();
  return pricingPackage;
}

export async function createTestFnbCategory(db: any, overrides = {}) {
  const categoryData = factories.fnbCategory(overrides);
  const [category] = await db.insert(fnbCategories).values(categoryData).returning();
  return category;
}

export async function createTestFnbItem(db: any, categoryId: number, overrides = {}) {
  const itemData = factories.fnbMenuItem({ categoryId, ...overrides });
  const [item] = await db.insert(fnbItems).values(itemData).returning();
  return item;
}

export async function createTestOrder(db: any, staffId: number, overrides = {}) {
  const orderData = factories.fnbOrder({ staffId, ...overrides });
  const [order] = await db.insert(fnbOrders).values(orderData).returning();
  return order;
}