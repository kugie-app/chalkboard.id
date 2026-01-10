"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Button, Badge, Modal, TextInput, Label, Select, Alert, Tabs } from "flowbite-react";
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconPlayerPlay, 
  IconPlayerStop,
  IconCurrencyDollar,
  IconClock,
  IconCheck,
  IconCreditCard,
  IconToolsKitchen2,
  IconFileText,
  IconShoppingCart,
  IconMinus,
  IconX,
  IconChevronRight,
  IconChevronLeft,
  IconTransfer,
  IconPackage,
  IconSearch
} from "@tabler/icons-react";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";
import DurationManagement from "@/components/tables/DurationManagement";
import MoveSessionModal from "@/components/tables/MoveSessionModal";
import EnhancedBillingModal from "@/components/tables/EnhancedBillingModal";
import { PricingPackage } from "@/schema";
import { calculateTax as calculateTaxFromSettings, formatTaxLabel } from "@/lib/tax";

// Helper function to format currency
const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num);
};

interface BilliardTable {
  id: number;
  name: string;
  status: string;
  hourlyRate: string;
  perMinuteRate?: string;
  pricingPackageId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  pricingPackage?: {
    id: string;
    name: string;
    description?: string;
    category: string;
    hourlyRate?: string;
    perMinuteRate?: string;
    isDefault: boolean;
    isActive: boolean;
  };
}

interface TableSession {
  id: number;
  tableId: number;
  customerName: string;
  startTime: string;
  plannedDuration: number;
  actualDuration?: number;
  originalDuration?: number;
  durationType?: 'hourly' | 'per_minute';
  status: string;
}

interface FnbCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

interface FnbItem {
  id: number;
  name: string;
  description: string;
  price: string;
  cost: string;
  stockQuantity: number;
  minStockLevel: number;
  unit: string;
  categoryId: number;
  categoryName: string;
  isActive: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  unit: string;
}

interface ExistingOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  subtotal: string;
  tax: string;
  total: string;
  status: string;
  staffId: number;
  staffName: string;
  notes: string;
  createdAt: string;
  items: ExistingOrderItem[];
}

