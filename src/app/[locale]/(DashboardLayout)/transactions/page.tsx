"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import CardBox from "@/components/shared/CardBox";
import { Button, Badge, Table, Modal, Alert, Select, Label, TextInput } from "flowbite-react";
import {
  IconRefresh,
  IconEye,
  IconCreditCard,
  IconQrcode,
  IconCheck,
  IconX, IconDownload, IconPrinter
} from "@tabler/icons-react";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";

interface TableSession {
  id: number;
  tableId: number;
  tableName: string | null;
  customerName: string;
  customerPhone: string | null;
  startTime: string;
  endTime: string | null;
  plannedDuration: number;
  actualDuration: number | null;
  totalCost: string | null;
  status: string;
  sessionRating: number | null;
  fnbOrderCount: number;
}

interface FnbOrderItem {
  id: number;
  itemId: number;
  itemName: string | null;
  itemDescription: string | null;
  categoryName: string | null;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  unit: string | null;
}

interface FnbOrder {
  id: number;
  orderNumber: string;
  tableId: number | null;
  tableName: string | null;
  customerName: string | null;
  customerPhone: string | null;
  subtotal: string;
  tax: string;
  total: string;
  status: string;
  staffId: number | null;
  staffName: string | null;
  notes: string | null;
  createdAt: string;
  items: FnbOrderItem[];
}

interface Payment {
  id: number;
  transactionNumber: string;
  transactionId: string;
  midtransOrderId: string;
  amount: string;
  totalAmount: string;
  tableAmount: string;
  fnbAmount: string;
  discountAmount: string;
  taxAmount: string;
  currency: string;
  paymentMethod: string | null;
  status: string;
  midtransResponse: string | null;
  createdAt: string;
  updatedAt: string;
  customerName: string | null;
  customerPhone: string | null;
  tableSessions: TableSession[];
  fnbOrders: FnbOrder[];
}

