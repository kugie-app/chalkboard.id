"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Button, Badge, TextInput, Select, Label, Modal, Alert } from "flowbite-react";
import {
  IconShoppingCart,
  IconPlus,
  IconMinus,
  IconTrash,
  IconReceipt,
  IconClock,
  IconNotes,
  IconChevronRight
} from "@tabler/icons-react";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";
import { calculateTax, formatTaxLabel, type TaxSettings } from "@/lib/tax";

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
  isActive: boolean;
  categoryId: number;
  categoryName: string;
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  unit: string;
}

interface Table {
  id: number;
  name: string;
  status: string;
  customerName?: string;
  sessionDuration?: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

interface DraftOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  total: string;
  itemCount: number;
  createdAt: string;
  notes?: string;
}

interface PendingTransaction {
  id: number;
  transactionNumber: string;
  customerName: string;
  customerPhone?: string;
  totalAmount: string;
  tableAmount: string;
  fnbAmount: string;
  status: string;
  createdAt: string;
}

const FnBPOS = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('POS');
  const tAlerts = useTranslations('Alerts');
  const tCommon = useTranslations('Common');
  const [categories, setCategories] = useState<FnbCategory[]>([]);
  const [items, setItems] = useState<FnbItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [draftOrders, setDraftOrders] = useState<DraftOrder[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([]);
  const [taxSettings, setTaxSettings] = useState<TaxSettings>({
    enabled: false,
    percentage: 11,
    name: 'PPN',
    applyToTables: false,
    applyToFnb: true
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showDraftOrdersModal, setShowDraftOrdersModal] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Draft order assignment form state
  const [draftAssignments, setDraftAssignments] = useState<{[orderId: number]: {
    selectedTableId: string;
    selectedTransactionId: string;
    selectedStaffId: string;
  }}>({});
  
  // Enhanced order form data
  const [orderData, setOrderData] = useState({
    context: 'standalone', // 'standalone', 'waiting', 'table_session', 'pending_transaction'
    customerName: '',
    customerPhone: '',
    tableId: '',
    transactionId: '',
    staffId: '',
    paymentMethods: [{ type: 'cash', amount: 0 }],
    notes: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch data
  const fetchData = async () => {
    try {
      const [categoriesRes, itemsRes, tablesRes, staffRes, draftOrdersRes, pendingTransactionsRes, taxRes] = await Promise.all([
        fetch('/api/fnb/categories'),
        fetch('/api/fnb/items'),
        fetch('/api/tables'),
        fetch('/api/staff'),
        fetch('/api/fnb/orders/drafts'),
        fetch('/api/fnb/orders/pending-transactions'),
        fetch('/api/settings/tax')
      ]);

      // Fetch tax settings
      if (taxRes.ok) {
        const taxSettingsData = await taxRes.json();
        setTaxSettings(taxSettingsData);
      }

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

      if (tablesRes.ok) {
        const tablesData = await tablesRes.json();
        setTables(tablesData);
      }

      if (staffRes.ok) {
        const staffData = await staffRes.json();
        setStaff(staffData);
      }

      if (draftOrdersRes.ok) {
        const draftOrdersData = await draftOrdersRes.json();
        setDraftOrders(draftOrdersData);
      }

      if (pendingTransactionsRes.ok) {
        const pendingTransactionsData = await pendingTransactionsRes.json();
        setPendingTransactions(pendingTransactionsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      showAlert('error', tAlerts('loadDataFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const addToCart = (item: FnbItem) => {
    if (item.stockQuantity <= 0) {
      showAlert('error', tAlerts('itemOutOfStock'));
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      if (existingItem.quantity >= item.stockQuantity) {
        showAlert('error', tAlerts('notEnoughStock'));
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
      showAlert('error', tAlerts('notEnoughStock'));
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

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const calculateOrderTax = (subtotal: number) => {
    return calculateTax(subtotal, taxSettings, false); // false for FnB (not table)
  };

  const processOrder = async () => {
    if (cart.length === 0) {
      showAlert('error', tAlerts('cartEmpty'));
      return;
    }

    if (!orderData.customerName) {
      showAlert('error', tAlerts('customerNameRequired'));
      return;
    }

    if (!orderData.staffId) {
      showAlert('error', tAlerts('staffMemberRequired'));
      return;
    }

    // Validate context-specific requirements
    if (orderData.context === 'pending_transaction' && !orderData.transactionId) {
      showAlert('error', tAlerts('selectPendingTransaction'));
      return;
    }

    try {
      const subtotal = calculateTotal();
      const tax = calculateOrderTax(subtotal);
      const total = subtotal + tax;

      // For pending transactions, create as draft first, then assign to transaction
      if (orderData.context === 'pending_transaction') {
        // Create draft order first
        const draftOrderPayload = {
          context: 'waiting', // Create as draft
          customerName: orderData.customerName,
          customerPhone: orderData.customerPhone || null,
          tableId: null,
          staffId: parseInt(orderData.staffId),
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
          notes: orderData.notes || null,
          items: cart.map(item => ({
            itemId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
            subtotal: (parseFloat(item.price) * item.quantity).toFixed(2)
          }))
        };

        const draftResponse = await fetch('/api/fnb/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draftOrderPayload)
        });

        if (draftResponse.ok) {
          const draftResult = await draftResponse.json();
          
          // Immediately assign to pending transaction
          const assignResponse = await fetch(`/api/fnb/orders/${draftResult.id}/assign-transaction`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              transactionId: parseInt(orderData.transactionId), 
              staffId: parseInt(orderData.staffId) 
            })
          });

          if (assignResponse.ok) {
            // const assignResult = await assignResponse.json();
            showAlert('success', `${t('orderCreated', { orderNumber: draftResult.orderNumber })}`);
            clearCart();
            resetOrderForm();
            setShowCheckoutModal(false);
            fetchData(); // Refresh data
            return;
          } else {
            showAlert('error', tAlerts('assignOrderFailed'));
            return;
          }
        } else {
          showAlert('error', tAlerts('createDraftOrderFailed'));
          return;
        }
      }

      // Regular order processing for other contexts
      const orderPayload = {
        context: orderData.context,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone || null,
        tableId: orderData.tableId ? parseInt(orderData.tableId) : null,
        staffId: parseInt(orderData.staffId),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        notes: orderData.notes || null,
        paymentMethods: orderData.context === 'standalone' ? orderData.paymentMethods : null,
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
        const orderType = orderData.context === 'standalone' ? t('orderCreated') : 
                         orderData.context === 'waiting' ? t('draftOrderCreated') : t('tableOrderCreated');
        
        // Enhanced success message for standalone orders
        if (orderData.context === 'standalone' && orderResult.paymentRecord) {
          showAlert('success', 
            `${orderType}. ${t('orderNumber', { orderNumber: orderResult.orderNumber })}`
          );
        } else {
          showAlert('success', `${orderType}. ${t('orderNumber', { orderNumber: orderResult.orderNumber })}`);
        }
        
        clearCart();
        resetOrderForm();
        setShowCheckoutModal(false);
        fetchData(); // Refresh data to update stock and draft orders
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('createOrderFailed'));
      }
    } catch (error) {
      showAlert('error', tAlerts('processOrderFailed'));
    }
  };

  const assignDraftOrder = async (draftOrderId: number, tableId: number, staffId: number) => {
    try {
      const response = await fetch(`/api/fnb/orders/${draftOrderId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId, staffId })
      });

      if (response.ok) {
        showAlert('success', tAlerts('draftOrderAssignedToTable'));
        setShowDraftOrdersModal(false);
        // Clear the form state for this order
        setDraftAssignments(prev => {
          const newState = { ...prev };
          delete newState[draftOrderId];
          return newState;
        });
        fetchData();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('assignDraftOrderFailed'));
      }
    } catch (error) {
      showAlert('error', tAlerts('assignDraftOrderFailed'));
    }
  };

  const assignDraftOrderToTransaction = async (draftOrderId: number, transactionId: number, staffId: number) => {
    try {
      const response = await fetch(`/api/fnb/orders/${draftOrderId}/assign-transaction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, staffId })
      });

      if (response.ok) {
        const result = await response.json();
        showAlert('success', `${t('draftOrderAssignedToTransaction', { transactionNumber: result.transactionNumber })}`);
        setShowDraftOrdersModal(false);
        // Clear the form state for this order
        setDraftAssignments(prev => {
          const newState = { ...prev };
          delete newState[draftOrderId];
          return newState;
        });
        fetchData();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('assignDraftOrderToTransactionFailed'));
      }
    } catch (error) {
      showAlert('error', tAlerts('assignDraftOrderToTransactionFailed'));
    }
  };

  // Helper functions for draft assignment forms
  const updateDraftAssignment = (orderId: number, field: string, value: string) => {
    setDraftAssignments(prev => ({
      ...prev,
      [orderId]: {
        selectedTableId: prev[orderId]?.selectedTableId || '',
        selectedTransactionId: prev[orderId]?.selectedTransactionId || '',
        selectedStaffId: prev[orderId]?.selectedStaffId || '',
        ...{[field]: value}
      }
    }));
  };

  const handleTableAssignment = async (orderId: number) => {
    const assignment = draftAssignments[orderId];
    if (!assignment?.selectedTableId) {
      showAlert('error', tAlerts('selectTable'));
      return;
    }
    if (!assignment?.selectedStaffId) {
      showAlert('error', tAlerts('selectStaff'));
      return;
    }
    await assignDraftOrder(orderId, parseInt(assignment.selectedTableId), parseInt(assignment.selectedStaffId));
  };

  const handleTransactionAssignment = async (orderId: number) => {
    const assignment = draftAssignments[orderId];
    if (!assignment?.selectedTransactionId) {
      showAlert('error', tAlerts('selectTransaction'));
      return;
    }
    if (!assignment?.selectedStaffId) {
      showAlert('error', tAlerts('selectStaff'));
      return;
    }
    await assignDraftOrderToTransaction(orderId, parseInt(assignment.selectedTransactionId), parseInt(assignment.selectedStaffId));
  };

  const resetOrderForm = () => {
    setOrderData({
      context: 'standalone',
      customerName: '',
      customerPhone: '',
      tableId: '',
      transactionId: '',
      staffId: '',
      paymentMethods: [{ type: 'cash', amount: 0 }],
      notes: ''
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockStatus = (item: FnbItem) => {
    if (item.stockQuantity <= 0) {
      return { color: 'error', text: "outofstock", bgColor: '#FEF2F2', textColor: '#EF4444' };
    } else if (item.stockQuantity <= item.minStockLevel) {
      return { color: 'warning', text: "lowstock", bgColor: '#FEF3C7', textColor: '#F59E0B' };
    } else {
      return { color: 'success', text: "instock", bgColor: '#F0FDF4', textColor: '#22C55E' };
    }
  };

  const getTableStatus = (table: Table) => {
    switch (table.status) {
      case 'occupied':
        return { icon: '🎱', color: 'success', disabled: false };
      case 'reserved':
        return { icon: '📅', color: 'warning', disabled: false };
      case 'maintenance':
        return { icon: '🔧', color: 'error', disabled: true };
      default:
        return { icon: '⚫', color: 'gray', disabled: true };
    }
  };

  const filteredItems = items.filter(item => 
    activeCategory ? item.categoryId === activeCategory : true
  );

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
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-bodytext">{t('cartItems')}</p>
            <p className="text-2xl font-bold text-primary">{cart.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-bodytext">Total</p>
            <p className="text-lg font-bold text-success">
              {formatCurrency(calculateTotal() + calculateOrderTax(calculateTotal()))}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout - Following F&B Modal Pattern */}
      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[700px]">
        {/* Left Column - Menu Items */}
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Menu Items
            </h3>
            
            {/* Categories */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                color={activeCategory === null ? 'primary' : 'light'}
                size="xs"
                onClick={() => setActiveCategory(null)}
                className="whitespace-nowrap"
              >
                {t('menu.allItems')}
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  color={activeCategory === category.id ? 'primary' : 'light'}
                  size="xs"
                  onClick={() => setActiveCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Items List */}
            <div className="space-y-2 h-64 lg:h-[500px] overflow-y-auto">
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
                <p className="text-bodytext">{t('menu.noItemsFound')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Cart & Checkout */}
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-full">
            <div className="h-full flex flex-col">
              {/* Cart Section */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-dark dark:text-white">
                    {t('cart.title')} ({cart.length})
                  </h3>
                  {cart.length > 0 && (
                    <Button
                      color="error"
                      size="xs"
                      onClick={clearCart}
                    >
                      <IconTrash className="w-3 h-3 mr-1" />
                      {t('cart.clear')}
                    </Button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <IconShoppingCart className="w-12 h-12 text-bodytext mx-auto mb-2" />
                    <p className="text-bodytext text-sm">{t('cart.empty')}</p>
                  </div>
                ) : (
                  <div className="space-y-2 h-32 lg:max-h-40 overflow-y-auto mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
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
                            <IconTrash className="w-2 h-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-bodytext">{t('cart.subtotal')}:</span>
                      <span className="font-medium text-dark dark:text-white">{formatCurrency(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-bodytext">{formatTaxLabel(taxSettings)}:</span>
                      <span className="font-medium text-dark dark:text-white">{formatCurrency(calculateOrderTax(calculateTotal()))}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                      <span className="text-dark dark:text-white">{t('cart.total')}:</span>
                      <span className="text-primary">{formatCurrency(calculateTotal() + calculateOrderTax(calculateTotal()))}</span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="space-y-2">
                    <Button 
                      color="primary" 
                      onClick={() => setShowCheckoutModal(true)}
                      className="w-full"
                      size="sm"
                    >
                      <IconShoppingCart className="w-4 h-4 mr-2" />
                      {t('checkout.button', { total: formatCurrency(calculateTotal() + calculateOrderTax(calculateTotal())) })}
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        color="gray" 
                        onClick={() => setShowDraftOrdersModal(true)}
                        size="xs"
                      >
                        <IconClock className="w-3 h-3 mr-1" />
                        {t('draftOrders', { count: draftOrders.length })}
                      </Button>
                      <Button 
                        color="secondary"
                        onClick={clearCart}
                        size="xs"
                      >
                        <IconTrash className="w-3 h-3 mr-1" />
                        {t('cart.clear')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Checkout Modal */}
      <Modal show={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} size="lg">
        <Modal.Header>{t('checkout.title')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* Order Context Selection */}
            <div>
              <Label value={t('checkout.orderType')} />
              {/* Order type selection (modal) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    orderData.context === 'standalone' 
                      ? 'border-primary bg-lightprimary text-primary' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setOrderData({ ...orderData, context: 'standalone', tableId: '', transactionId: '' })}
                >
                  <div className="text-2xl mb-1">🛍️</div>
                  <div className="font-medium">{t('checkout.orderTypes.standalone.title')}</div>
                  <div className="text-xs">{t('checkout.orderTypes.standalone.description')}</div>
                </button>
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    orderData.context === 'waiting' 
                      ? 'border-primary bg-lightprimary text-primary' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setOrderData({ ...orderData, context: 'waiting', tableId: '', transactionId: '' })}
                >
                  <div className="text-2xl mb-1">⏰</div>
                  <div className="font-medium">{t('checkout.orderTypes.waiting.title')}</div>
                  <div className="text-xs">{t('checkout.orderTypes.waiting.description')}</div>
                </button>
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    orderData.context === 'table_session' 
                      ? 'border-primary bg-lightprimary text-primary' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setOrderData({ ...orderData, context: 'table_session', transactionId: '' })}
                >
                  <div className="text-2xl mb-1">🎱</div>
                  <div className="font-medium">{t('checkout.orderTypes.tableSession.title')}</div>
                  <div className="text-xs">{t('checkout.orderTypes.tableSession.description')}</div>
                </button>
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    orderData.context === 'pending_transaction' 
                      ? 'border-primary bg-lightprimary text-primary' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setOrderData({ ...orderData, context: 'pending_transaction', tableId: '' })}
                >
                  <div className="text-2xl mb-1">💳</div>
                  <div className="font-medium">{t('checkout.orderTypes.pendingTransaction.title')}</div>
                  <div className="text-xs">{t('checkout.orderTypes.pendingTransaction.description')}</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName" value={t('checkout.customerName')} />
                <TextInput
                  id="customerName"
                  value={orderData.customerName}
                  onChange={(e) => setOrderData({ ...orderData, customerName: e.target.value })}
                  placeholder={t('checkout.customerNamePlaceholder')}
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone" value={t('checkout.phoneNumber')} />
                <TextInput
                  id="customerPhone"
                  value={orderData.customerPhone}
                  onChange={(e) => setOrderData({ ...orderData, customerPhone: e.target.value })}
                  placeholder={t('checkout.phonePlaceholder')}
                />
              </div>
            </div>
            
            {orderData.context === 'table_session' && (
              <div>
                <Label htmlFor="tableId" value={t('checkout.tableAssignment')} />
                <Select
                  id="tableId"
                  value={orderData.tableId}
                  onChange={(e) => setOrderData({ ...orderData, tableId: e.target.value })}
                  required
                >
                  <option value="">{t('checkout.selectTable')}</option>
                  {tables.map(table => {
                    const tableStatus = getTableStatus(table);
                    return (
                      <option 
                        key={table.id} 
                        value={table.id}
                        disabled={tableStatus.disabled}
                      >
                        {tableStatus.icon} {table.name} - {table.status.toUpperCase()}
                        {table.customerName && ` (${table.customerName})`}
                        {table.sessionDuration && ` - ${table.sessionDuration}`}
                      </option>
                    );
                  })}
                </Select>
              </div>
            )}

            {orderData.context === 'pending_transaction' && (
              <div>
                <Label htmlFor="transactionId" value={t('checkout.pendingTransaction')} />
                <Select
                  id="transactionId"
                  value={orderData.transactionId}
                  onChange={(e) => setOrderData({ ...orderData, transactionId: e.target.value })}
                  required
                >
                  <option value="">{t('checkout.selectTransaction')}</option>
                  {pendingTransactions.map(transaction => (
                    <option 
                      key={transaction.id} 
                      value={transaction.id}
                    >
                      💳 {transaction.transactionNumber} - {transaction.customerName} 
                      ({formatCurrency(parseFloat(transaction.totalAmount))})
                      {transaction.customerPhone && ` - ${transaction.customerPhone}`}
                    </option>
                  ))}
                </Select>
                {pendingTransactions.length === 0 && (
                  <div className="mt-2 p-3 bg-lighterror rounded-lg">
                    <p className="text-sm text-error">
                      {t('checkout.noPendingTransactions')}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="staffId" value={t('checkout.staffMember')} />
              <Select
                id="staffId"
                value={orderData.staffId}
                onChange={(e) => setOrderData({ ...orderData, staffId: e.target.value })}
                required
              >
                <option value="">{t('checkout.selectStaff')}</option>
                {staff.filter(s => s.isActive).map(staffMember => (
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.name} - {staffMember.role}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="notes" value={t('checkout.notes')} />
              <TextInput
                id="notes"
                value={orderData.notes}
                onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                placeholder={t('checkout.notesPlaceholder')}
              />
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-3">{t('checkout.orderSummary')}</h3>
              <div className="space-y-2 text-sm">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatCurrency(parseFloat(item.price) * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}:</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{formatTaxLabel(taxSettings)}:</span>
                    <span>{formatCurrency(calculateOrderTax(calculateTotal()))}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>{t('cart.total')}:</span>
                    <span>{formatCurrency(calculateTotal() + calculateOrderTax(calculateTotal()))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Context-specific Information */}
            {orderData.context === 'standalone' && (
              <div className="p-3 bg-lightwarning rounded-lg">
                <h4 className="font-medium text-warning mb-2">{t('checkout.contextInfo.standalone.title')}</h4>
                <p className="text-sm text-bodytext">{t('checkout.contextInfo.standalone.description')}</p>
              </div>
            )}

            {orderData.context === 'waiting' && (
              <div className="p-3 bg-lightinfo rounded-lg">
                <h4 className="font-medium text-info mb-2">{t('checkout.contextInfo.waiting.title')}</h4>
                <p className="text-sm text-bodytext">{t('checkout.contextInfo.waiting.description')}</p>
              </div>
            )}

            {orderData.context === 'table_session' && orderData.tableId && (
              <div className="p-3 bg-lightprimary rounded-lg">
                <h4 className="font-medium text-primary mb-2">{t('checkout.contextInfo.tableSession.title')}</h4>
                <p className="text-sm text-bodytext">{t('checkout.contextInfo.tableSession.description')}</p>
              </div>
            )}

            {orderData.context === 'pending_transaction' && orderData.transactionId && (
              <div className="p-3 bg-lightsuccess rounded-lg">
                <h4 className="font-medium text-success mb-2">{t('checkout.contextInfo.pendingTransaction.title')}</h4>
                <p className="text-sm text-bodytext">{t('checkout.contextInfo.pendingTransaction.description')}</p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={processOrder}>
            <IconReceipt className="w-4 h-4 mr-2" />
            {orderData.context === 'standalone' ? t('checkout.buttons.processPayment') : 
             orderData.context === 'waiting' ? t('checkout.buttons.saveAsDraft') : 
             orderData.context === 'table_session' ? t('checkout.buttons.addToTableBill') :
             t('checkout.buttons.addToTransaction')}
          </Button>
          <Button color="secondary" onClick={() => setShowCheckoutModal(false)}>
            {t('checkout.buttons.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Draft Orders Modal */}
      <Modal show={showDraftOrdersModal} onClose={() => setShowDraftOrdersModal(false)} size="xl">
        <Modal.Header>{t('draftOrdersModal.title')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {draftOrders.length === 0 ? (
              <div className="text-center py-8">
                <IconClock className="w-12 h-12 text-bodytext mx-auto mb-2" />
                <p className="text-bodytext">{t('draftOrdersModal.noOrders')}</p>
                <p className="text-sm text-bodytext">{t('draftOrdersModal.ordersWillAppear')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {draftOrders.map(order => (
                  <div key={order.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{order.orderNumber}</h4>
                        <p className="text-sm text-bodytext">{order.customerName}</p>
                        {order.customerPhone && (
                          <p className="text-xs text-bodytext">{order.customerPhone}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(parseFloat(order.total))}</p>
                        <p className="text-xs text-bodytext">{order.itemCount} {tCommon('items')}</p>
                        <p className="text-xs text-bodytext">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    {order.notes && (
                      <div className="mb-3 p-2 bg-lightinfo rounded text-sm">
                        <IconNotes className="w-4 h-4 inline mr-1" />
                        {order.notes}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Staff Selection - Required for both assignment types */}
                      <div className="space-y-2">
                        <Label htmlFor={`staff-${order.id}`} value={t('draftOrdersModal.staffMember')} />
                        <Select
                          id={`staff-${order.id}`}
                          value={draftAssignments[order.id]?.selectedStaffId || ''}
                          onChange={(e) => updateDraftAssignment(order.id, 'selectedStaffId', e.target.value)}
                          required
                        >
                          <option value="">{t('draftOrdersModal.selectStaff')}</option>
                          {staff.filter(s => s.isActive).map(staffMember => (
                            <option key={staffMember.id} value={staffMember.id}>
                              {staffMember.name} - {staffMember.role}
                            </option>
                          ))}
                        </Select>
                      </div>

                      {/* Assignment Options Header */}
                      <div className="text-sm font-medium text-bodytext">{t('draftOrdersModal.assignmentOptions')}</div>
                      
                      {/* Table Assignment */}
                      <div className="space-y-2 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="text-xl">🎱</div>
                          <div className="text-sm font-medium">{t('draftOrdersModal.assignToTable.title')}</div>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            className="flex-1"
                            value={draftAssignments[order.id]?.selectedTableId || ''}
                            onChange={(e) => updateDraftAssignment(order.id, 'selectedTableId', e.target.value)}
                          >
                            <option value="">{t('draftOrdersModal.selectTable')}</option>
                            {tables.filter(table => table.status === 'occupied').map(table => (
                              <option key={table.id} value={table.id}>
                                🎱 {table.name} - {table.customerName}
                              </option>
                            ))}
                          </Select>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => handleTableAssignment(order.id)}
                            disabled={!draftAssignments[order.id]?.selectedTableId || !draftAssignments[order.id]?.selectedStaffId}
                          >
                            {t('draftOrdersModal.assignToTable.button')}
                          </Button>
                        </div>
                        {tables.filter(table => table.status === 'occupied').length === 0 && (
                          <div className="text-xs text-bodytext italic">{t('draftOrdersModal.assignToTable.noTables')}</div>
                        )}
                      </div>

                      {/* Pending Transaction Assignment */}
                      <div className="space-y-2 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="text-xl">💳</div>
                          <div className="text-sm font-medium">{t('draftOrdersModal.assignToTransaction.title')}</div>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            className="flex-1"
                            value={draftAssignments[order.id]?.selectedTransactionId || ''}
                            onChange={(e) => updateDraftAssignment(order.id, 'selectedTransactionId', e.target.value)}
                          >
                            <option value="">{t('draftOrdersModal.selectTransaction')}</option>
                            {pendingTransactions.map(transaction => (
                              <option key={transaction.id} value={transaction.id}>
                                💳 {transaction.transactionNumber} - {transaction.customerName} 
                                ({formatCurrency(parseFloat(transaction.totalAmount))})
                              </option>
                            ))}
                          </Select>
                          <Button
                            color="purple"
                            size="sm"
                            onClick={() => handleTransactionAssignment(order.id)}
                            disabled={!draftAssignments[order.id]?.selectedTransactionId || !draftAssignments[order.id]?.selectedStaffId}
                          >
                            {t('draftOrdersModal.assignToTransaction.button')}
                          </Button>
                        </div>
                        {pendingTransactions.length === 0 && (
                          <div className="text-xs text-bodytext italic">
                            {t('draftOrdersModal.assignToTransaction.noTransactions')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowDraftOrdersModal(false)}>
            {t('draftOrdersModal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FnBPOS; 