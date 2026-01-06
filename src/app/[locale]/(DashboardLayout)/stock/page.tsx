"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import BreadcrumbComp from "@/components/layout/shared/breadcrumb/BreadcrumbComp";
import { Button, Select, Table, Badge } from "flowbite-react";
import { 
  IconBox, 
  IconAlertTriangle, 
  IconTrendingDown,
  IconPackage,
  IconRefresh,
  IconChartBar
} from "@tabler/icons-react";

// Components
import StatCard from "@/components/analytics/StatCard";
import CardBox from "@/components/shared/CardBox";
import { StockData, StockMovementItem } from "@/lib/stock-analytics-type";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";

// BCrumb will be constructed dynamically with translations

const StockReport = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const tStock = useTranslations('Stock');
  const tCommon = useTranslations('Common');
  
  const BCrumb = [
    {
      to: "/",
      title: tStock('breadcrumbHome'),
    },
    {
      title: tStock('breadcrumbStock'),
    },
  ];
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  const [stockData, setStockData] = useState<StockData>({
    overallStats: null,
    stockLevels: null,
    stockMovement: null,
    stockAlerts: null,
    categoryStockSummary: null,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const fetchStockData = async (days: string) => {
    setLoading(true);
    setRefreshing(true);
    
    try {
      const response = await fetch(`/api/analytics/stock?days=${days}`);
      const data = await response.json();

      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchStockData(timeRange);
    }
  }, [status, timeRange]);

  const handleRefresh = () => {
    fetchStockData(timeRange);
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case 'out_of_stock':
        return <Badge color="failure">{tStock('status.outOfStock')}</Badge>;
      case 'low_stock':
        return <Badge color="warning">{tStock('status.lowStock')}</Badge>;
      case 'medium_stock':
        return <Badge color="info">{tStock('status.mediumStock')}</Badge>;
      case 'high_stock':
        return <Badge color="success">{tStock('status.highStock')}</Badge>;
      default:
        return <Badge color="gray">{tStock('status.unknown')}</Badge>;
    }
  };

  const getAlertBadge = (alertType: string) => {
    switch (alertType) {
      case 'OUT_OF_STOCK':
        return <Badge color="failure">{tStock('status.outOfStock')}</Badge>;
      case 'LOW_STOCK':
        return <Badge color="warning">{tStock('status.lowStock')}</Badge>;
      default:
        return <Badge color="gray">{tStock('status.normal')}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'HIGH':
        return <Badge color="failure">{tStock('status.high')}</Badge>;
      case 'MEDIUM':
        return <Badge color="warning">{tStock('status.medium')}</Badge>;
      case 'LOW':
        return <Badge color="info">{tStock('status.low')}</Badge>;
      default:
        return <Badge color="gray">{tStock('status.normal')}</Badge>;
    }
  };

  const formatCompactCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    
    if (absAmount >= 1000000000) {
      return `Rp${(amount / 1000000000).toFixed(1)}${tCommon('currency.compact.billion')}`;
    } else if (absAmount >= 1000000) {
      return `Rp${(amount / 1000000).toFixed(1)}${tCommon('currency.compact.million')}`;
    } else if (absAmount >= 1000) {
      return `Rp${(amount / 1000).toFixed(1)}${tCommon('currency.compact.thousand')}`;
    } else {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <DefaultSpinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-64">
        <DefaultSpinner />
      </div>
    );
  }

  const { overallStats, stockLevels, stockMovement, stockAlerts, categoryStockSummary } = stockData;

  return (
    <>
      <BreadcrumbComp title={tStock('title')} items={BCrumb} />
      {/* Header with Controls */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            {tStock('title')}
          </h1>
          <p className="text-bodytext mt-1">
            {tStock('subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="w-48"
          >
            <option value="7">{tStock('timeRanges.last7Days')}</option>
            <option value="14">{tStock('timeRanges.last14Days')}</option>
            <option value="30">{tStock('timeRanges.last30Days')}</option>
            <option value="90">{tStock('timeRanges.last90Days')}</option>
          </Select>
          <Button 
            color="primary" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <IconRefresh className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {tStock('refresh')}
          </Button>
        </div>
      </div>

      {/* Stock Summary Cards */}
      {overallStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title={tStock('cards.totalItems')}
            value={overallStats.totalItems}
            subtitle={`${overallStats.totalCategories} ${tStock('cards.categories')}`}
            icon={IconBox}
            color="primary"
          />
          <StatCard
            title={tStock('cards.stockValue')}
            value={formatCompactCurrency(Number(overallStats.totalStockValue))}
            subtitle={tStock('cards.totalInventoryValue')}
            icon={IconChartBar}
            color="success"
            tCommon={tCommon}
          />
          <StatCard
            title={tStock('cards.lowStockItems')}
            value={overallStats.lowStockItems}
            subtitle={tStock('cards.needAttention')}
            icon={IconAlertTriangle}
            color="warning"
          />
          <StatCard
            title={tStock('cards.outOfStock')}
            value={overallStats.outOfStockItems}
            subtitle={tStock('cards.urgentReorder')}
            icon={IconTrendingDown}
            color="error"
          />
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Stock Alerts */}
        {stockAlerts && stockAlerts.length > 0 && (
          <div className="col-span-12 lg:col-span-6">
            <CardBox>
              <h5 className="card-title mb-4">{tStock('sections.stockAlerts')}</h5>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stockAlerts.map((alert: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-lightgray dark:bg-darkmuted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{alert.itemName}</p>
                          <p className="text-sm text-bodytext">{alert.categoryName}</p>
                        </div>
                        <div className="flex gap-2">
                          {getAlertBadge(alert.alertType)}
                          {getUrgencyBadge(alert.urgency)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {alert.currentStock} / {alert.minStockLevel}
                      </p>
                      <p className="text-sm text-bodytext">
                        {tStock('labels.reorder')}: {alert.suggestedReorderQuantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBox>
          </div>
        )}

        {/* Category Stock Summary */}
        {categoryStockSummary && categoryStockSummary.length > 0 && (
          <div className="col-span-12">
            <CardBox>
              <h5 className="card-title mb-4">{tStock('sections.categoryOverview')}</h5>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {categoryStockSummary.map((category: any, index: number) => (
                  <div key={index} className="p-3 bg-lightgray dark:bg-darkmuted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium">{category.categoryName}</h6>
                      <span className="text-sm text-bodytext">
                        {category.totalItems} {tStock('labels.items')}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-success">{category.normalStockItems}</p>
                        <p className="text-bodytext">{tStock('status.normal')}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-warning">{category.lowStockItems}</p>
                        <p className="text-bodytext">{tStock('status.low')}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-error">{category.outOfStockItems}</p>
                        <p className="text-bodytext">{tStock('status.outOfStock')}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm text-bodytext">
                        {tStock('labels.totalValue')}: {formatCompactCurrency(category.totalStockValue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBox>
          </div>
        )}

        {/* Stock Levels Table */}
        {stockLevels && stockLevels.length > 0 && (
          <div className="col-span-12">
            <CardBox>
              <h5 className="card-title mb-4">{tStock('sections.currentStockLevels')}</h5>
              <div className="overflow-x-auto">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>{tStock('table.itemName')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.category')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.currentStock')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.minLevel')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.status')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.unit')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.stockValue')}</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {stockLevels.slice(0, 20).map((item: any, index: number) => (
                      <Table.Row key={index} className="bg-white dark:bg-gray-800">
                        <Table.Cell className="font-medium">
                          {item.itemName}
                        </Table.Cell>
                        <Table.Cell>{item.categoryName}</Table.Cell>
                        <Table.Cell>
                          <span className={`font-semibold ${
                            item.currentStock === 0 ? 'text-error' : 
                            item.currentStock <= item.minStockLevel ? 'text-warning' : 
                            'text-success'
                          }`}>
                            {item.currentStock}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{item.minStockLevel}</Table.Cell>
                        <Table.Cell>
                          {getStockStatusBadge(item.stockStatus)}
                        </Table.Cell>
                        <Table.Cell>{item.unit}</Table.Cell>
                        <Table.Cell>
                          {formatCompactCurrency(item.stockValue)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </CardBox>
          </div>
        )}

        {/* Stock Movement */}
        {stockMovement && stockMovement.length > 0 && (
          <div className="col-span-12">
            <CardBox>
              <h5 className="card-title mb-4">{tStock('sections.stockMovement', { days: timeRange })}</h5>
              <div className="overflow-x-auto">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>{tStock('table.itemName')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.totalSold')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.revenue')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.dailyAvg')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.orders')}</Table.HeadCell>
                    <Table.HeadCell>{tStock('table.lastOrder')}</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {stockMovement.slice(0, 15).map((item: StockMovementItem, index: number) => (
                      <Table.Row key={index} className="bg-white dark:bg-gray-800">
                        <Table.Cell className="font-medium">
                          {item.itemName}
                        </Table.Cell>
                        <Table.Cell>{item.totalSold}</Table.Cell>
                        <Table.Cell>
                          {formatCompactCurrency(Number(item.totalRevenue))}
                        </Table.Cell>
                        <Table.Cell>
                          {item.avgDailyConsumption == null ? '0' : Number(item.avgDailyConsumption).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>{item.orderCount}</Table.Cell>
                        <Table.Cell>
                          {item.lastOrderDate ? 
                            new Date(item.lastOrderDate).toLocaleDateString() : 
                            tStock('labels.na')
                          }
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </CardBox>
          </div>
        )}
      </div>
    </>
  );
};

export default StockReport; 