interface ExistingOrderItem {
  id: number;
  itemId: number;
  itemName: string;
  itemDescription: string;
  categoryName: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  unit: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

const TablesManagement = () => {
  const sessionHook = useSession();
  const { data: session, status } = sessionHook || { data: null, status: 'loading' };
  const router = useRouter();
  const t = useTranslations('TablesManagement');
  const tCards = useTranslations('TableCard');
  const tAlerts = useTranslations('Alerts');
  const tSessionModal = useTranslations('SessionModal');
  const tModals = useTranslations('Modals');
  const tCommon = useTranslations('Common');
  const tPOS = useTranslations('POS');
  const [tables, setTables] = useState<BilliardTable[]>([]);
  const [sessions, setSessions] = useState<{ [key: number]: TableSession }>({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showFnbModal, setShowFnbModal] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [showMoveSessionModal, setShowMoveSessionModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<BilliardTable | null>(null);
  const [selectedSession, setSelectedSession] = useState<TableSession | null>(null);
  const [billingData, setBillingData] = useState<any>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [taxSettings, setTaxSettings] = useState({
    enabled: false,
    percentage: 11,
    name: 'PPN',
    applyToTables: false,
    applyToFnb: true
  });

  // F&B Modal States
  const [categories, setCategories] = useState<FnbCategory[]>([]);
  const [items, setItems] = useState<FnbItem[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [existingOrders, setExistingOrders] = useState<ExistingOrder[]>([]);
  const [fnbLoading, setFnbLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    status: 'available'
  });

  const [sessionData, setSessionData] = useState({
    customerName: '',
    mode: 'open' as 'open' | 'planned',
    plannedDuration: 60,
    pricingPackageId: ''
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const autoEndTriggeredRef = useRef<Set<number>>(new Set());
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch tables data
  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
        
        // Fetch current sessions for occupied tables
        data.forEach(async (table: BilliardTable) => {
          if (table.status === 'occupied') {
            try {
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
            } catch (error) {
              console.error('Failed to fetch session for table', table.id, error);
            }
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch tables:', error);
      showAlert('error', tAlerts('genericError'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch F&B data for modal
  const fetchFnbData = async () => {
    setFnbLoading(true);
    try {
      const [categoriesRes, itemsRes, staffRes] = await Promise.all([
        fetch('/api/fnb/categories'),
        fetch('/api/fnb/items'),
        fetch('/api/staff')
      ]);

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
      }

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setItems(itemsData);
      }

      if (staffRes.ok) {
        const staffData = await staffRes.json();
        setStaff(staffData);
      }
    } catch (error) {
      console.error('Failed to fetch F&B data:', error);
      showAlert('error', tAlerts('failedToLoadFnBData'));
    } finally {
      setFnbLoading(false);
    }
  };

  // Fetch pricing packages
  const fetchPricingPackages = async () => {
    try {
      const response = await fetch('/api/pricing-packages?isActive=true');
      if (response.ok) {
        const data = await response.json();
        setPricingPackages(data);
      }
    } catch (error) {
      console.error('Failed to fetch pricing packages:', error);
    }
  };

  // Fetch existing orders for a table
  const fetchExistingOrders = async (tableId: number) => {
    try {
      const response = await fetch(`/api/tables/${tableId}/orders`);
      if (response.ok) {
        const ordersData = await response.json();
        setExistingOrders(ordersData);
      } else {
        console.error('Failed to fetch existing orders');
        setExistingOrders([]);
      }
    } catch (error) {
      console.error('Error fetching existing orders:', error);
      setExistingOrders([]);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTables();
      fetchTaxSettings();
      fetchPricingPackages();
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

  // Update current time every second for real-time duration display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto end planned sessions when time is up
  useEffect(() => {
    tables.forEach((table) => {
      const session = sessions[table.id];
      if (!session) return;
      if ((session.plannedDuration || 0) <= 0) return; // open mode
      const elapsed = calculateElapsedTime(session.startTime);
      const remaining = session.plannedDuration * 60 - elapsed;
      if (remaining <= 0 && !autoEndTriggeredRef.current.has(table.id)) {
        autoEndTriggeredRef.current.add(table.id);
        // Fire and forget; UI will refresh via fetchTables in handler
        handleEndSession(table.id);
      }
    });
  }, [currentTime, sessions, tables]);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // F&B Cart Functions
  const addToCart = (item: FnbItem) => {
    if (item.stockQuantity <= 0) {
      showAlert('error', tAlerts('itemOutOfStockNamed', { itemName: item.name }));
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      if (existingItem.quantity >= item.stockQuantity) {
        showAlert('error', tAlerts('notEnoughStockAvailable'));
        return;
      }
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        unit: item.unit
      }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const item = items.find(i => i.id === itemId);
    if (item && quantity > item.stockQuantity) {
      showAlert('error', tAlerts('notEnoughStockAvailable'));
      return;
    }

    setCart(cart.map(cartItem => 
      cartItem.id === itemId 
        ? { ...cartItem, quantity }
        : cartItem
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Add item from existing order to cart (for editing existing orders)
  const addFromExistingToCart = (orderItem: ExistingOrderItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === orderItem.itemId);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === orderItem.itemId 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: orderItem.itemId,
        name: orderItem.itemName,
        price: orderItem.unitPrice,
        quantity: 1,
        unit: orderItem.unit
      }]);
    }
  };

  // Remove item from cart and add back to available items (visual helper)
  const moveFromCartToMenu = (cartItem: CartItem) => {
    removeFromCart(cartItem.id);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const calculateTax = (subtotal: number) => {
    return calculateTaxFromSettings(subtotal, taxSettings, false); // Use tax settings, isTable=false for F&B
  };

  // Process F&B Order
  const processFnbOrder = async () => {
    if (!selectedTable || !sessions[selectedTable.id]) {
      showAlert('error', tAlerts('tableSessionNotFound'));
      return;
    }

    if (cart.length === 0) {
      showAlert('error', tAlerts('cartIsEmpty'));
      return;
    }

    if (!selectedStaffId) {
      showAlert('error', tAlerts('pleaseSelectStaffMember'));
      return;
    }

    try {
      const session = sessions[selectedTable.id];
      const subtotal = calculateTotal();
      const tax = calculateTax(subtotal);
      const total = subtotal + tax;

      const orderPayload = {
        context: 'table_session',
        customerName: session.customerName,
        customerPhone: null,
        tableId: selectedTable.id,
        staffId: parseInt(selectedStaffId),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        notes: `Order for table ${selectedTable.name}`,
        items: cart.map(item => ({
          itemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          subtotal: (parseFloat(item.price) * item.quantity).toFixed(2)
        }))
      };

      const response = await fetch('/api/fnb/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        const orderResult = await response.json();
        showAlert('success', tAlerts('orderCreatedAddedToBill', { orderNumber: orderResult.orderNumber, tableName: selectedTable.name }));
        clearCart();
        setSelectedStaffId('');
        // Refresh existing orders to show the new order
        if (selectedTable) {
          await fetchExistingOrders(selectedTable.id);
        }
        fetchTables(); // Refresh to show updated session info
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToCreateOrder'));
      }
    } catch (error) {
      console.error('Error processing F&B order:', error);
      showAlert('error', tAlerts('failedToProcessOrder'));
    }
  };

  // Open F&B Modal
  const openFnbModal = async (table: BilliardTable) => {
    if (!sessions[table.id]) {
      showAlert('error', tAlerts('noActiveSessionFound'));
      return;
    }
    
    setSelectedTable(table);
    setShowFnbModal(true);
    
    // Fetch F&B data if not already loaded
    if (categories.length === 0) {
      await fetchFnbData();
    }

    // Fetch existing orders for the table
    await fetchExistingOrders(table.id);
  };

  const handleCreateTable = async () => {
    try {
      const requestData = {
        name: formData.name,
        status: formData.status,
      };

      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        showAlert('success', tAlerts('tableCreatedSuccess'));
        setShowCreateModal(false);
        setFormData({ name: '', status: 'available' });
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToCreateTable'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToCreateTable'));
    }
  };

  const handleUpdateTable = async () => {
    if (!selectedTable) return;

    try {
      const requestData = {
        name: formData.name,
        status: formData.status
      };

      const response = await fetch(`/api/tables/${selectedTable.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        showAlert('success', tAlerts('tableUpdatedSuccess'));
        setShowEditModal(false);
        setSelectedTable(null);
        setFormData({ name: '', status: 'available' });
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToUpdateTable'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToUpdateTable'));
    }
  };

  const handleDeleteTable = async () => {
    if (!selectedTable) return;

    try {
      const response = await fetch(`/api/tables/${selectedTable.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showAlert('success', tAlerts('tableDeletedSuccess'));
        setShowDeleteModal(false);
        setSelectedTable(null);
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToDeleteTable'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToDeleteTable'));
    }
  };

  const handleStartSession = async () => {
    if (!selectedTable) return;
    
    if (!sessionData.pricingPackageId) {
      showAlert('error', tSessionModal('packageRequired'));
      return;
    }

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
        setSessionData({ customerName: '', mode: 'open', plannedDuration: 60, pricingPackageId: '' });
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToStartSession'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToStartSession'));
    }
  };

  const handleEndSession = async (tableId: number) => {
    try {
      const response = await fetch(`/api/tables/${tableId}/end-session`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setBillingData(data);
        setShowBillingModal(true);
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToEndSession'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToEndSession'));
    }
  };

  const openEditModal = (table: BilliardTable) => {
    setSelectedTable(table);
    setFormData({
      name: table.name,
      status: table.status
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (table: BilliardTable) => {
    setSelectedTable(table);
    setShowDeleteModal(true);
  };

  const openSessionModal = (table: BilliardTable) => {
    setSelectedTable(table);
    setSessionData({ customerName: '', mode: 'open', plannedDuration: 60, pricingPackageId: '' });
    setShowSessionModal(true);
  };

  const openDurationModal = (table: BilliardTable, session: TableSession) => {
    setSelectedTable(table);
    setSelectedSession(session);
    setShowDurationModal(true);
  };

  const openMoveSessionModal = (table: BilliardTable, session: TableSession) => {
    setSelectedTable(table);
    setSelectedSession(session);
    setShowMoveSessionModal(true);
  };

  const handleDurationTypeChange = async (sessionId: number, newType: 'hourly' | 'per_minute') => {
    try {
      const response = await fetch(`/api/table-sessions/${sessionId}/update-duration`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationType: newType,
          actualDuration: sessions[selectedTable?.id || 0]?.actualDuration || 0
        }),
      });

      if (response.ok) {
        showAlert('success', tAlerts('durationTypeUpdatedSuccess'));
        fetchTables();
        setShowDurationModal(false);
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToUpdateDurationType'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToUpdateDurationType'));
    }
  };

  const handleDurationUpdate = async (sessionId: number, newDuration: number) => {
    try {
      const session = selectedSession || sessions[selectedTable?.id || 0];
      const response = await fetch(`/api/table-sessions/${sessionId}/update-duration`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationType: session?.durationType || 'hourly',
          actualDuration: newDuration
        }),
      });

      if (response.ok) {
        showAlert('success', tAlerts('durationUpdatedSuccess'));
        fetchTables();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToUpdateDuration'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToUpdateDuration'));
    }
  };

  const handleSessionMove = (newTableId: number, newTableName: string) => {
    showAlert('success', tAlerts('sessionMovedSuccess', { tableName: newTableName }));
    setShowMoveSessionModal(false);
    fetchTables();
  };

  const handleBillingConfirm = (finalBillingData: any) => {
    // Process payment with final billing data
    showAlert('success', tAlerts('paymentProcessedSuccess'));
    setShowBillingModal(false);
    setBillingData(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'occupied': return 'error';
      case 'maintenance': return 'warning';
      case 'reserved': return 'info';
      default: return 'muted';
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

  const getStatusBannerColor = (status: string) => {
    switch (status) {
      case 'available': 
        return '#22C55E';
      case 'occupied': 
        return '#EF4444';
      case 'maintenance': 
        return '#F59E0B';
      case 'reserved': 
        return '#3B82F6';
      default: 
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return tCards('available');
      case 'occupied': return tCards('occupied');
      case 'maintenance': return tCards('maintenance');
      case 'reserved': return tCards('reserved');
      default: return status.toUpperCase();
    }
  };

  const getStockStatus = (item: FnbItem) => {
    if (item.stockQuantity <= 0) {
      return { color: 'error', text: 'Out of Stock', bgColor: '#FEF2F2', textColor: '#EF4444' };
    } else if (item.stockQuantity <= item.minStockLevel) {
      return { color: 'warning', text: 'Low Stock', bgColor: '#FEF3C7', textColor: '#F59E0B' };
    } else {
      return { color: 'success', text: 'In Stock', bgColor: '#F0FDF4', textColor: '#22C55E' };
    }
  };

  const formatCurrency = (amount: string | number) => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numericAmount);
  };

  const calculateElapsedTime = (startTime: string) => {
    const start = new Date(startTime);
    const elapsed = Math.floor((currentTime.getTime() - start.getTime()) / 1000); // Return total seconds
    return elapsed;
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (dateTime: string | Date) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const calculatePlannedEndTime = (startTime: string, plannedDurationMinutes: number) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + plannedDurationMinutes * 60 * 1000);
    return end;
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

  const calculateTableCost = (table: BilliardTable, totalSeconds: number) => {
    const pricingPackage = table.pricingPackage;
    if (!pricingPackage) return 0;
    
    // Use pricing package rates
    if (pricingPackage.category === 'per_minute') {
      const rate = pricingPackage.perMinuteRate ? parseFloat(pricingPackage.perMinuteRate) : 0;
      return calculatePerMinuteCost(totalSeconds, rate);
    } else {
      const rate = pricingPackage.hourlyRate ? parseFloat(pricingPackage.hourlyRate) : 0;
      return calculateHourlyCost(totalSeconds, rate);
    }
  };

  const getBillingInfo = (table: BilliardTable, totalSeconds: number, session?: TableSession) => {
    // Use pricing package information from session first, then table fallback
    const pricingPackage = (session as any)?.pricingPackage || table.pricingPackage;
    
    if (!pricingPackage) {
      // Fallback to default values if no pricing package
      return {
        type: 'hourly' as const,
        billableHours: 0,
        cost: 0,
        rate: 0
      };
    }

    // Determine billing type based on session preference first, then pricing package category
    const sessionDurationType = session?.durationType;
    const shouldUsePerMinute = sessionDurationType === 'per_minute' || 
                              (!sessionDurationType && pricingPackage.category === 'per_minute');
    
    if (shouldUsePerMinute) {
      const elapsed = totalSeconds;
      const billableMinutes = calculateBillableMinutes(elapsed);
      const rate = pricingPackage.perMinuteRate ? parseFloat(pricingPackage.perMinuteRate) : 0;
      const cost = calculatePerMinuteCost(elapsed, rate);
      return {
        type: 'per_minute' as const,
        billableMinutes,
        cost,
        rate: rate
      };
    } else {
      const elapsed = totalSeconds;
      const billableHours = calculateBillableHours(elapsed);
      const rate = pricingPackage.hourlyRate ? parseFloat(pricingPackage.hourlyRate) : 0;
      const cost = calculateHourlyCost(elapsed, rate);
      return {
        type: 'hourly' as const,
        billableHours,
        cost,
        rate: rate
      };
    }
  };

  const filteredItems = items.filter(item => {
    // Filter by category
    const categoryMatch = activeCategory ? item.categoryId === activeCategory : true;
    
    // Filter by search query
    const searchMatch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

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
            {t('subtitle')}
          </p>
        </div>
        <Button color="primary" onClick={() => setShowCreateModal(true)}>
          <IconPlus className="w-4 h-4 mr-2" />
          {t('addNewTable')}
        </Button>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => {
          const session = sessions[table.id];
          const isOccupied = table.status === 'occupied';
          const elapsedTime = session ? calculateElapsedTime(session.startTime) : 0;
          const billingInfo = getBillingInfo(table, elapsedTime, session);
          const plannedEndTime = session ? calculatePlannedEndTime(session.startTime, session.plannedDuration) : null;

          return (
            <div
              key={table.id}
              className="bg-white dark:bg-darkgray rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              role="article"
              aria-label={`Table ${table.name} - ${table.status}`}
            >
              {/* Status Banner */}
              <div 
                className="h-3 w-full"
                style={{ backgroundColor: getStatusBannerColor(table.status) }}
                aria-hidden="true"
              />
              
              {/* Card Content */}
              <div className="p-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-dark dark:text-white mb-1">
                      {table.name}
                    </h3>
                    <div className="text-xs text-bodytext space-y-1">
                      {(() => {
                        const activePricingPackage = (session as any)?.pricingPackage || table.pricingPackage;
                        return activePricingPackage ? (
                          <>
                            <div className="flex items-center gap-1">
                              <IconPackage className="h-3 w-3" />
                              <span className="font-medium">{activePricingPackage.name}</span>
                              {activePricingPackage.isDefault && <Badge color="info" size="xs">Default</Badge>}
                              {isOccupied && (session as any)?.pricingPackage && <Badge color="success" size="xs">Active</Badge>}
                            </div>
                            <div className="flex items-center gap-1">
                              <IconCurrencyDollar className="h-3 w-3" />
                              <span>
                                {activePricingPackage.category === 'hourly' 
                                  ? `${formatCurrency(activePricingPackage.hourlyRate || '0')}/hr`
                                  : `${formatCurrency(activePricingPackage.perMinuteRate || '0')}/min`
                                }
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            <IconPackage className="h-3 w-3" />
                            <span className="text-bodytext">No pricing package assigned</span>
                          </div>
                        );
                      })()}
                    </div>
                    {isOccupied && session && (
                      <p className="text-sm text-bodytext mt-1">
                        {session.customerName}
                      </p>
                    )}
                  </div>
                  <Badge 
                    color={getStatusColor(table.status)} 
                    size="sm"
                    style={getStatusBadgeStyle(table.status)}
                  >
                    {getStatusText(table.status)}
                  </Badge>
                </div>

                {/* Session Information */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-bodytext">{tCards('startTime')}:</span>
                    <span className="font-medium text-dark dark:text-white">
                      {isOccupied && session ? formatTime(session.startTime) : '--:--'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-bodytext">{tCards('endTime')}:</span>
                    <span className="font-medium text-dark dark:text-white">
                      {isOccupied && session && session.plannedDuration > 0 && plannedEndTime ? formatTime(plannedEndTime) : '--:--'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-bodytext">{tCards('duration')}:</span>
                    <span className="font-medium text-dark dark:text-white font-mono">
                      {isOccupied && session
                        ? (session.plannedDuration > 0
                          ? formatDuration(Math.max(session.plannedDuration * 60 - elapsedTime, 0))
                          : formatDuration(elapsedTime))
                        : '--:--:--'}
                    </span>
                  </div>

                  {/* Cost Information */}
                  {isOccupied && session && (
                    <div className="pt-2 border-t border-lightborder dark:border-darkborder">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-bodytext">{tCards('cost')}:</span>
                        <span className="font-bold text-primary">
                          {formatCurrency(billingInfo.cost.toString())}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-bodytext">
                        <p>{billingInfo.type}{session.plannedDuration > 0 ? ' (planned)' : ' (open)'}</p>
                        {billingInfo.type === 'per_minute' ? (
                          <span>({billingInfo.billableMinutes} min × {formatCurrency(billingInfo.rate.toString())})</span>
                        ) : (
                          <span>({billingInfo.billableHours} jam × {formatCurrency(billingInfo.rate.toString())})</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {isOccupied && <Button
                      color="secondary"
                      size="xs"
                      className="flex-1"
                      onClick={() => openFnbModal(table)}
                    >
                      <IconToolsKitchen2 className="w-3 h-3 mr-1" />
                      {tCards('fnbButton')}
                    </Button>}
                    
                    {isOccupied ? (
                      <Button
                        color="error"
                        size="xs"
                        className="flex-1"
                        onClick={() => handleEndSession(table.id)}
                      >
                        <IconPlayerStop className="w-3 h-3 mr-1" />
                        {tCards('stopButton')}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        size="xs"
                        className="flex-1"
                        onClick={() => openSessionModal(table)}
                      >
                        <IconPlayerPlay className="w-3 h-3 mr-1" />
                        {tCards('startButton')}
                      </Button>
                    )}
                  </div>
                  
                  {/* Additional Actions for Occupied Tables */}
                  {isOccupied && session && (
                    <div className="flex gap-2">
                      <Button
                        color="light"
                        size="xs"
                        className="flex-1"
                        onClick={() => openDurationModal(table, session)}
                      >
                        <IconClock className="w-3 h-3 mr-1" />
                        {tCommon('duration')}
                      </Button>
                      <Button
                        color="light"
                        size="xs"
                        className="flex-1"
                        onClick={() => openMoveSessionModal(table, session)}
                      >
                        <IconTransfer className="w-3 h-3 mr-1" />
                        {tCommon('move')}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Admin Actions (Hidden by default, can be toggled) */}
                {!isOccupied && <div className="mt-2 pt-2 border-t border-lightborder dark:border-darkborder">
                  <div className="flex flex-col gap-2">
                                          <Button
                        color="light"
                        size="xs"
                        onClick={() => openEditModal(table)}
                        className="text-xs"
                      >
                        <IconEdit className="w-3 h-3 mr-1" />
                        {tCards('editButton')}
                      </Button>
                      <Button
                        color="light"
                        size="xs"
                        onClick={() => openDeleteModal(table)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        <IconTrash className="w-3 h-3 mr-1" />
                        {tCards('deleteButton')}
                      </Button>
                  </div>
                </div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {tables.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-lightprimary rounded-full flex items-center justify-center">
              <IconPlus className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
              {t('noTables.title')}
            </h3>
            <p className="text-bodytext mb-4">
              {t('noTables.subtitle')}
            </p>
          </div>
        </div>
      )}

      {/* F&B Modal */}
      <Modal show={showFnbModal} onClose={() => setShowFnbModal(false)} size="7xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <IconToolsKitchen2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">F&B Order - {selectedTable?.name}</h3>
              <p className="text-sm text-bodytext">
                Customer: {selectedTable && sessions[selectedTable.id] ? sessions[selectedTable.id].customerName : 'N/A'}
              </p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {fnbLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg">{tCommon('loadingFnBMenu')}</div>
            </div>
          ) : (
            <div className="flex gap-6 h-[600px]">
              {/* Left Pane - Menu Items */}
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full">
                  <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                    {tCommon('menuItems')}
                  </h3>
                  
                  {/* Search Input */}
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconSearch className="w-4 h-4 text-gray-400" />
                    </div>
                    <TextInput
                      type="search"
                      placeholder="Search menu items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Categories */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <Button
                      color={!activeCategory ? "primary" : "light"}
                      size="xs"
                      onClick={() => setActiveCategory(null)}
                      className="whitespace-nowrap"
                    >
                      All Categories
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        color={activeCategory === category.id ? "primary" : "light"}
                        size="xs"
                        onClick={() => setActiveCategory(category.id)}
                        className="whitespace-nowrap"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredItems.map(item => {
                      const stockStatus = getStockStatus(item);
                      const isOutOfStock = item.stockQuantity <= 0;
                      
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                            isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'
                          }`}
                          style={{
                            backgroundColor: stockStatus.bgColor,
                            borderColor: stockStatus.textColor
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-dark dark:text-white text-sm truncate">
                                {item.name}
                              </h4>
                              <Badge 
                                color={stockStatus.color} 
                                size="xs"
                                style={{ backgroundColor: stockStatus.textColor, color: 'white' }}
                              >
                                {stockStatus.text}
                              </Badge>
                            </div>
                            
                            {item.description && (
                              <p className="text-xs text-bodytext mb-1 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-bold text-primary text-sm">
                                  {formatCurrency(parseFloat(item.price))}
                                </p>
                                <p className="text-xs text-bodytext">
                                  Stock: {item.stockQuantity} {item.unit}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {!isOutOfStock && (
                            <Button
                              color="primary"
                              size="xs"
                              onClick={() => addToCart(item)}
                              className="ml-2"
                            >
                              <IconChevronRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {filteredItems.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-bodytext">
                        {searchQuery.trim() !== '' ? 'No items found matching your search' : 'No items found in this category'}
                      </p>
                      {searchQuery.trim() !== '' && (
                        <Button color="light" size="xs" className="mt-2" onClick={() => setSearchQuery('')}>
                          Clear search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Pane - Cart & Existing Orders */}
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full">
                  <div className="h-full flex flex-col">
                    {/* Existing Orders Section */}
                    {existingOrders.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
                          {tCommon('currentOrders')}
                        </h3>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {existingOrders.map(order => (
                            <div key={order.id} className="p-2 bg-blue-50 dark:bg-blue-900 rounded border">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">Order #{order.orderNumber}</span>
                                <span className="text-sm font-bold text-primary">
                                  {formatCurrency(parseFloat(order.total))}
                                </span>
                              </div>
                              <div className="space-y-1">
                                {order.items.map(orderItem => (
                                  <div key={orderItem.id} className="flex items-center justify-between text-xs">
                                    <span className="flex-1 truncate">{orderItem.itemName} x{orderItem.quantity}</span>
                                    <Button
                                      color="secondary"
                                      size="xs"
                                      onClick={() => addFromExistingToCart(orderItem)}
                                      className="ml-1"
                                    >
                                      <IconChevronLeft className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cart Section */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-dark dark:text-white">
                          {tCommon('newOrder')} ({cart.length})
                        </h3>
                        {cart.length > 0 && (
                          <Button
                            color="error"
                            size="xs"
                            onClick={clearCart}
                          >
                            <IconTrash className="w-3 h-3 mr-1" />
                            {tCommon('clear')}
                          </Button>
                        )}
                      </div>

                      {cart.length === 0 ? (
                        <div className="text-center py-8">
                          <IconShoppingCart className="w-12 h-12 text-bodytext mx-auto mb-2" />
                          <p className="text-bodytext text-sm">{tCommon('cartIsEmpty')}</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
                            {cart.map(item => (
                              <div key={item.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
                                <Button
                                  color="secondary"
                                  size="xs"
                                  onClick={() => moveFromCartToMenu(item)}
                                  className="mr-2"
                                >
                                  <IconChevronLeft className="w-3 h-3" />
                                </Button>
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-sm font-medium text-dark dark:text-white truncate">
                                    {item.name}
                                  </h5>
                                  <p className="text-xs text-bodytext">
                                    {formatCurrency(parseFloat(item.price))} / {item.unit}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    color="secondary"
                                    size="xs"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <IconMinus className="w-2 h-2" />
                                  </Button>
                                  <span className="w-8 text-center text-xs font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    color="secondary"
                                    size="xs"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <IconPlus className="w-2 h-2" />
                                  </Button>
                                  <Button
                                    color="error"
                                    size="xs"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-1"
                                  >
                                    <IconX className="w-2 h-2" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Staff Selection */}
                          <div className="mb-4">
                            <Label htmlFor="staffSelect" value={`${tCommon('staffMember')} *`} className="text-sm" />
                            <Select
                              id="staffSelect"
                              value={selectedStaffId}
                              onChange={(e) => setSelectedStaffId(e.target.value)}
                              required
                            >
                              <option value="">{tCommon('selectStaff')}</option>
                              {staff.filter(s => s.isActive).map(staffMember => (
                                <option key={staffMember.id} value={staffMember.id}>
                                  {staffMember.name} - {staffMember.role}
                                </option>
                              ))}
                            </Select>
                          </div>

                          {/* Order Summary */}
                          <div className="border-t pt-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>{formatCurrency(calculateTotal())}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{formatTaxLabel(taxSettings)}:</span>
                              <span>{formatCurrency(calculateTax(calculateTotal()))}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base border-t pt-2">
                              <span>Total:</span>
                              <span className="text-primary">
                                {formatCurrency(calculateTotal() + calculateTax(calculateTotal()))}
                              </span>
                            </div>
                          </div>

                          <Button
                            color="primary"
                            className="w-full mt-4"
                            onClick={processFnbOrder}
                            disabled={!selectedStaffId}
                          >
                            <IconCheck className="w-4 h-4 mr-2" />
                            {tPOS('checkout.buttons.addToTableBill')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={() => {
            setShowFnbModal(false);
            clearCart();
            setSelectedTable(null);
            setSelectedStaffId('');
            setExistingOrders([]);
            setSearchQuery('');
          }}>
            {tCommon('close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Table Modal */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Modal.Header>{tModals('tableModal.createTitle')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value={tModals('tableModal.tableName')} />
              <TextInput
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={tModals('tableModal.tableNamePlaceholder')}
                required
              />
            </div>
            <div>
              <Label htmlFor="status" value={tModals('tableModal.status')} />
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
                <option value="reserved">Reserved</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleCreateTable}>
            {tModals('tableModal.createButton')}
          </Button>
          <Button color="secondary" onClick={() => setShowCreateModal(false)}>
            {tModals('tableModal.cancelButton')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Table Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Header>{tModals('tableModal.editTitle')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName" value="Table Name" />
              <TextInput
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="editStatus" value="Status" />
              <Select
                id="editStatus"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
                <option value="reserved">Reserved</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleUpdateTable}>
            Update Table
          </Button>
          <Button color="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Delete Table</Modal.Header>
        <Modal.Body>
          <p className="text-bodytext">
            Are you sure you want to delete <strong>{selectedTable?.name}</strong>? 
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="error" onClick={handleDeleteTable}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Start Session Modal */}
      <Modal show={showSessionModal} onClose={() => setShowSessionModal(false)}>
        <Modal.Header>{tSessionModal('startTitle', { tableName: selectedTable?.name || '' })}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName" value={tSessionModal('customerLabel')} />
              <TextInput
                id="customerName"
                value={sessionData.customerName}
                onChange={(e) => setSessionData({ ...sessionData, customerName: e.target.value })}
                placeholder={tSessionModal('customerPlaceholder')}
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
            <div>
              <Label htmlFor="pricingPackage" value={tSessionModal('pricingPackageLabel')} />
              <Select
                id="pricingPackage"
                value={sessionData.pricingPackageId}
                onChange={(e) => setSessionData({ ...sessionData, pricingPackageId: e.target.value })}
                required
              >
                <option value="">{tSessionModal('selectPackage')}</option>
                {pricingPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.category === 'hourly' 
                      ? `${formatCurrency(Number(pkg.hourlyRate))}/hour`
                      : `${formatCurrency(Number(pkg.perMinuteRate))}/min`
                    }
                    {pkg.isDefault && ' (Default)'}
                  </option>
                ))}
              </Select>
            </div>
            {sessionData.mode === 'planned' && (
              <>
                <div>
                  <Label htmlFor="plannedDuration" value={tSessionModal('plannedDurationLabel')} />
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
                <div className="p-3 bg-lightinfo rounded-lg">
                  <p className="text-sm text-info">
                    <IconCurrencyDollar className="w-4 h-4 inline mr-1" />
                    Estimated cost: {(() => {
                      const selectedPackage = pricingPackages.find(p => p.id === sessionData.pricingPackageId);
                      if (!selectedPackage) return formatCurrency('0');
                      
                      if (selectedPackage.category === 'hourly') {
                        return formatCurrency(
                          ((sessionData.plannedDuration / 60) * parseFloat(selectedPackage.hourlyRate || '0')).toString()
                        );
                      } else {
                        return formatCurrency(
                          (sessionData.plannedDuration * parseFloat(selectedPackage.perMinuteRate || '0')).toString()
                        );
                      }
                    })()}
                  </p>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleStartSession}>
            <IconPlayerPlay className="w-4 h-4 mr-2" />
            Start Session
          </Button>
          <Button color="secondary" onClick={() => setShowSessionModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Enhanced Billing Modal */}
      <EnhancedBillingModal
        show={showBillingModal}
        onClose={() => setShowBillingModal(false)}
        billingData={billingData}
        onConfirmPayment={handleBillingConfirm}
      />

      {/* Duration Management Modal */}
      <Modal show={showDurationModal} onClose={() => setShowDurationModal(false)} size="md">
        <Modal.Header>{tCommon('durationManagement')}</Modal.Header>
        <Modal.Body>
          {selectedSession && selectedTable && (
            <DurationManagement
              sessionId={selectedSession.id}
              currentDurationType={(selectedSession as any).durationType || 'hourly'}
              elapsedMinutes={calculateElapsedTime(selectedSession.startTime) / 60}
              onDurationTypeChange={(newType) => handleDurationTypeChange(selectedSession.id, newType)}
              onDurationUpdate={(newDuration) => handleDurationUpdate(selectedSession.id, newDuration)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={() => setShowDurationModal(false)}>
            {tCommon('close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Move Session Modal */}
      <MoveSessionModal
        show={showMoveSessionModal}
        onClose={() => setShowMoveSessionModal(false)}
        sessionId={selectedSession?.id || 0}
        currentTableId={selectedTable?.id || 0}
        currentTableName={selectedTable?.name || ''}
        customerName={selectedSession?.customerName || ''}
        onMoveSuccess={handleSessionMove}
      />
    </div>
  );
};

export default TablesManagement; 