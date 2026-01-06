"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CardBox from "@/components/shared/CardBox";
import { 
  Button, 
  Badge, 
  TextInput, 
  Select, 
  Label, 
  Modal, 
  Alert, 
  Tabs, 
  Table,
  Textarea,
  Spinner
} from "flowbite-react";
import { 
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconFilter,
  IconEye,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconClock,
  IconUsers,
  IconTrendingUp,
  IconRefresh,
  IconArrowRight,
  IconNotes
} from "@tabler/icons-react";

// Types
interface FnbCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
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
  createdAt: string;
  updatedAt: string;
}

interface FnbOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  tableId: number | null;
  subtotal: string;
  tax: string;
  total: string;
  status: string;
  staffId?: number;
  staffName?: string;
  notes?: string;
  createdAt: string;
  itemCount?: number;
  tableName?: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

interface Table {
  id: number;
  name: string;
  status: string;
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

const FnBManagement = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations();
  
  // State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<FnbCategory[]>([]);
  const [items, setItems] = useState<FnbItem[]>([]);
  const [orders, setOrders] = useState<FnbOrder[]>([]);
  const [draftOrders, setDraftOrders] = useState<FnbOrder[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDraftAssignModal, setShowDraftAssignModal] = useState(false);
  const [showDraftTransactionModal, setShowDraftTransactionModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FnbCategory | null>(null);
  const [editingItem, setEditingItem] = useState<FnbItem | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<FnbOrder | null>(null);
  const [selectedDraftOrder, setSelectedDraftOrder] = useState<FnbOrder | null>(null);
  
  // Form data
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    isActive: true
  });
  
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    cost: '',
    stockQuantity: 0,
    minStockLevel: 0,
    unit: 'pcs',
    categoryId: '',
    isActive: true
  });
  
  // Enhanced search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch data
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [categoriesRes, itemsRes, ordersRes, draftOrdersRes, staffRes, tablesRes, pendingTransactionsRes] = await Promise.all([
        fetch('/api/fnb/categories'),
        fetch('/api/fnb/items'),
        fetch('/api/fnb/orders'),
        fetch('/api/fnb/orders/drafts'),
        fetch('/api/staff'),
        fetch('/api/tables'),
        fetch('/api/fnb/orders/pending-transactions')
      ]);

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setItems(itemsData);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      if (draftOrdersRes.ok) {
        const draftOrdersData = await draftOrdersRes.json();
        setDraftOrders(draftOrdersData);
      }

      if (staffRes.ok) {
        const staffData = await staffRes.json();
        setStaff(staffData);
      }

      if (tablesRes.ok) {
        const tablesData = await tablesRes.json();
        setTables(tablesData);
      }

      if (pendingTransactionsRes.ok) {
        const pendingTransactionsData = await pendingTransactionsRes.json();
        setPendingTransactions(pendingTransactionsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      showAlert('error', 'Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  // Real-time updates simulation (in a real app, you'd use WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'orders') {
        fetchData();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Category functions
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCategory ? `/api/fnb/categories/${editingCategory.id}` : '/api/fnb/categories';
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });

      if (response.ok) {
        showAlert('success', `Category ${editingCategory ? 'updated' : 'created'} successfully`);
        setShowCategoryModal(false);
        resetCategoryForm();
        fetchData();
      } else {
        showAlert('error', 'Failed to save category');
      }
    } catch (error) {
      showAlert('error', 'Failed to save category');
    }
  };

  const handleCategoryEdit = (category: FnbCategory) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive
    });
    setShowCategoryModal(true);
  };

  const handleCategoryDelete = async (id: number) => {
    if (!confirm(t('FnB.categories.modal.deleteConfirmation'))) return;
    
    try {
      const response = await fetch(`/api/fnb/categories/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showAlert('success', 'Category deleted successfully');
        fetchData();
      } else {
        showAlert('error', 'Failed to delete category');
      }
    } catch (error) {
      showAlert('error', 'Failed to delete category');
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', description: '', isActive: true });
    setEditingCategory(null);
  };

  // Item functions
  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/fnb/items/${editingItem.id}` : '/api/fnb/items';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...itemForm,
          categoryId: parseInt(itemForm.categoryId)
        })
      });

      if (response.ok) {
        showAlert('success', `Item ${editingItem ? 'updated' : 'created'} successfully`);
        setShowItemModal(false);
        resetItemForm();
        fetchData();
      } else {
        showAlert('error', 'Failed to save item');
      }
    } catch (error) {
      showAlert('error', 'Failed to save item');
    }
  };

  const handleItemEdit = (item: FnbItem) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      description: item.description || '',
      price: item.price,
      cost: item.cost || '',
      stockQuantity: item.stockQuantity,
      minStockLevel: item.minStockLevel,
      unit: item.unit,
      categoryId: item.categoryId.toString(),
      isActive: item.isActive
    });
    setShowItemModal(true);
  };

  const handleItemDelete = async (id: number) => {
    if (!confirm(t('FnB.items.modal.deleteConfirmation'))) return;
    
    try {
      const response = await fetch(`/api/fnb/items/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showAlert('success', 'Item deleted successfully');
        fetchData();
      } else {
        showAlert('error', 'Failed to delete item');
      }
    } catch (error) {
      showAlert('error', 'Failed to delete item');
    }
  };

  const resetItemForm = () => {
    setItemForm({
      name: '',
      description: '',
      price: '',
      cost: '',
      stockQuantity: 0,
      minStockLevel: 0,
      unit: 'pcs',
      categoryId: '',
      isActive: true
    });
    setEditingItem(null);
  };

  // Draft order assignment
  const handleDraftAssignment = async (tableId: number) => {
    if (!selectedDraftOrder) return;

    try {
      const response = await fetch(`/api/fnb/orders/${selectedDraftOrder.id}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId, staffId: session?.user?.id || 1 })
      });

      if (response.ok) {
        showAlert('success', 'Draft order assigned successfully');
        setShowDraftAssignModal(false);
        setSelectedDraftOrder(null);
        fetchData();
      } else {
        showAlert('error', 'Failed to assign draft order');
      }
    } catch (error) {
      showAlert('error', 'Failed to assign draft order');
    }
  };

  // Draft order assignment to pending transaction
  const handleDraftTransactionAssignment = async (transactionId: number) => {
    if (!selectedDraftOrder) return;

    try {
      const response = await fetch(`/api/fnb/orders/${selectedDraftOrder.id}/assign-transaction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, staffId: session?.user?.id || 1 })
      });

      if (response.ok) {
        const result = await response.json();
        showAlert('success', `Draft order assigned to transaction ${result.transactionNumber}`);
        setShowDraftTransactionModal(false);
        setSelectedDraftOrder(null);
        fetchData();
      } else {
        showAlert('error', 'Failed to assign draft order to transaction');
      }
    } catch (error) {
      showAlert('error', 'Failed to assign draft order to transaction');
    }
  };

  // Filter functions
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'gray';
      case 'pending': return 'warning';
      case 'billed': return 'info';
      case 'paid': return 'success';
      case 'cancelled': return 'failure';
      default: return 'gray';
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <CardBox>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                F&B Management
              </h2>
              <p className="text-bodytext mt-1">
                Comprehensive food & beverage management with draft orders and real-time updates
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                color="gray" 
                size="sm" 
                onClick={fetchData}
                disabled={refreshing}
              >
                <IconRefresh className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                color="gray"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <IconFilter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <TextInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label value="Status" />
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="billed">Billed</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </div>
                <div>
                  <Label value="Staff Member" />
                  <Select
                    value={staffFilter}
                    onChange={(e) => setStaffFilter(e.target.value)}
                  >
                    <option value="all">All Staff</option>
                    {staff.map(staffMember => (
                      <option key={staffMember.id} value={staffMember.id}>
                        {staffMember.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label value="Date Range" />
                  <Select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="all">All Time</option>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    color="gray"
                    size="sm"
                    onClick={() => {
                      setStatusFilter('all');
                      setStaffFilter('all');
                      setDateFilter('today');
                      setSearchTerm('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {alert && (
            <Alert
              color={alert.type === 'success' ? 'success' : 'failure'}
              onDismiss={() => setAlert(null)}
              className="mb-4"
            >
              {alert.message}
            </Alert>
          )}

          <Tabs aria-label="Enhanced F&B Management tabs">
            {/* <Tabs.Item active={activeTab === "orders"} title={`Orders (${filteredOrders.length})`} onClick={() => setActiveTab("orders")}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">All Orders</h3>
                    {draftOrders.length > 0 && (
                      <Badge color="gray" className="flex items-center gap-1">
                        <IconClock className="w-3 h-3" />
                        {draftOrders.length} Drafts
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Order #</Table.HeadCell>
                      <Table.HeadCell>Customer</Table.HeadCell>
                      <Table.HeadCell>Table</Table.HeadCell>
                      <Table.HeadCell>Staff</Table.HeadCell>
                      <Table.HeadCell>Total</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Payment</Table.HeadCell>
                      <Table.HeadCell>Date</Table.HeadCell>
                      <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {filteredOrders.map((order) => (
                        <Table.Row key={order.id}>
                          <Table.Cell className="font-medium">
                            {order.orderNumber}
                            {order.notes && (
                              <IconNotes className="w-3 h-3 inline ml-1 text-info" />
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <div>
                              <div className="font-medium">{order.customerName || 'Walk-in'}</div>
                              {order.customerPhone && (
                                <div className="text-xs text-bodytext">{order.customerPhone}</div>
                              )}
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            {order.tableName || '-'}
                          </Table.Cell>
                          <Table.Cell>
                            {order.staffName || '-'}
                          </Table.Cell>
                          <Table.Cell>{formatCurrency(order.total)}</Table.Cell>
                          <Table.Cell>
                            <Badge color={getOrderStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            {order.status === 'billed' ? (
                              <Badge color="info">
                                Ready to Pay
                              </Badge>
                            ) : order.status === 'paid' ? (
                              <Badge color="success">
                                Paid
                              </Badge>
                            ) : order.status === 'draft' ? (
                              <Badge color="gray">
                                No Payment
                              </Badge>
                            ) : (
                              <Badge color="warning">
                                Pending
                              </Badge>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="gray"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                              >
                                <IconEye size={14} />
                              </Button>
                              {order.status === 'draft' && (
                                <>
                                  <Button
                                    size="sm"
                                    color="blue"
                                    onClick={() => {
                                      setSelectedDraftOrder(order);
                                      setShowDraftAssignModal(true);
                                    }}
                                    title="Assign to Table"
                                  >
                                    <IconArrowRight size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    color="purple"
                                    onClick={() => {
                                      setSelectedDraftOrder(order);
                                      setShowDraftTransactionModal(true);
                                    }}
                                    title="Assign to Pending Transaction"
                                  >
                                    💳
                                  </Button>
                                </>
                              )}
                              {order.status === 'billed' && (
                                <Button
                                  size="sm"
                                  color="success"
                                  onClick={() => router.push('/transactions')}
                                  title="Go to Transactions to Process Payment"
                                >
                                  💰
                                </Button>
                              )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-bodytext">No orders found</p>
                    </div>
                  )}
                </div>
              </div>
            </Tabs.Item> */}

            <Tabs.Item active={activeTab === "categories"} title="Categories" onClick={() => setActiveTab("categories")}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Categories ({filteredCategories.length})</h3>
                  <Button
                    onClick={() => {
                      resetCategoryForm();
                      setShowCategoryModal(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IconPlus size={16} />
                    {t('FnB.categories.addCategory')}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Description</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Created</Table.HeadCell>
                      <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {filteredCategories.map((category) => (
                        <Table.Row key={category.id}>
                          <Table.Cell className="font-medium">{category.name}</Table.Cell>
                          <Table.Cell>{category.description || '-'}</Table.Cell>
                          <Table.Cell>
                            <Badge color={category.isActive ? 'success' : 'failure'}>
                              {category.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            {new Date(category.createdAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="gray"
                                onClick={() => handleCategoryEdit(category)}
                              >
                                <IconEdit size={14} />
                              </Button>
                              <Button
                                size="sm"
                                color="failure"
                                onClick={() => handleCategoryDelete(category.id)}
                              >
                                <IconTrash size={14} />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </Tabs.Item>

            <Tabs.Item active={activeTab === "items"} title="Items" onClick={() => setActiveTab("items")}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Items ({filteredItems.length})</h3>
                  <Button
                    onClick={() => {
                      resetItemForm();
                      setShowItemModal(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IconPlus size={16} />
                    {t('FnB.items.addItem')}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Stock</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {filteredItems.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell className="font-medium">{item.name}</Table.Cell>
                          <Table.Cell>{item.categoryName}</Table.Cell>
                          <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
                          <Table.Cell>
                            <div className="flex items-center gap-2">
                              <span>{item.stockQuantity} {item.unit}</span>
                              {item.stockQuantity <= item.minStockLevel && (
                                <IconAlertCircle size={16} className="text-red-500" />
                              )}
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge color={item.isActive ? 'success' : 'failure'}>
                              {item.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="gray"
                                onClick={() => handleItemEdit(item)}
                              >
                                <IconEdit size={14} />
                              </Button>
                              <Button
                                size="sm"
                                color="failure"
                                onClick={() => handleItemDelete(item.id)}
                              >
                                <IconTrash size={14} />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
        </CardBox>
      </div>

      {/* Category Modal */}
      <Modal show={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
        <Modal.Header>
          {editingCategory ? t('FnB.categories.modal.editTitle') : t('FnB.categories.modal.addTitle')}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div>
              <Label htmlFor="categoryName">{t('FnB.categories.modal.name')}</Label>
              <TextInput
                id="categoryName"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="categoryDescription">{t('FnB.categories.modal.description')}</Label>
              <Textarea
                id="categoryDescription"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="categoryActive"
                checked={categoryForm.isActive}
                onChange={(e) => setCategoryForm({...categoryForm, isActive: e.target.checked})}
              />
              <Label htmlFor="categoryActive">{t('FnB.categories.modal.active')}</Label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button color="gray" onClick={() => setShowCategoryModal(false)}>
                {t('FnB.categories.modal.cancel')}
              </Button>
              <Button type="submit">
                {editingCategory ? t('FnB.categories.modal.update') : t('FnB.categories.modal.create')}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Item Modal */}
      <Modal show={showItemModal} onClose={() => setShowItemModal(false)}>
        <Modal.Header>
          {editingItem ? t('FnB.items.modal.editTitle') : t('FnB.items.modal.addTitle')}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleItemSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName">{t('FnB.items.modal.name')}</Label>
                <TextInput
                  id="itemName"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="itemCategory">{t('FnB.items.modal.category')}</Label>
                <Select
                  id="itemCategory"
                  value={itemForm.categoryId}
                  onChange={(e) => setItemForm({...itemForm, categoryId: e.target.value})}
                  required
                >
                  <option value="">{t('FnB.items.modal.selectCategory')}</option>
                  {categories.filter(cat => cat.isActive).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="itemDescription">{t('FnB.items.modal.description')}</Label>
              <Textarea
                id="itemDescription"
                value={itemForm.description}
                onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemPrice">{t('FnB.items.modal.price')}</Label>
                <TextInput
                  id="itemPrice"
                  type="number"
                  step="0.01"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="itemCost">{t('FnB.items.modal.cost')}</Label>
                <TextInput
                  id="itemCost"
                  type="number"
                  step="0.01"
                  value={itemForm.cost}
                  onChange={(e) => setItemForm({...itemForm, cost: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="itemStock">{t('FnB.items.modal.stockQuantity')}</Label>
                <TextInput
                  id="itemStock"
                  type="number"
                  value={itemForm.stockQuantity}
                  onChange={(e) => setItemForm({...itemForm, stockQuantity: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="itemMinStock">{t('FnB.items.modal.minStockLevel')}</Label>
                <TextInput
                  id="itemMinStock"
                  type="number"
                  value={itemForm.minStockLevel}
                  onChange={(e) => setItemForm({...itemForm, minStockLevel: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="itemUnit">{t('FnB.items.modal.unit')}</Label>
                <Select
                  id="itemUnit"
                  value={itemForm.unit}
                  onChange={(e) => setItemForm({...itemForm, unit: e.target.value})}
                >
                  <option value="pcs">{t('FnB.items.modal.units.pcs')}</option>
                  <option value="kg">{t('FnB.items.modal.units.kg')}</option>
                  <option value="g">{t('FnB.items.modal.units.g')}</option>
                  <option value="l">{t('FnB.items.modal.units.l')}</option>
                  <option value="ml">{t('FnB.items.modal.units.ml')}</option>
                  <option value="dozen">{t('FnB.items.modal.units.dozen')}</option>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="itemActive"
                checked={itemForm.isActive}
                onChange={(e) => setItemForm({...itemForm, isActive: e.target.checked})}
              />
              <Label htmlFor="itemActive">{t('FnB.items.modal.active')}</Label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button color="gray" onClick={() => setShowItemModal(false)}>
                {t('FnB.items.modal.cancel')}
              </Button>
              <Button type="submit">
                {editingItem ? t('FnB.items.modal.update') : t('FnB.items.modal.create')}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Order Details Modal */}
      <Modal show={showOrderModal} onClose={() => setShowOrderModal(false)}>
        <Modal.Header>
          Order Details - {selectedOrder?.orderNumber}
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer</Label>
                  <p className="font-medium">{selectedOrder.customerName || 'Walk-in'}</p>
                  {selectedOrder.customerPhone && (
                    <p className="text-sm text-bodytext">{selectedOrder.customerPhone}</p>
                  )}
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge color={getOrderStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Subtotal</Label>
                  <p className="font-medium">{formatCurrency(selectedOrder.subtotal)}</p>
                </div>
                <div>
                  <Label>Tax</Label>
                  <p className="font-medium">{formatCurrency(selectedOrder.tax)}</p>
                </div>
                <div>
                  <Label>Total</Label>
                  <p className="font-bold text-lg">{formatCurrency(selectedOrder.total)}</p>
                </div>
              </div>
              {selectedOrder.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="p-2 bg-lightinfo rounded text-sm">{selectedOrder.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Staff Member</Label>
                  <p className="font-medium">{selectedOrder.staffName || '-'}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowOrderModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Draft Order Assignment Modal */}
      <Modal show={showDraftAssignModal} onClose={() => setShowDraftAssignModal(false)}>
        <Modal.Header>
          Assign Draft Order - {selectedDraftOrder?.orderNumber}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="p-4 bg-lightinfo rounded-lg">
              <h4 className="font-medium">Order Details</h4>
              <p>Customer: {selectedDraftOrder?.customerName}</p>
              <p>Total: {selectedDraftOrder ? formatCurrency(selectedDraftOrder.total) : ''}</p>
              <p>Items: {selectedDraftOrder?.itemCount || 0}</p>
            </div>
            
            <div>
              <Label>Select Table</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {tables.filter(table => table.status === 'occupied').map(table => (
                  <button
                    key={table.id}
                    type="button"
                    className="p-3 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors text-left"
                    onClick={() => handleDraftAssignment(table.id)}
                  >
                    <div className="font-medium">{table.name}</div>
                    <div className="text-sm text-bodytext">Status: {table.status}</div>
                  </button>
                ))}
              </div>
              
              {tables.filter(table => table.status === 'occupied').length === 0 && (
                <div className="text-center py-4 text-bodytext">
                  No occupied tables available for assignment
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowDraftAssignModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Draft Order to Pending Transaction Assignment Modal */}
      <Modal show={showDraftTransactionModal} onClose={() => setShowDraftTransactionModal(false)}>
        <Modal.Header>
          Assign Draft Order to Pending Transaction - {selectedDraftOrder?.orderNumber}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="p-4 bg-lightinfo rounded-lg">
              <h4 className="font-medium">Order Details</h4>
              <p>Customer: {selectedDraftOrder?.customerName}</p>
              <p>Total: {selectedDraftOrder ? formatCurrency(selectedDraftOrder.total) : ''}</p>
              <p>Items: {selectedDraftOrder?.itemCount || 0}</p>
            </div>
            
            <div>
              <Label>Select Pending Transaction</Label>
              <div className="space-y-3 mt-2 max-h-96 overflow-y-auto">
                {pendingTransactions.map(transaction => (
                  <button
                    key={transaction.id}
                    type="button"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors text-left"
                    onClick={() => handleDraftTransactionAssignment(transaction.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{transaction.transactionNumber}</div>
                        <div className="text-sm text-bodytext">{transaction.customerName}</div>
                        {transaction.customerPhone && (
                          <div className="text-xs text-bodytext">{transaction.customerPhone}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(transaction.totalAmount)}</div>
                        <div className="text-xs text-bodytext">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-bodytext">
                      Table: {formatCurrency(transaction.tableAmount)} | 
                      F&B: {formatCurrency(transaction.fnbAmount)}
                    </div>
                  </button>
                ))}
              </div>
              
              {pendingTransactions.length === 0 && (
                <div className="text-center py-4 text-bodytext">
                  No pending transactions available for assignment.
                  Create a standalone order first to generate a pending transaction.
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowDraftTransactionModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FnBManagement; 