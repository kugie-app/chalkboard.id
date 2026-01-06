// Base types
interface Period {
  startDate: string;
  endDate: string;
  days: number;
}

interface TableStats {
  totalTables: string;
  activeTables: string;
  availableTables: string;
}

interface SessionStats {
  totalSessions: string;
  completedSessions: string;
  activeSessions: string;
  avgDuration: string;
  totalRevenue: string;
}

interface FnbStats {
  totalOrders: string;
  totalRevenue: string;
  avgOrderValue: string;
}

interface DailyBreakdownItem {
  date: string;
  sessions: string;
  revenue: string;
  avgDuration: string;
}

interface DailyStats {
  period: Period;
  tables: TableStats;
  sessions: SessionStats;
  fnb: FnbStats;
  dailyBreakdown: DailyBreakdownItem[];
}

// Peak Hours types
interface HourlyDataItem {
  hour: number;
  sessions: number;
  sessionRevenue: number;
  avgDuration: number;
  fnbOrders: number;
  fnbRevenue: number;
  totalRevenue: number;
}

interface DayOfWeekDataItem {
  dayOfWeek: string;
  dayName: string;
  sessions: string;
  revenue: string;
}

interface PeakHourItem {
  hour: number;
  sessions: number;
  sessionRevenue: number;
  avgDuration: number;
  fnbOrders: number;
  fnbRevenue: number;
  totalRevenue: number;
}

interface PeakHours {
  period: Period;
  hourlyData: HourlyDataItem[];
  dayOfWeekData: DayOfWeekDataItem[];
  peakHours: {
    sessions: PeakHourItem;
    revenue: PeakHourItem;
  };
}

// Table Utilization types
interface OverallStats {
  totalTables: string;
  activeTables: string;
  avgUtilization: string;
  totalRevenue: string;
  totalHours: string;
}

interface TableUtilizationItem {
  tableId: number;
  tableName: string;
  hourlyRate: string;
  currentStatus: string;
  totalSessions: string;
  totalRevenue: string;
  totalHours: string;
  avgSessionDuration: string;
  utilizationRate: string;
}

interface HourlyUtilizationItem {
  hour: number;
  activeSessions: number;
  utilizationPercent: number;
}

interface TableUtilization {
  period: Period;
  overallStats: OverallStats;
  tableUtilization: TableUtilizationItem[];
  hourlyUtilization: HourlyUtilizationItem[];
}

// Revenue Breakdown types
interface RevenueSummary {
  tableRevenue: string;
  fnbRevenue: string;
  totalRevenue: string;
  tableSessions: string;
  fnbOrders: string;
}

interface DailyRevenueItem {
  date: string;
  tableRevenue: string;
  fnbRevenue: string;
  totalRevenue: string;
  sessions: string;
  orders: string;
}

interface TableRevenueItem {
  tableId: number;
  tableName: string;
  totalRevenue: string;
  totalSessions: string;
  avgRevenuePerSession: string;
  totalHours: string;
  hourlyRate: string;
}

interface PaymentMethodItem {
  paymentMethod: string;
  totalAmount: string;
  transactionCount: string;
  successRate: string;
}

interface TopSellingItem {
  itemId: number;
  itemName: string;
  totalQuantity: string;
  totalRevenue: string;
  avgPrice: string;
  orderCount: string;
}

interface HourlyRevenueItem {
  hour: number;
  tableRevenue: number;
  fnbRevenue: number;
  totalRevenue: number;
}

interface RevenueBreakdown {
  period: Period;
  summary: RevenueSummary;
  dailyRevenue: DailyRevenueItem[];
  tableRevenue: TableRevenueItem[];
  paymentMethods: PaymentMethodItem[];
  topSellingItems: TopSellingItem[];
  hourlyRevenue: HourlyRevenueItem[];
}

// F&B Analytics types
interface FnbTopSellingItem {
  name: string;
  quantity: string;
  revenue: string;
  category: string;
}

interface CategoryPerformanceItem {
  category: string;
  revenue: string;
  orders: string;
  avgOrderValue: string;
}

interface DraftOrderMetrics {
  totalDrafts: number;
  assignedDrafts: number;
  conversionRate: number;
  avgWaitTime: number;
}

interface FnbAnalytics {
  topSellingItems: FnbTopSellingItem[];
  categoryPerformance: CategoryPerformanceItem[];
  avgOrderValue: number;
  orderConversionRate: number;
  draftOrderMetrics: DraftOrderMetrics;
}

// Customer Analytics types
interface SessionFrequencyItem {
  frequency: string;
  count: number;
}

interface CustomerAnalytics {
  totalCustomers: number;
  returningCustomers: number;
  avgSpendPerCustomer: number;
  sessionFrequency: SessionFrequencyItem[];
  customerSatisfaction: number;
}

// Operational Metrics types
interface StaffPerformanceItem {
  name: string;
  role: string;
  ordersProcessed: number;
  revenue: number;
  rating: number;
}

interface OperationalMetrics {
  staffPerformance: StaffPerformanceItem[];
  tableUtilization: number;
  avgSessionDuration: number;
  peakHours: number[];
  inventoryAlerts: number;
}

// Main interface
export interface RestaurantAnalytics {
  dailyStats: DailyStats;
  peakHours: PeakHours;
  tableUtilization: TableUtilization;
  revenueBreakdown: RevenueBreakdown;
  fnbAnalytics: FnbAnalytics;
  customerAnalytics: CustomerAnalytics;
  operationalMetrics: OperationalMetrics;
}

export interface AnalyticsData {
  dailyStats: DailyStats | null;
  peakHours: PeakHours | null;
  tableUtilization: TableUtilization | null;
  revenueBreakdown: RevenueBreakdown | null;
  fnbAnalytics: FnbAnalytics | null;
  customerAnalytics: CustomerAnalytics | null;
  operationalMetrics: OperationalMetrics | null;
}

// Export all individual types for granular usage
export type {
  Period,
  TableStats,
  SessionStats,
  FnbStats,
  DailyBreakdownItem,
  DailyStats,
  HourlyDataItem,
  DayOfWeekDataItem,
  PeakHourItem,
  PeakHours,
  OverallStats,
  TableUtilizationItem,
  HourlyUtilizationItem,
  TableUtilization,
  RevenueSummary,
  DailyRevenueItem,
  TableRevenueItem,
  PaymentMethodItem,
  TopSellingItem,
  HourlyRevenueItem,
  RevenueBreakdown,
  FnbTopSellingItem,
  CategoryPerformanceItem,
  DraftOrderMetrics,
  FnbAnalytics,
  SessionFrequencyItem,
  CustomerAnalytics,
  StaffPerformanceItem,
  OperationalMetrics,
};