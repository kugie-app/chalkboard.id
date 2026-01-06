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
    id: Date.now(),
    name: 'Test Staff',
    role: 'STAFF',
    isActive: true,
    createdAt: new Date(),
    ...overrides,
  }),

  // Billiard table factory
  billiardTable: (overrides = {}) => ({
    id: uuidv4(),
    name: `Table ${Math.floor(Math.random() * 100)}`,
    type: 'POOL',
    status: 'AVAILABLE',
    location: 'Main Hall',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // Pricing package factory
  pricingPackage: (overrides = {}) => ({
    id: uuidv4(),
    name: 'Standard Package',
    description: 'Standard hourly rate',
    type: 'HOURLY',
    basePrice: 50000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // Table session factory
  tableSession: (overrides = {}) => ({
    id: uuidv4(),
    tableId: uuidv4(),
    startTime: new Date(),
    endTime: null,
    duration: null,
    baseAmount: 0,
    totalAmount: 0,
    isPaid: false,
    pricingPackageId: uuidv4(),
    customerId: null,
    staffId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // F&B Category factory
  fnbCategory: (overrides = {}) => ({
    id: uuidv4(),
    name: `Category ${Date.now()}`,
    description: 'Test category',
    isActive: true,
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // F&B Menu Item factory
  fnbMenuItem: (overrides = {}) => ({
    id: Date.now(),
    name: `Item ${Date.now()}`,
    description: 'Test menu item',
    categoryId: 1,
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
    id: uuidv4(),
    orderNumber: `ORD-${Date.now()}`,
    type: 'DINE_IN',
    status: 'PENDING',
    subtotal: 50000,
    tax: 5000,
    total: 55000,
    tableId: null,
    tableSessionId: null,
    customerId: null,
    staffId: uuidv4(),
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  // Order Item factory
  orderItem: (overrides = {}) => ({
    id: uuidv4(),
    orderId: uuidv4(),
    menuItemId: uuidv4(),
    quantity: 1,
    unitPrice: 25000,
    subtotal: 25000,
    notes: null,
    createdAt: new Date(),
    ...overrides,
  }),

  // Payment factory
  payment: (overrides = {}) => ({
    id: uuidv4(),
    transactionNumber: `TRX-${Date.now()}`,
    type: 'COMBINED',
    amount: 100000,
    paymentMethod: 'CASH',
    status: 'PENDING',
    tableSessionId: null,
    fnbOrderId: null,
    staffId: uuidv4(),
    notes: null,
    paidAt: null,
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
  await db.insert(table).values(items);
  return items;
}