const TransactionsPage = () => {
  const sessionHook = useSession();
  const { data: session, status } = sessionHook || { data: null, status: 'loading' };
  const router = useRouter();
  const t = useTranslations();
  const tAlerts = useTranslations('Alerts');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPrintLanguageModal, setShowPrintLanguageModal] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [taxSettings, setTaxSettings] = useState({
    enabled: false,
    percentage: 11,
    name: 'PPN',
    applyToTables: false,
    applyToFnb: true
  });

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
        setFilteredPayments(data);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      showAlert('error', tAlerts('failedToLoadPayments'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPayments();
      fetchTaxSettings();
    }
  }, [session]);

  const fetchTaxSettings = async () => {
    try {
      const response = await fetch('/api/settings/tax/client');
      if (response.ok) {
        const settings = await response.json();
        setTaxSettings(settings);
      }
    } catch (error) {
      console.error('Failed to fetch tax settings:', error);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = payments;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.midtransOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.paymentMethod && payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(payment =>
        new Date(payment.createdAt) >= filterDate
      );
    }

    setFilteredPayments(filtered);
  }, [payments, statusFilter, searchTerm, dateFilter]);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge color="warning">{t('Transactions.statuses.pending')}</Badge>;
      case 'success':
        return <Badge color="success">{t('Transactions.statuses.success')}</Badge>;
      case 'failed':
        return <Badge color="failure">{t('Transactions.statuses.failed')}</Badge>;
      case 'cancelled':
        return <Badge color="gray">{t('Transactions.statuses.cancelled')}</Badge>;
      default:
        return <Badge color="gray">{t('Transactions.statuses.unknown')}</Badge>;
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePayment = async (paymentId: number) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'success' }),
      });

      if (response.ok) {
        showAlert('success', tAlerts('paymentMarkedSuccess'));
        fetchPayments();
        setShowPaymentModal(false);
      } else {
        showAlert('error', tAlerts('failedToUpdatePaymentStatus'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToProcessPayment'));
    }
  };

  const handleCancelPayment = async (paymentId: number) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (response.ok) {
        showAlert('success', tAlerts('paymentCancelledSuccess'));
        fetchPayments();
        setShowPaymentModal(false);
      } else {
        showAlert('error', tAlerts('failedToCancelPayment'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToCancelPayment'));
    }
  };

  const openPaymentModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const openDetailModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const showPrintLanguageSelection = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPrintLanguageModal(true);
  };

  const printReceipt = (payment: Payment, locale: 'en' | 'id') => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;

    const receiptHtml = generateReceiptHTML(payment, locale);
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    setShowPrintLanguageModal(false);
  };

  const generateReceiptHTML = (payment: Payment, locale: 'en' | 'id'): string => {
    // Get tax label with percentage
    const taxLabel = taxSettings.enabled ? 
      `${taxSettings.name} (${taxSettings.percentage}%)` : 
      (locale === 'id' ? 'Pajak' : 'Tax');
    
    // Create a temporary translations object for the selected locale
    const receiptTranslations = locale === 'id' ? {
      title: 'BILLIARD CHALKBOARD',
      subtitle: 'Struk Pembayaran',
      transaction: 'Transaksi',
      date: 'Tanggal',
      customer: 'Pelanggan',
      phone: 'Telepon',
      status: 'Status',
      tableSessions: 'SESI MEJA',
      table: 'Meja',
      minutes: 'mnt',
      foodBeverage: 'MAKANAN & MINUMAN',
      notes: 'Catatan',
      paymentSummary: 'RINGKASAN PEMBAYARAN',
      tableAmount: 'Biaya Meja',
      fnbAmount: 'Biaya F&B',
      discount: 'Diskon',
      tax: taxLabel,
      total: 'TOTAL',
      walkInCustomer: 'Pelanggan Walk-in',
      thankYou: 'Terima kasih atas kunjungan Anda!',
      businessName: 'Billiard Hall ChalkBoard',
      generated: 'Dicetak',
      pending: 'TERTUNDA',
      success: 'BERHASIL',
      failed: 'GAGAL',
      cancelled: 'DIBATALKAN'
    } : {
      title: 'CHALKBOARD BILLIARD',
      subtitle: 'Receipt',
      transaction: 'Transaction',
      date: 'Date',
      customer: 'Customer',
      phone: 'Phone',
      status: 'Status',
      tableSessions: 'TABLE SESSIONS',
      table: 'Table',
      minutes: 'min',
      foodBeverage: 'FOOD & BEVERAGE',
      notes: 'Notes',
      paymentSummary: 'PAYMENT SUMMARY',
      tableAmount: 'Table Amount',
      fnbAmount: 'F&B Amount',
      discount: 'Discount',
      tax: taxLabel,
      total: 'TOTAL',
      walkInCustomer: 'Walk-in Customer',
      thankYou: 'Thank you for visiting!',
      businessName: 'ChalkBoard Billiard Hall',
      generated: 'Generated',
      pending: 'PENDING',
      success: 'SUCCESS',
      failed: 'FAILED',
      cancelled: 'CANCELLED'
    };
    const customerName = payment.customerName ||
      payment.tableSessions[0]?.customerName ||
      payment.fnbOrders[0]?.customerName ||
      receiptTranslations.walkInCustomer;

    const customerPhone = payment.customerPhone ||
      payment.tableSessions[0]?.customerPhone ||
      payment.fnbOrders[0]?.customerPhone;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt - ${payment.transactionNumber}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            max-width: 300px;
            margin: 0 auto;
            padding: 10px;
            font-size: 12px;
            line-height: 1.4;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
          }
          .header p {
            margin: 2px 0;
            font-size: 10px;
          }
          .transaction-info {
            margin-bottom: 10px;
          }
          .transaction-info p {
            margin: 2px 0;
          }
          .section {
            margin: 10px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 8px;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section h3 {
            margin: 0 0 5px 0;
            font-size: 12px;
            font-weight: bold;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            margin: 2px 0;
          }
          .item-name {
            flex: 1;
            margin-right: 10px;
          }
          .item-price {
            text-align: right;
            min-width: 60px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin: 5px 0 2px 0;
            border-top: 1px solid #000;
            padding-top: 3px;
          }
          .subtotal-row {
            display: flex;
            justify-content: space-between;
            margin: 2px 0;
          }
          .footer {
            text-align: center;
            margin-top: 15px;
            font-size: 10px;
            border-top: 2px dashed #000;
            padding-top: 10px;
          }
          @media print {
            body { margin: 0; padding: 5px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${receiptTranslations.title}</h1>
          <p>${receiptTranslations.subtitle}</p>
          <p>${receiptTranslations.transaction}: ${payment.transactionNumber}</p>
          <p>${receiptTranslations.date}: ${formatDateTime(payment.createdAt)}</p>
        </div>

        <div class="transaction-info">
          <p><strong>${receiptTranslations.customer}:</strong> ${customerName}</p>
          ${customerPhone ? `<p><strong>${receiptTranslations.phone}:</strong> ${customerPhone}</p>` : ''}
          <p><strong>${receiptTranslations.status}:</strong> ${receiptTranslations[payment.status as keyof typeof receiptTranslations] || payment.status.toUpperCase()}</p>
        </div>

        ${payment.tableSessions.length > 0 ? `
          <div class="section">
            <h3>${receiptTranslations.tableSessions}</h3>
            ${payment.tableSessions.map(session => `
              <div class="item-row">
                <div class="item-name">
                  ${session.tableName || `${receiptTranslations.table} ${session.tableId}`}<br>
                  <small>${Math.round(session.actualDuration || session.plannedDuration)} ${receiptTranslations.minutes}</small>
                </div>
                <div class="item-price">${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(session.totalCost || '0'))}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${payment.fnbOrders.length > 0 ? `
          <div class="section">
            <h3>${receiptTranslations.foodBeverage}</h3>
            ${payment.fnbOrders.map(order => `
              ${order.items.map(item => `
                <div class="item-row">
                  <div class="item-name">
                    ${item.quantity}x ${item.itemName}
                    ${item.itemDescription ? `<br><small>${item.itemDescription}</small>` : ''}
                  </div>
                  <div class="item-price">${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(item.subtotal))}</div>
                </div>
              `).join('')}
              ${order.notes ? `<p><small><em>${receiptTranslations.notes}: ${order.notes}</em></small></p>` : ''}
            `).join('')}
          </div>
        ` : ''}

        <div class="section">
          <h3>${receiptTranslations.paymentSummary}</h3>
          ${parseFloat(payment.tableAmount) > 0 ? `
            <div class="subtotal-row">
              <span>${receiptTranslations.tableAmount}:</span>
              <span>${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(payment.tableAmount))}</span>
            </div>
          ` : ''}
          ${parseFloat(payment.fnbAmount) > 0 ? `
            <div class="subtotal-row">
              <span>${receiptTranslations.fnbAmount}:</span>
              <span>${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(payment.fnbAmount))}</span>
            </div>
          ` : ''}
          ${parseFloat(payment.discountAmount) > 0 ? `
            <div class="subtotal-row">
              <span>${receiptTranslations.discount}:</span>
              <span>-${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(payment.discountAmount))}</span>
            </div>
          ` : ''}
          ${parseFloat(payment.taxAmount) > 0 ? `
            <div class="subtotal-row">
              <span>${receiptTranslations.tax}:</span>
              <span>${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(payment.taxAmount))}</span>
            </div>
          ` : ''}
          <div class="total-row">
            <span>${receiptTranslations.total}:</span>
            <span>${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(payment.totalAmount))}</span>
          </div>
        </div>

        <div class="footer">
          <p>${receiptTranslations.thankYou}</p>
          <p>${receiptTranslations.businessName}</p>
          <p>${receiptTranslations.generated}: ${new Date().toLocaleString(locale === 'id' ? 'id-ID' : 'en-US')}</p>
        </div>
      </body>
      </html>
    `;
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
            {t('Transactions.title')}
          </h1>
          <p className="text-bodytext mt-1">
            {t('Transactions.subtitle')}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            color="secondary"
            size="sm"
            onClick={fetchPayments}
          >
            <IconRefresh className="w-4 h-4 mr-2" />
            {t('Transactions.refresh')}
          </Button>
          <Button
            color="primary"
            size="sm"
          >
            <IconDownload className="w-4 h-4 mr-2" />
            {t('Transactions.export')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <CardBox>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="status-filter" value={t('Transactions.filters.status')} />
            <Select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t('Transactions.filters.allStatus')}</option>
              <option value="pending">{t('Transactions.statuses.pending')}</option>
              <option value="success">{t('Transactions.statuses.success')}</option>
              <option value="failed">{t('Transactions.statuses.failed')}</option>
              <option value="cancelled">{t('Transactions.statuses.cancelled')}</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="date-filter" value={t('Transactions.filters.dateRange')} />
            <Select
              id="date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">{t('Transactions.filters.allTime')}</option>
              <option value="today">{t('Transactions.filters.today')}</option>
              <option value="week">{t('Transactions.filters.last7Days')}</option>
              <option value="month">{t('Transactions.filters.lastMonth')}</option>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="search" value={t('Transactions.filters.search')} />
            <TextInput
              id="search"
              placeholder={t('Transactions.filters.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-lightprimary p-4 rounded-lg">
            <div className="text-sm text-primary">{t('Transactions.stats.totalTransactions')}</div>
            <div className="text-2xl font-bold text-primary">{filteredPayments.length}</div>
          </div>
          <div className="bg-lightsuccess p-4 rounded-lg">
            <div className="text-sm text-success">{t('Transactions.stats.successful')}</div>
            <div className="text-2xl font-bold text-success">
              {filteredPayments.filter(p => p.status === 'success').length}
            </div>
          </div>
          <div className="bg-lightwarning p-4 rounded-lg">
            <div className="text-sm text-warning">{t('Transactions.stats.pending')}</div>
            <div className="text-2xl font-bold text-warning">
              {filteredPayments.filter(p => p.status === 'pending').length}
            </div>
          </div>
          <div className="bg-lightinfo p-4 rounded-lg">
            <div className="text-sm text-info">{t('Transactions.stats.revenue')}</div>
            <div className="text-2xl font-bold text-info">
              {formatCurrency(
                filteredPayments
                  .filter(p => p.status === 'success')
                  .reduce((sum, p) => sum + parseFloat(p.totalAmount), 0)
                  .toString()
              )}
            </div>
          </div>
        </div>
      </CardBox>

      {/* Transactions Table */}
      <CardBox>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>{t('Transactions.table.columns.transactionId')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.customer')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.tableOrders')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.amount')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.status')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.paymentMethod')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.date')}</Table.HeadCell>
              <Table.HeadCell>{t('Transactions.table.columns.actions')}</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredPayments.map((payment) => (
                <Table.Row key={payment.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {payment.transactionNumber}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {payment.customerName ||
                          payment.tableSessions[0]?.customerName ||
                          payment.fnbOrders[0]?.customerName ||
                          t('Transactions.table.walkInCustomer')}
                      </div>
                      {(payment.customerPhone ||
                        payment.tableSessions[0]?.customerPhone ||
                        payment.fnbOrders[0]?.customerPhone) && (
                          <div className="text-gray-500">
                            {payment.customerPhone ||
                              payment.tableSessions[0]?.customerPhone ||
                              payment.fnbOrders[0]?.customerPhone}
                          </div>
                        )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm space-y-1">
                      {/* Table Sessions */}
                      {payment.tableSessions.map((session) => (
                        <div key={session.id} className="flex items-center gap-1">
                          <Badge color="blue" size="sm">{session.tableName || `${t('Transactions.table.table')} ${session.tableId}`}</Badge>
                        </div>
                      ))}

                      {/* F&B Orders */}
                      {payment.fnbOrders.map((order) => (
                        <div key={order.id} className="flex items-center gap-1">
                          <Badge color="green" size="sm">
                            {t('Transactions.table.order')} #{order.orderNumber.split('-').pop()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="font-medium">
                      {formatCurrency(payment.totalAmount)}
                    </div>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      {parseFloat(payment.tableAmount) > 0 && (
                        <div>{t('Transactions.table.table')}: {formatCurrency(payment.tableAmount)}</div>
                      )}
                      {parseFloat(payment.fnbAmount) > 0 && (
                        <div>F&B: {formatCurrency(payment.fnbAmount)}</div>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {getStatusBadge(payment.status)}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">
                      {payment.paymentMethod || t('Transactions.table.notSpecified')}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">
                      {formatDateTime(payment.createdAt)}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        color="secondary"
                        size="xs"
                        onClick={() => openDetailModal(payment)}
                      >
                        <IconEye className="w-3 h-3" />
                      </Button>
                      {payment.status === 'pending' && (
                        <Button
                          color="primary"
                          size="xs"
                          onClick={() => openPaymentModal(payment)}
                        >
                          <IconCreditCard className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-bodytext">{t('Transactions.noTransactions')}</p>
            </div>
          )}
        </div>
      </CardBox>

      {/* Payment Processing Modal */}
      <Modal show={showPaymentModal} onClose={() => setShowPaymentModal(false)} size="xl">
        <Modal.Header>{t('Transactions.processPayment.title')}</Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">{t('Transactions.processPayment.customerInfo')}</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">{t('Transactions.processPayment.name')}:</span> {
                    selectedPayment.customerName ||
                    selectedPayment.tableSessions[0]?.customerName ||
                    selectedPayment.fnbOrders[0]?.customerName ||
                    t('Transactions.table.walkInCustomer')
                  }</p>
                  {(selectedPayment.customerPhone ||
                    selectedPayment.tableSessions[0]?.customerPhone ||
                    selectedPayment.fnbOrders[0]?.customerPhone) && (
                      <p><span className="font-medium">{t('Transactions.processPayment.phone')}:</span> {
                        selectedPayment.customerPhone ||
                        selectedPayment.tableSessions[0]?.customerPhone ||
                        selectedPayment.fnbOrders[0]?.customerPhone
                      }</p>
                    )}
                </div>
              </div>

              {/* Order Summary for Staff Confirmation */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-3 text-green-800 dark:text-green-200">{t('Transactions.processPayment.orderSummary')}</h4>

                {/* Table Sessions */}
                {selectedPayment.tableSessions.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2 text-blue-700 dark:text-blue-300">{t('Transactions.processPayment.tableSessions')}</h5>
                    {selectedPayment.tableSessions.map((session) => (
                      <div key={session.id} className="text-sm pl-3 border-l-2 border-blue-400 mb-2 bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                        <div className="font-medium">{session.tableName || `${t('Transactions.table.table')} ${session.tableId}`}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-300 space-y-0.5">
                          <div>{t('Transactions.processPayment.duration')}: {Math.round(session.actualDuration || session.plannedDuration)} {t('Transactions.table.minutes')}</div>
                          <div>{t('Transactions.processPayment.customer')}: {session.customerName}</div>
                          {session.customerPhone && <div>{t('Transactions.processPayment.phone')}: {session.customerPhone}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* F&B Orders with Detailed Items */}
                {selectedPayment.fnbOrders.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-sm mb-2 text-green-700 dark:text-green-300">{t('Transactions.processPayment.fnbItems')}</h5>
                    {selectedPayment.fnbOrders.map((order) => (
                      <div key={order.id} className="text-sm border-l-2 border-green-400 mb-3 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-green-100 dark:bg-green-900/40 px-3 py-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-green-800 dark:text-green-200">
                              Order #{order.orderNumber.split('-').pop()}
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400">
                              {order.tableName && `@ ${order.tableName}`}
                            </div>
                          </div>
                          {order.staffName && (
                            <div className="text-xs text-green-600 dark:text-green-400">
                              {t('Transactions.processPayment.servedBy')}: {order.staffName}
                            </div>
                          )}
                          {order.notes && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                              {t('Transactions.processPayment.notes')}: <span className="italic">"{order.notes}"</span>
                            </div>
                          )}
                        </div>

                        {/* Order Items Table */}
                        <div className="p-3">
                          <div className="space-y-2">
                            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 border-b pb-1">
                              <div className="col-span-1">{t('Transactions.processPayment.qty')}</div>
                              <div className="col-span-5">{t('Transactions.processPayment.item')}</div>
                              <div className="col-span-2">{t('Transactions.processPayment.category')}</div>
                              <div className="col-span-2">{t('Transactions.processPayment.unitPrice')}</div>
                              <div className="col-span-2">{t('Transactions.processPayment.subtotal')}</div>
                            </div>
                            {order.items.map((item) => (
                              <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-1 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                <div className="col-span-1 font-semibold">
                                  {item.quantity}x
                                </div>
                                <div className="col-span-5">
                                  <div className="font-medium">{item.itemName}</div>
                                  {item.itemDescription && (
                                    <div className="text-gray-500 text-xs italic">{item.itemDescription}</div>
                                  )}
                                </div>
                                <div className="col-span-2 text-gray-600 dark:text-gray-400">
                                  {item.categoryName}
                                </div>
                                <div className="col-span-2 text-right">
                                  {formatCurrency(item.unitPrice)}
                                </div>
                                <div className="col-span-2 text-right font-semibold">
                                  {formatCurrency(item.subtotal)}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Total */}
                          <div className="mt-3 pt-2 border-t">
                            <div className="flex justify-between text-sm">
                              <span>{t('Transactions.processPayment.orderSubtotal')}:</span>
                              <span>{formatCurrency(order.subtotal)}</span>
                            </div>
                            {parseFloat(order.tax) > 0 && (
                              <div className="flex justify-between text-sm">
                                <span>{taxSettings.enabled ? `${taxSettings.name} (${taxSettings.percentage}%)` : t('Transactions.processPayment.tax')}:</span>
                                <span>{formatCurrency(order.tax)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm font-bold border-t pt-1 mt-1">
                              <span>{t('Transactions.processPayment.orderTotal')}:</span>
                              <span className="text-green-600">{formatCurrency(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Breakdown */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">{t('Transactions.processPayment.paymentBreakdown')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t('Transactions.processPayment.transactionNumber')}:</span>
                    <span className="font-medium">{selectedPayment.transactionNumber}</span>
                  </div>
                  {parseFloat(selectedPayment.tableAmount) > 0 && (
                    <div className="flex justify-between">
                      <span>{t('Transactions.processPayment.tableAmount')}:</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(selectedPayment.tableAmount)}
                      </span>
                    </div>
                  )}
                  {parseFloat(selectedPayment.fnbAmount) > 0 && (
                    <div className="flex justify-between">
                      <span>{t('Transactions.processPayment.fnbAmount')}:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(selectedPayment.fnbAmount)}
                      </span>
                    </div>
                  )}
                  {parseFloat(selectedPayment.discountAmount) > 0 && (
                    <div className="flex justify-between">
                      <span>{t('Transactions.processPayment.discountAmount')}:</span>
                      <span className="font-bold text-red-600">
                        -{formatCurrency(selectedPayment.discountAmount)}
                      </span>
                    </div>
                  )}
                  {parseFloat(selectedPayment.taxAmount) > 0 && (
                    <div className="flex justify-between">
                      <span>{taxSettings.enabled ? `${taxSettings.name} (${taxSettings.percentage}%)` : t('Transactions.processPayment.taxAmount')}:</span>
                      <span className="font-bold text-orange-600">
                        {formatCurrency(selectedPayment.taxAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>{getStatusBadge(selectedPayment.status)}</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('Transactions.processPayment.totalAmount')}:</span>
                  <span className="text-primary">
                    {formatCurrency(selectedPayment.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {t('Transactions.processPayment.staffConfirmation')}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="success"
            onClick={() => selectedPayment && handlePayment(selectedPayment.id)}
          >
            <IconCheck className="w-4 h-4 mr-2" />
            {t('Transactions.processPayment.confirmPaid')}
          </Button>
          <Button
            color="failure"
            onClick={() => selectedPayment && handleCancelPayment(selectedPayment.id)}
          >
            <IconX className="w-4 h-4 mr-2" />
            {t('Transactions.processPayment.cancelPayment')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onClose={() => setShowDetailModal(false)} size="4xl">
        <Modal.Header>{t('Transactions.transactionDetail.title')}</Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Customer & Transaction Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.transactionNumber')}
                  </label>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    {selectedPayment.transactionNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.customerName')}
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {selectedPayment.customerName ||
                      selectedPayment.tableSessions[0]?.customerName ||
                      selectedPayment.fnbOrders[0]?.customerName ||
                      t('Transactions.table.walkInCustomer')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.phoneNumber')}
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {selectedPayment.customerPhone ||
                      selectedPayment.tableSessions[0]?.customerPhone ||
                      selectedPayment.fnbOrders[0]?.customerPhone ||
                      t('Transactions.transactionDetail.notProvided')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(selectedPayment.status)}
                  </div>
                </div>
              </div>

              {/* Table Sessions */}
              {selectedPayment.tableSessions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('Transactions.transactionDetail.tableSessions')}</h3>
                  <div className="space-y-3">
                    {selectedPayment.tableSessions.map((session) => (
                      <div key={session.id} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="font-medium">{t('Transactions.transactionDetail.table')}:</span>
                            <p>{session.tableName || `${t('Transactions.table.table')} ${session.tableId}`}</p>
                          </div>
                          <div>
                            <span className="font-medium">{t('Transactions.transactionDetail.duration')}:</span>
                            <p>{Math.round(session.actualDuration || session.plannedDuration)} {t('Transactions.table.minutes')}</p>
                          </div>
                          <div>
                            <span className="font-medium">{t('Transactions.transactionDetail.startTime')}:</span>
                            <p>{formatDateTime(session.startTime)}</p>
                          </div>
                        </div>
                        {session.fnbOrderCount > 0 && (
                          <div className="mt-2 text-sm">
                            <Badge color="info" size="sm">
                              {t('Transactions.transactionDetail.ordersLinked', {count: session.fnbOrderCount})}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* F&B Orders */}
              {selectedPayment.fnbOrders.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('Transactions.transactionDetail.fnbOrders')}</h3>
                  <div className="space-y-4">
                    {selectedPayment.fnbOrders.map((order) => (
                      <div key={order.id} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{t('Transactions.transactionDetail.orderNumber')}{order.orderNumber}</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {order.tableName && <p>{t('Transactions.transactionDetail.table')}: {order.tableName}</p>}
                              {order.staffName && <p>{t('Common.staff')}: {order.staffName}</p>}
                              <p>{t('Transactions.transactionDetail.orderDate')}: {formatDateTime(order.createdAt)}</p>
                              {order.notes && <p>{t('Transactions.processPayment.notes')}: {order.notes}</p>}
                            </div>
                          </div>
                          <Badge
                            color={order.status === 'paid' ? 'success' : order.status === 'pending' ? 'warning' : 'gray'}
                          >
                            {order.status}
                          </Badge>
                        </div>

                        {/* Order Items */}
                        <div className="mt-3">
                          <h5 className="font-medium mb-2">{t('Transactions.transactionDetail.orderItems')}</h5>
                          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                  <th className="px-3 py-2 text-left">{t('Transactions.processPayment.item')}</th>
                                  <th className="px-3 py-2 text-left">{t('Transactions.processPayment.category')}</th>
                                  <th className="px-3 py-2 text-right">{t('Transactions.processPayment.qty')}</th>
                                  <th className="px-3 py-2 text-right">{t('Transactions.processPayment.unitPrice')}</th>
                                  <th className="px-3 py-2 text-right">{t('Transactions.processPayment.subtotal')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y dark:divide-gray-700">
                                {order.items.map((item) => (
                                  <tr key={item.id}>
                                    <td className="px-3 py-2">
                                      <div>
                                        <div className="font-medium">{item.itemName}</div>
                                        {item.itemDescription && (
                                          <div className="text-xs text-gray-500">{item.itemDescription}</div>
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 text-gray-600">
                                      {item.categoryName}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                      {item.quantity} {item.unit || 'pcs'}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                      {formatCurrency(item.unitPrice)}
                                    </td>
                                    <td className="px-3 py-2 text-right font-semibold">
                                      {formatCurrency(item.subtotal)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-3 pt-3 border-t dark:border-gray-600">
                          <div className="flex justify-end space-y-1">
                            <div className="text-sm">
                              <div className="flex justify-between gap-8">
                                <span>{t('Transactions.processPayment.subtotal')}:</span>
                                <span>{formatCurrency(order.subtotal)}</span>
                              </div>
                              <div className="flex justify-between gap-8">
                                <span>{taxSettings.enabled ? `${taxSettings.name} (${taxSettings.percentage}%)` : t('Transactions.processPayment.tax')}:</span>
                                <span>{formatCurrency(order.tax)}</span>
                              </div>
                              <div className="flex justify-between gap-8 font-bold text-lg border-t pt-1">
                                <span>{t('Common.total')}:</span>
                                <span className="text-green-600">{formatCurrency(order.total)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">{t('Transactions.transactionDetail.paymentSummary')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t('Transactions.processPayment.tableAmount')}:</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(selectedPayment.tableAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('Transactions.processPayment.fnbAmount')}:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(selectedPayment.fnbAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('Transactions.processPayment.discountAmount')}:</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(selectedPayment.discountAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{taxSettings.enabled ? `${taxSettings.name} (${taxSettings.percentage}%)` : t('Transactions.processPayment.tax')}:</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedPayment.taxAmount)}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('Transactions.processPayment.totalAmount')}:</span>
                    <span className="text-primary">
                      {formatCurrency(selectedPayment.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.paymentMethod')}
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedPayment.paymentMethod || t('Transactions.table.notSpecified')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.currency')}
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedPayment.currency}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.createdAt')}
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {formatDateTime(selectedPayment.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('Transactions.transactionDetail.lastUpdated')}
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {formatDateTime(selectedPayment.updatedAt)}
                  </p>
                </div>
              </div>

              {selectedPayment.midtransResponse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Transactions.transactionDetail.midtransResponse')}
                  </label>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto max-h-40">
                    {selectedPayment.midtransResponse}
                  </pre>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            onClick={() => selectedPayment && showPrintLanguageSelection(selectedPayment)}
          >
            <IconPrinter className="w-4 h-4 mr-2" />
            {t('Transactions.transactionDetail.print')}
          </Button>
          <Button color="secondary" onClick={() => setShowDetailModal(false)}>
            {t('Transactions.transactionDetail.close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Print Language Selection Modal */}
      <Modal show={showPrintLanguageModal} onClose={() => setShowPrintLanguageModal(false)} size="md">
        <Modal.Header>{t('Transactions.transactionDetail.printLanguagePrompt')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Transactions.transactionDetail.printLanguagePrompt')}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                color="primary"
                onClick={() => selectedPayment && printReceipt(selectedPayment, 'id')}
                className="w-full"
              >
                <IconPrinter className="w-4 h-4 mr-2" />
                {t('Transactions.transactionDetail.printInIndonesian')}
              </Button>
              <Button
                color="secondary"
                onClick={() => selectedPayment && printReceipt(selectedPayment, 'en')}
                className="w-full"
              >
                <IconPrinter className="w-4 h-4 mr-2" />
                {t('Transactions.transactionDetail.printInEnglish')}
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowPrintLanguageModal(false)}>
            {t('Transactions.transactionDetail.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionsPage; 