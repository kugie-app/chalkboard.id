"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import CardBox from "@/components/shared/CardBox";
import { Button, Badge, Modal, TextInput, Label, Select, Alert } from "flowbite-react";
import Link from "next/link";
import { 
  IconClock, 
  IconUsers, 
  IconCoffee, 
  IconChartBar,
  IconPlayerPlay,
  IconPlayerStop,
  IconPlus,
  IconCreditCard
} from "@tabler/icons-react";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";

interface Table {
  id: number;
  name: string;
  status: string;
  hourlyRate: string;
  isActive: boolean;
}

interface TableSession {
  id: number;
  tableId: number;
  customerName: string;
  startTime: string;
  plannedDuration: number;
  status: string;
}

const ChalkBoardDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const tSessionModal = useTranslations('SessionModal');
  const tAlerts = useTranslations('Alerts');
  const [tables, setTables] = useState<Table[]>([]);
  const [sessions, setSessions] = useState<{ [key: number]: TableSession }>({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [billingData, setBillingData] = useState<any>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [stats, setStats] = useState({
    totalTables: 0,
    occupiedTables: 0,
    availableTables: 0,
    totalRevenue: 0,
  });
  const [dailyStats, setDailyStats] = useState({
    sessions: { totalRevenue: 0 },
    fnb: { totalRevenue: 0 }
  });

  // Form state for session modal
  const [sessionData, setSessionData] = useState({
    customerName: '',
    mode: 'open' as 'open' | 'planned',
    plannedDuration: 60
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch daily stats
  const fetchDailyStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/api/analytics/daily-stats?date=${today}&days=1`);
      if (response.ok) {
        const data = await response.json();
        setDailyStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch daily stats:', error);
    }
  };

  // Fetch tables data
  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables');
      if (response.ok) {
        const data = await response.json();
        const sortedTables = data.sort((a: Table, b: Table) => a.id - b.id);
        setTables(sortedTables);
        
        // Calculate stats
        const totalTables = data.length;
        const occupiedTables = data.filter((table: Table) => table.status === 'occupied').length;
        const availableTables = data.filter((table: Table) => table.status === 'available').length;
        
        setStats({
          totalTables,
          occupiedTables,
          availableTables,
          totalRevenue: 0, // Will be calculated from sessions
        });

        // Fetch current sessions for occupied tables
        data.forEach(async (table: Table) => {
          if (table.status === 'occupied') {
            const sessionResponse = await fetch(`/api/tables/${table.id}/current-session`);
            if (sessionResponse.ok) {
              const sessionData = await sessionResponse.json();
              if (sessionData.session) {
                setSessions(prev => ({
                  ...prev,
                  [table.id]: sessionData.session
                }));
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch tables:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTables();
      fetchDailyStats();
    }
  }, [session]);

  // Update current time every second for real-time duration display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (session) {
        fetchTables();
        fetchDailyStats();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'error';
      case 'maintenance':
        return 'warning';
      case 'reserved':
        return 'info';
      default:
        return 'muted';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'available': 
        return { backgroundColor: '#22C55E', color: 'white' };
      case 'occupied': 
        return { backgroundColor: '#EF4444', color: 'white' };
      case 'maintenance': 
        return { backgroundColor: '#F59E0B', color: 'white' };
      case 'reserved': 
        return { backgroundColor: '#3B82F6', color: 'white' };
      default: 
        return { backgroundColor: '#6B7280', color: 'white' };
    }
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateElapsedTime = (startTime: string) => {
    const start = new Date(startTime);
    const elapsed = Math.floor((currentTime.getTime() - start.getTime()) / 1000); // Return total seconds
    return elapsed;
  };

  const calculateBillableHours = (totalSeconds: number) => {
    // Round up to next hour - any partial hour counts as full hour
    const minutes = totalSeconds / 60;
    return Math.ceil(minutes / 60);
  };

  const calculateBillableMinutes = (totalSeconds: number) => {
    // Round up to next minute if >30 seconds
    const remainingSeconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return remainingSeconds > 30 ? minutes + 1 : minutes;
  };

  const calculateHourlyCost = (totalSeconds: number, hourlyRate: number) => {
    const billableHours = calculateBillableHours(totalSeconds);
    return billableHours * hourlyRate;
  };

  const calculatePerMinuteCost = (totalSeconds: number, perMinuteRate: number) => {
    const billableMinutes = calculateBillableMinutes(totalSeconds);
    return billableMinutes * perMinuteRate;
  };

  const getBillingInfo = (table: any, totalSeconds: number, session?: any) => {
    // Determine billing type based on session preference first, then table configuration
    const sessionDurationType = session?.durationType;
    const shouldUsePerMinute = sessionDurationType === 'per_minute' || 
                              (!sessionDurationType && table.perMinuteRate);
    
    if (shouldUsePerMinute) {
      const billableMinutes = calculateBillableMinutes(totalSeconds);
      const rate = table.perMinuteRate ? parseFloat(table.perMinuteRate) : parseFloat(table.hourlyRate) / 60;
      const cost = calculatePerMinuteCost(totalSeconds, rate);
      return {
        type: 'per_minute' as const,
        billableMinutes,
        cost,
        rate: rate,
        displayText: `${billableMinutes} min`,
        rateText: `${formatCurrency(rate)}/min`
      };
    } else {
      const billableHours = calculateBillableHours(totalSeconds);
      const cost = calculateHourlyCost(totalSeconds, parseFloat(table.hourlyRate));
      return {
        type: 'hourly' as const,
        billableHours,
        cost,
        rate: parseFloat(table.hourlyRate),
        displayText: `${billableHours} hours`,
        rateText: `${formatCurrency(parseFloat(table.hourlyRate))}/hour`
      };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleStartSession = async () => {
    if (!selectedTable) return;

    try {
      const response = await fetch(`/api/tables/${selectedTable.id}/start-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        showAlert('success', tAlerts('sessionStartedSuccess'));
        setShowSessionModal(false);
        setSelectedTable(null);
        setSessionData({ customerName: '', mode: 'open', plannedDuration: 60 });
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('genericError'));
      }
    } catch (error) {
      showAlert('error', tAlerts('genericError'));
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

  return (
    <div className="space-y-6">
      {/* Alert */}
      {alert && (
        <Alert color={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            {t('title')}
          </h1>
          <p className="text-bodytext mt-1">
            {t('subtitle', { name: session?.user?.name || 'Admin' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/pos">
            <Button color="secondary" size="sm">
              <IconCoffee className="w-4 h-4 mr-2" />
              {t('buttons.posSystem')}
            </Button>
          </Link>
          <Link href="/tables">
            <Button color="primary" size="sm">
              <IconPlus className="w-4 h-4 mr-2" />
              {t('buttons.addTable')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodytext text-sm">{t('stats.totalTables')}</p>
              <p className="text-2xl font-bold text-dark dark:text-white">
                {stats.totalTables}
              </p>
            </div>
            <div className="p-3 bg-lightprimary rounded-lg">
              <IconChartBar className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardBox>

        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodytext text-sm">{t('stats.occupied')}</p>
              <p className="text-2xl font-bold text-error">
                {stats.occupiedTables}
              </p>
            </div>
            <div className="p-3 bg-lighterror rounded-lg">
              <IconUsers className="w-6 h-6 text-error" />
            </div>
          </div>
        </CardBox>

        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodytext text-sm">{t('stats.available')}</p>
              <p className="text-2xl font-bold text-success">
                {stats.availableTables}
              </p>
            </div>
            <div className="p-3 bg-lightsuccess rounded-lg">
              <IconClock className="w-6 h-6 text-success" />
            </div>
          </div>
        </CardBox>

        <CardBox>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodytext text-sm">{t('stats.todaysRevenue')}</p>
              <p className="text-2xl font-bold text-dark dark:text-white">
                {formatCurrency((dailyStats.sessions.totalRevenue || 0) + (dailyStats.fnb.totalRevenue || 0))}
              </p>
            </div>
            <div className="p-3 bg-lightinfo rounded-lg">
              <IconCoffee className="w-6 h-6 text-info" />
            </div>
          </div>
        </CardBox>
      </div>

      {/* Tables Grid */}
      <CardBox>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-dark dark:text-white">
            {t('tableStatusBoard.title')}
          </h2>
          <Button color="muted" size="sm" onClick={fetchTables}>
            {t('tableStatusBoard.refresh')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tables.map((table) => {
            const session = sessions[table.id];
            const isOccupied = table.status === 'occupied';
            const elapsedTime = session ? calculateElapsedTime(session.startTime) : 0;
            const billingInfo = getBillingInfo(table, elapsedTime, session);

            return (
              <div
                key={table.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isOccupied 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-green-500 bg-green-50 dark:bg-green-900/20'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h1 className="font-semibold text-dark dark:text-white">
                    {table.name}
                  </h1>
                  <Badge 
                    color={getStatusColor(table.status)} 
                    size="sm"
                    style={getStatusBadgeStyle(table.status)}
                  >
                    {table.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-bodytext">
                    {t('tableStatusBoard.rate')}: {billingInfo.rateText}
                  </p>
                  
                  {isOccupied && session ? (
                    <>
                      <p className="text-dark dark:text-white">
                        {t('tableStatusBoard.customer')}: <strong>{session.customerName}</strong>
                      </p>
                      <p className="text-dark dark:text-white">
                        {t('tableStatusBoard.duration')}: <strong>{formatDuration(elapsedTime)}</strong>
                      </p>
                      <p className="text-dark dark:text-white">
                        {billingInfo.type === 'per_minute' ? 'Billable Minutes' : t('tableStatusBoard.billableHours')}: <strong>{billingInfo.displayText}</strong>
                      </p>
                      <p className="text-dark dark:text-white">
                        {t('tableStatusBoard.cost')}: <strong>{formatCurrency(billingInfo.cost)}</strong>
                      </p>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {tables.length === 0 && (
          <div className="text-center py-12">
            <p className="text-bodytext mb-4">{t('noTables')}</p>
            <Link href="/tables">
              <Button color="primary">
                <IconPlus className="w-4 h-4 mr-2" />
                {t('createFirstTable')}
              </Button>
            </Link>
          </div>
        )}
      </CardBox>

      {/* Start Session Modal */}
      <Modal show={showSessionModal} onClose={() => setShowSessionModal(false)}>
        <Modal.Header>{tSessionModal('startTitle', { tableName: selectedTable?.name || '' })}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName" value={tSessionModal('customerName')} />
              <TextInput
                id="customerName"
                value={sessionData.customerName}
                onChange={(e) => setSessionData({ ...sessionData, customerName: e.target.value })}
                placeholder={tSessionModal('customerNamePlaceholder')}
                required
              />
            </div>
            <div>
              <Label htmlFor="sessionMode" value={tSessionModal('modeLabel')} />
              <Select
                id="sessionMode"
                value={sessionData.mode}
                onChange={(e) => setSessionData({ ...sessionData, mode: e.target.value as 'open' | 'planned' })}
              >
                <option value="open">{tSessionModal('modeOptions.open')}</option>
                <option value="planned">{tSessionModal('modeOptions.planned')}</option>
              </Select>
            </div>
            {sessionData.mode === 'planned' && (
              <div>
                <Label htmlFor="plannedDuration" value={tSessionModal('plannedDuration')} />
                <Select
                  id="plannedDuration"
                  value={sessionData.plannedDuration}
                  onChange={(e) => setSessionData({ ...sessionData, plannedDuration: parseInt(e.target.value) })}
                >
                  <option value={30}>{tSessionModal('durationOptions.30minutes')}</option>
                  <option value={60}>{tSessionModal('durationOptions.60minutes')}</option>
                  <option value={90}>{tSessionModal('durationOptions.90minutes')}</option>
                  <option value={120}>{tSessionModal('durationOptions.120minutes')}</option>
                  <option value={180}>{tSessionModal('durationOptions.180minutes')}</option>
                </Select>
              </div>
            )}
            <div className="p-3 bg-lightinfo rounded-lg">
              <p className="text-sm text-info">
                <IconClock className="w-4 h-4 inline mr-1" />
                {tSessionModal('estimatedCost', { 
                  cost: formatCurrency(((sessionData.plannedDuration / 60) * parseFloat(selectedTable?.hourlyRate || '0')))
                })}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleStartSession}>
            <IconPlayerPlay className="w-4 h-4 mr-2" />
            {tSessionModal('startButton')}
          </Button>
          <Button color="secondary" onClick={() => setShowSessionModal(false)}>
            {tSessionModal('cancelButton')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Billing Modal */}
      <Modal show={showBillingModal} onClose={() => setShowBillingModal(false)} size="lg">
        <Modal.Header>{t('billingModal.title')}</Modal.Header>
        <Modal.Body>
          {billingData && (
            <div className="space-y-6">
              {/* Session Info */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
                  {t('billingModal.sessionDetails')}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-bodytext">{t('billingModal.customer')}:</span>
                    <span className="ml-2 font-medium text-dark dark:text-white">
                      {billingData.session.customerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-bodytext">{t('billingModal.duration')}:</span>
                    <span className="ml-2 font-medium text-dark dark:text-white">
                      {formatDuration(billingData.billing.actualDuration * 60)}
                    </span>
                  </div>
                  <div>
                    <span className="text-bodytext">{t('billingModal.billableHours')}:</span>
                    <span className="ml-2 font-medium text-dark dark:text-white">
                      {billingData.billing.billableHours} hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Table Cost */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
                  {t('billingModal.tableCost')}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-bodytext">
                    {billingData.billing.billableHours} hours × {formatCurrency(parseFloat(selectedTable?.hourlyRate || '0'))}
                  </span>
                  <span className="font-medium text-dark dark:text-white">
                    {formatCurrency(billingData.billing.tableCost)}
                  </span>
                </div>
              </div>

              {/* F&B Orders */}
              {billingData.billing.fnbOrders.length > 0 && (
                <div className="border-b pb-4">
                                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
                  {t('billingModal.fnbOrders')}
                </h3>
                  <div className="space-y-2">
                    {billingData.billing.fnbOrders.map((order: any, index: number) => (
                      <div key={order.id} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="text-bodytext">Order #{order.orderNumber}</span>
                          <span className="ml-2 text-bodytext">({order.customerName})</span>
                        </div>
                        <span className="font-medium text-dark dark:text-white">
                          {formatCurrency(parseFloat(order.total))}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t flex justify-between items-center">
                    <span className="text-bodytext">{t('billingModal.fnbSubtotal')}:</span>
                    <span className="font-medium text-dark dark:text-white">
                      {formatCurrency(billingData.billing.fnbTotalCost)}
                    </span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="bg-lightprimary rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-dark dark:text-white">
                    {t('billingModal.totalAmount')}:
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(billingData.billing.totalCost)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => {
            // Navigate to transactions page to handle payment
            router.push('/transactions');
            setShowBillingModal(false);
            showAlert('success', tAlerts('paymentRecordCreated'));
          }}>
            <IconCreditCard className="w-4 h-4 mr-2" />
            {t('billingModal.processPayment')}
          </Button>
          <Button color="secondary" onClick={() => setShowBillingModal(false)}>
            {t('billingModal.closeButton')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChalkBoardDashboard; 