// Base types
interface Period {
    startDate: string;
    endDate: string;
    days: number;
}

// Overall Statistics
interface OverallStats {
    totalItems: string;
    totalStockValue: string;
    outOfStockItems: string;
    lowStockItems: string;
    normalStockItems: string;
    avgStockLevel: string;
    totalCategories: string;
}

// Stock Levels
type StockStatus = 'high_stock' | 'normal_stock' | 'low_stock' | 'out_of_stock';

interface StockLevelItem {
    itemId: number;
    itemName: string;
    categoryId: number;
    categoryName: string;
    currentStock: number;
    minStockLevel: number;
    unit: string;
    price: string;
    cost: string;
    isActive: boolean;
    stockStatus: StockStatus;
    stockValue: string;
    daysUntilReorder: number;
}

// Stock Movement
interface StockMovementItem {
    itemId: number;
    itemName: string;
    totalSold: string;
    totalRevenue: string;
    avgDailyConsumption: string;
    orderCount: string;
    firstOrderDate: string;
    lastOrderDate: string;
}

// Stock Alerts (currently empty but typed for future use)
type AlertType = 'low_stock' | 'out_of_stock' | 'overstock' | 'expiration';
type AlertPriority = 'low' | 'medium' | 'high' | 'critical';

interface StockAlert {
    itemId: number;
    itemName: string;
    categoryId: number;
    categoryName: string;
    alertType: AlertType;
    priority: AlertPriority;
    message: string;
    currentStock: number;
    minStockLevel?: number;
    maxStockLevel?: number;
    expirationDate?: string;
    createdAt: string;
}

// Category Stock Summary
interface CategoryStockSummaryItem {
    categoryId: number;
    categoryName: string;
    totalItems: string;
    outOfStockItems: string;
    lowStockItems: string;
    normalStockItems: string;
    totalStockValue: string;
    avgStockLevel: string;
}

// Main interface
export interface InventoryAnalytics {
    period: Period;
    overallStats: OverallStats;
    stockLevels: StockLevelItem[];
    stockMovement: StockMovementItem[];
    stockAlerts: StockAlert[];
    categoryStockSummary: CategoryStockSummaryItem[];
}

// Export individual types for granular usage
export type {
    Period,
    OverallStats,
    StockStatus,
    StockLevelItem,
    StockMovementItem,
    AlertType,
    AlertPriority,
    StockAlert,
    CategoryStockSummaryItem,
};

// Utility types for working with inventory data
export interface InventoryMetrics {
    totalValue: number;
    stockTurnover: number;
    averageOrderSize: number;
    reorderFrequency: number;
}

export interface StockFilters {
    categoryId?: number;
    stockStatus?: StockStatus;
    isActive?: boolean;
    minStock?: number;
    maxStock?: number;
}

export interface InventoryReportOptions {
    period: Period;
    includeMovement: boolean;
    includeAlerts: boolean;
    groupByCategory: boolean;
    filters?: StockFilters;
}

export interface StockData {
    overallStats: OverallStats | null;
    stockLevels: StockLevelItem[] | null;
    stockMovement: StockMovementItem[] | null;
    stockAlerts: StockAlert[] | null;
    categoryStockSummary: CategoryStockSummaryItem[] | null;
}