"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import BreadcrumbComp from "@/components/layout/shared/breadcrumb/BreadcrumbComp";
import { Button, Select, Badge, Tabs } from "flowbite-react";
import {
  IconChartBar, IconClock,
  IconCoffee,
  IconTrendingUp,
  IconRefresh,
  IconCurrency,
  IconShoppingCart,
  IconTable, IconStar
} from "@tabler/icons-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// Components
import StatCard from "@/components/analytics/StatCard";
import PeakHoursChart from "@/components/analytics/PeakHoursChart";
import CardBox from "@/components/shared/CardBox";
import { AnalyticsData } from "@/lib/analytics-types";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";

// BCrumb will be constructed dynamically with translations

const EnhancedAnalytics = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const tAnalytics = useTranslations('Analytics');
  const tCommon = useTranslations('Common');
  
  const BCrumb = [
    {
      to: "/",
      title: tAnalytics('breadcrumbHome'),
    },
    {
      title: tAnalytics('breadcrumbAnalytics'),
    },
  ];
  const [loading, setLoading] = useState(true);
  const [timeView, setTimeView] = useState('7-daily'); // Combined time range and period
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    dailyStats: null,
    peakHours: null,
    tableUtilization: null,
    revenueBreakdown: null,
    fnbAnalytics: null,
    customerAnalytics: null,
    operationalMetrics: null,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const fetchAnalyticsData = async (timeViewValue: string = timeView) => {
    const [days, period] = timeViewValue.split('-');
    setLoading(true);
    setRefreshing(true);
    
    try {
      const [
        dailyStatsRes, 
        peakHoursRes, 
        tableUtilizationRes,
        revenueRes,
        fnbRes,
        customerRes,
        operationalRes
      ] = await Promise.all([
        fetch(`/api/analytics/daily-stats?days=${days}`),
        fetch(`/api/analytics/peak-hours?days=${days}`),
        fetch(`/api/analytics/table-utilization?days=${days}`),
        fetch(`/api/analytics/revenue?days=${days}&period=${period}`),
        fetch(`/api/analytics/fnb?days=${days}`),
        fetch(`/api/analytics/customers?days=${days}`),
        fetch(`/api/analytics/operations?days=${days}`),
      ]);

      const [
        dailyStats, 
        peakHours, 
        tableUtilization,
        revenueBreakdown,
        fnbAnalytics,
        customerAnalytics,
        operationalMetrics
      ] = await Promise.all([
        dailyStatsRes.ok ? dailyStatsRes.json() : null,
        peakHoursRes.ok ? peakHoursRes.json() : null,
        tableUtilizationRes.ok ? tableUtilizationRes.json() : null,
        revenueRes.ok ? revenueRes.json() : null,
        fnbRes.ok ? fnbRes.json() : null,
        customerRes.ok ? customerRes.json() : null,
        operationalRes.ok ? operationalRes.json() : null,
      ]);

      setAnalyticsData({
        dailyStats,
        peakHours,
        tableUtilization,
        revenueBreakdown,
        fnbAnalytics,
        customerAnalytics,
        operationalMetrics,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalyticsData(timeView);
    }
  }, [status, timeView]);

  const handleRefresh = () => {
    fetchAnalyticsData(timeView);
  };

  const handleTimeViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeView(event.target.value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    if (value == null || value == undefined) {
      return '0%';
    }
    if (value === 0) {
      return '0%';
    }
    return `${value.toFixed(1)}%`;
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

  const { 
    dailyStats, 
    peakHours, 
    revenueBreakdown, 
    fnbAnalytics, 
    customerAnalytics, 
    operationalMetrics 
  } = analyticsData;


  return (
    <>
      {/* Header with Controls */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            {tAnalytics('title')}
          </h1>
          <p className="text-bodytext mt-1">
            {tAnalytics('subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={timeView}
            onChange={handleTimeViewChange}
            className="w-48"
          >
            <option value="7-daily">{tAnalytics('timeRanges.last7DaysDaily')}</option>
            <option value="14-daily">{tAnalytics('timeRanges.last14DaysDaily')}</option>
            <option value="30-daily">{tAnalytics('timeRanges.last30DaysDaily')}</option>
            <option value="30-weekly">{tAnalytics('timeRanges.last30DaysWeekly')}</option>
            <option value="90-weekly">{tAnalytics('timeRanges.last90DaysWeekly')}</option>
            <option value="90-monthly">{tAnalytics('timeRanges.last90DaysMonthly')}</option>
          </Select>
          <Button 
            color="primary" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <IconRefresh className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {tAnalytics('refresh')}
          </Button>
        </div>
      </div>

      <Tabs aria-label="Enhanced Analytics tabs">
        <Tabs.Item active={activeTab === "overview"} title={tAnalytics('overview')} onClick={() => setActiveTab("overview")}>
          {/* Overview Stats Cards */}
          {dailyStats && revenueBreakdown && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard
                title={tAnalytics('cards.totalRevenue')}
                value={`Rp${Number(revenueBreakdown.summary.totalRevenue)}`}
                subtitle={`${Number(revenueBreakdown.summary.totalRevenue) > 0 ? '+' : ''}${formatPercentage(Number(revenueBreakdown.summary.totalRevenue))} ${tAnalytics('cards.vsLastPeriod')}`}
                icon={IconCurrency}
                color="primary"
                tCommon={tCommon}
              />
              <StatCard
                title={tAnalytics('cards.tableRevenue')}
                value={`Rp${Number(revenueBreakdown.summary.tableRevenue)}`}
                subtitle={`${dailyStats.sessions.totalSessions} ${tAnalytics('cards.sessions')}`}
                icon={IconTable}
                color="secondary"
                tCommon={tCommon}
              />
              <StatCard
                title={tAnalytics('cards.fnbRevenue')}
                value={`Rp${Number(revenueBreakdown.summary.fnbRevenue)}`}
                subtitle={`${dailyStats.fnb.totalOrders} ${tAnalytics('cards.orders')}`}
                icon={IconCoffee}
                color="success"
                tCommon={tCommon}
              />
              <StatCard
                title={tAnalytics('cards.activeTables')}
                value={`${dailyStats.sessions.activeSessions}/${dailyStats.tables.totalTables}`}
                subtitle={`${Math.round((Number(dailyStats.sessions.activeSessions) / Number(dailyStats.tables.totalTables)) * 100)}% ${tAnalytics('cards.utilization')}`}
                icon={IconChartBar}
                color="warning"
              />
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            {/* Revenue Trends */}
            {revenueBreakdown && (
              <div className="col-span-12 lg:col-span-8">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.revenueBreakdownTrends')}</h5>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueBreakdown.dailyRevenue}>
                          <defs>
                            <linearGradient id="tableGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="fnbGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            className="text-xs"
                          />
                          <YAxis 
                            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                            className="text-xs"
                          />
                          <Tooltip 
                            formatter={(value: any, name: any) => [
                              new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                              }).format(Number(value) || 0),
                              name === 'tableRevenue' ? tAnalytics('tooltip.tableRevenue') : 
                              name === 'fnbRevenue' ? tAnalytics('tooltip.fnbRevenue') : tAnalytics('tooltip.totalRevenue')
                            ]}
                            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="tableRevenue" 
                            stroke="#3b82f6" 
                            fill="url(#tableGradient)"
                            fillOpacity={0.6}
                            name={tAnalytics('tooltip.tableRevenue')}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="fnbRevenue" 
                            stroke="#10b981" 
                            fill="url(#fnbGradient)"
                            fillOpacity={0.6}
                            name={tAnalytics('tooltip.fnbRevenue')}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardBox>
              </div>
            )}

            {/* Quick Stats */}
            <div className="col-span-12 lg:col-span-4">
              <CardBox>
                <div className="p-6">
                  <h5 className="card-title mb-4">{tAnalytics('charts.quickStats')}</h5>
                  <div className="space-y-4">
                    {fnbAnalytics && (
                      <div className="flex items-center justify-between p-3 bg-lightprimary dark:bg-lightprimary/20 rounded-lg">
                        <div>
                          <p className="text-sm text-bodytext">{tAnalytics('charts.avgFnbOrderValue')}</p>
                          <p className="font-semibold text-primary">
                            {formatCurrency(Number(fnbAnalytics.avgOrderValue))}
                          </p>
                        </div>
                        <IconShoppingCart className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    
                    {customerAnalytics && (
                      <div className="flex items-center justify-between p-3 bg-lightsecondary dark:bg-lightsecondary/20 rounded-lg">
                        <div>
                          <p className="text-sm text-bodytext">{tAnalytics('charts.customerSatisfaction')}</p>
                          <p className="font-semibold text-secondary">
                            {Number(customerAnalytics.customerSatisfaction)}/5.0 ⭐
                          </p>
                        </div>
                        <IconStar className="w-8 h-8 text-secondary" />
                      </div>
                    )}

                    {operationalMetrics && (
                      <div className="flex items-center justify-between p-3 bg-lightsuccess dark:bg-lightsuccess/20 rounded-lg">
                        <div>
                          <p className="text-sm text-bodytext">{tAnalytics('charts.avgSessionDuration')}</p>
                          <p className="font-semibold text-success">
                            {Number(operationalMetrics.avgSessionDuration)} {tAnalytics('labels.min')}
                          </p>
                        </div>
                        <IconClock className="w-8 h-8 text-success" />
                      </div>
                    )}
                  </div>
                </div>
              </CardBox>
            </div>
          </div>
        </Tabs.Item>

        <Tabs.Item active={activeTab === "fnb"} title={tAnalytics('fnbAnalytics')} onClick={() => setActiveTab("fnb")}>
          <div className="grid grid-cols-12 gap-6">
            {/* Top Selling Items */}
            {fnbAnalytics && (
              <div className="col-span-12 lg:col-span-6">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.topSellingItems')}</h5>
                    <div className="space-y-3">
                                             {fnbAnalytics.topSellingItems.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-bodytext">{item.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(item.revenue)}</p>
                            <p className="text-xs text-bodytext">{item.quantity} {tAnalytics('labels.sold')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBox>
              </div>
            )}

            {/* Category Performance */}
            {fnbAnalytics && (
              <div className="col-span-12 lg:col-span-6">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.categoryPerformance')}</h5>
                    <div className="space-y-4">
                                             {fnbAnalytics.categoryPerformance.map((category: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h6 className="font-medium">{category.category}</h6>
                            <span className="text-lg font-bold">{formatCurrency(category.revenue)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-bodytext">{tAnalytics('cards.orders')}: </span>
                              <span className="font-medium">{category.orders}</span>
                            </div>
                            <div>
                              <span className="text-bodytext">{tAnalytics('labels.avgValue')}: </span>
                              <span className="font-medium">{formatCurrency(category.avgOrderValue)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBox>
              </div>
            )}

            {/* Draft Order Metrics */}
            {fnbAnalytics && (
              <div className="col-span-12">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.draftOrderPerformance')}</h5>
                    <div className="grid grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-lightinfo rounded-lg">
                        <h6 className="text-sm text-bodytext">{tAnalytics('labels.totalDrafts')}</h6>
                        <p className="text-3xl font-bold text-info">{fnbAnalytics.draftOrderMetrics.totalDrafts}</p>
                      </div>
                      <div className="text-center p-4 bg-lightsuccess rounded-lg">
                        <h6 className="text-sm text-bodytext">{tAnalytics('labels.assigned')}</h6>
                        <p className="text-3xl font-bold text-success">{fnbAnalytics.draftOrderMetrics.assignedDrafts}</p>
                      </div>
                      <div className="text-center p-4 bg-lightprimary rounded-lg">
                        <h6 className="text-sm text-bodytext">{tAnalytics('labels.conversionRate')}</h6>
                        <p className="text-3xl font-bold text-primary">{formatPercentage(fnbAnalytics.draftOrderMetrics.conversionRate)}</p>
                      </div>
                      <div className="text-center p-4 bg-lightwarning rounded-lg">
                        <h6 className="text-sm text-bodytext">{tAnalytics('labels.avgWaitTime')}</h6>
                        <p className="text-3xl font-bold text-warning">{fnbAnalytics.draftOrderMetrics.avgWaitTime} {tAnalytics('labels.min')}</p>
                      </div>
                    </div>
                  </div>
                </CardBox>
              </div>
            )}
          </div>
        </Tabs.Item>

        <Tabs.Item active={activeTab === "operations"} title={tAnalytics('operations')} onClick={() => setActiveTab("operations")}>
          <div className="grid grid-cols-12 gap-6">
            {/* Staff Performance */}
            {operationalMetrics && (
              <div className="col-span-12 lg:col-span-8">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.staffPerformance')}</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">{tAnalytics('labels.staffMember')}</th>
                            <th className="text-left py-2">{tAnalytics('labels.role')}</th>
                            <th className="text-right py-2">{tAnalytics('cards.orders')}</th>
                            <th className="text-right py-2">{tAnalytics('labels.revenue')}</th>
                            <th className="text-right py-2">{tAnalytics('labels.rating')}</th>
                          </tr>
                        </thead>
                        <tbody>
                                                     {operationalMetrics.staffPerformance.map((staff: any, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 font-medium">{staff.name}</td>
                              <td className="py-3 text-bodytext">{staff.role}</td>
                              <td className="py-3 text-right">{staff.ordersProcessed}</td>
                              <td className="py-3 text-right font-medium">{formatCurrency(staff.revenue)}</td>
                              <td className="py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <IconStar className="w-4 h-4 text-yellow-500" />
                                  <span>{staff.rating}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBox>
              </div>
            )}

            {/* Operational KPIs */}
            {operationalMetrics && (
              <div className="col-span-12 lg:col-span-4">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.operationalKPIs')}</h5>
                    <div className="space-y-4">
                      <div className="p-3 bg-lightprimary rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('labels.tableUtilization')}</p>
                        <p className="text-2xl font-bold text-primary">{formatPercentage(Number(operationalMetrics.tableUtilization))}</p>
                      </div>
                      
                      <div className="p-3 bg-lightsecondary rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('charts.avgSessionDuration')}</p>
                        <p className="text-2xl font-bold text-secondary">{operationalMetrics.avgSessionDuration} {tAnalytics('labels.min')}</p>
                      </div>
                      
                      <div className="p-3 bg-lightwarning rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('labels.inventoryAlerts')}</p>
                        <p className="text-2xl font-bold text-warning">{operationalMetrics.inventoryAlerts}</p>
                      </div>
                      
                      <div className="p-3 bg-lightinfo rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('labels.peakHours')}</p>
                        <p className="text-lg font-bold text-info">
                                                     {operationalMetrics.peakHours.map((h: number) => `${h}:00`).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBox>
              </div>
            )}

            {/* Peak Hours Chart */}
            {peakHours && (
              <div className="col-span-12">
                <PeakHoursChart
                  data={peakHours.hourlyData}
                  title={tAnalytics('charts.hourlyActivityDistribution')}
                  subtitle={tAnalytics('charts.sessionsRevenueAndFnbByHour')}
                />
              </div>
            )}
          </div>
        </Tabs.Item>

        <Tabs.Item active={activeTab === "customers"} title={tAnalytics('customerInsights')} onClick={() => setActiveTab("customers")}>
          <div className="grid grid-cols-12 gap-6">
            {/* Customer Overview */}
            {customerAnalytics && (
              <div className="col-span-12 lg:col-span-4">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.customerOverview')}</h5>
                    <div className="space-y-4">
                      <div className="p-3 bg-lightprimary rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('labels.totalCustomers')}</p>
                        <p className="text-3xl font-bold text-primary">{customerAnalytics.totalCustomers}</p>
                      </div>
                      
                      <div className="p-3 bg-lightsuccess rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('labels.returningCustomers')}</p>
                        <p className="text-2xl font-bold text-success">{customerAnalytics.returningCustomers}</p>
                        <p className="text-xs text-bodytext">
                          {formatPercentage((customerAnalytics.returningCustomers / customerAnalytics.totalCustomers) * 100)} {tAnalytics('labels.retention')}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-lightsecondary rounded-lg">
                        <p className="text-sm text-bodytext">{tAnalytics('labels.avgSpendPerCustomer')}</p>
                        <p className="text-2xl font-bold text-secondary">{formatCurrency(customerAnalytics.avgSpendPerCustomer)}</p>
                      </div>
                    </div>
                  </div>
                </CardBox>
              </div>
            )}

            {/* Visit Frequency */}
            {customerAnalytics && (
              <div className="col-span-12 lg:col-span-8">
                <CardBox>
                  <div className="p-6">
                    <h5 className="card-title mb-4">{tAnalytics('charts.visitFrequencyDistribution')}</h5>
                    <div className="space-y-3">
                                             {customerAnalytics.sessionFrequency.map((freq: any, index: number) => {
                        const percentage = (freq.count / customerAnalytics.totalCustomers) * 100;
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-primary rounded" style={{backgroundColor: `hsl(${index * 60}, 70%, 50%)`}}></div>
                              <span className="font-medium">{freq.frequency}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{width: `${percentage}%`}}
                                ></div>
                              </div>
                              <span className="font-bold w-12 text-right">{freq.count}</span>
                              <span className="text-xs text-bodytext w-12 text-right">{formatPercentage(percentage)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardBox>
              </div>
            )}
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default EnhancedAnalytics; 