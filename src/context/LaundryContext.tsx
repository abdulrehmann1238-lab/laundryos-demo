import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Tenant,
  Customer,
  ServiceOffering,
  OrderItem,
  TeamMember,
  Transaction,
  NotificationItem,
  OrderStatus,
  LaundryPreferences,
} from '../types';
import {
  INITIAL_TENANTS,
  INITIAL_SERVICES,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

// Generate secondary and tertiary tenant seed data so switching tenants gives completely realistic distinct datasets!
const generateTenant2Data = () => {
  const services: ServiceOffering[] = [
    {
      id: 'srv-201',
      tenantId: 'tenant-2',
      name: 'Eco Gentle Wash & Fold',
      description: 'Steam-infused organic wash with botanical essences and cedarwood linen wrap.',
      pricingModel: 'per_lb',
      price: 3.25,
      unitLabel: 'per lb',
      turnaroundTime: '24 hours',
      isActive: true,
      popular: true,
      imageUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'srv-202',
      tenantId: 'tenant-2',
      name: 'Executive Dry Cleaning',
      description: 'Zero-emission hydrocarbon dry cleaning for couture, blazers, and eveningwear.',
      pricingModel: 'per_item',
      price: 7.50,
      unitLabel: 'per item',
      turnaroundTime: '36 hours',
      isActive: true,
      popular: true,
      imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const customers: Customer[] = [
    {
      id: 'cust-201',
      tenantId: 'tenant-2',
      name: 'Maya Lin',
      email: 'maya.lin@vancouverarts.ca',
      phone: '+1 (604) 555-2201',
      address: '1155 W Pender St, Suite 800, Vancouver, BC',
      totalOrders: 22,
      lifetimeSpending: 940.0,
      lastOrderDate: '2026-11-16',
      status: 'VIP',
      createdAt: '2026-01-10',
    },
    {
      id: 'cust-202',
      tenantId: 'tenant-2',
      name: 'Julian Bailey',
      email: 'j.bailey@yaletowntech.io',
      phone: '+1 (604) 555-7733',
      address: '1028 Mainland St, Loft 4A, Vancouver, BC',
      totalOrders: 15,
      lifetimeSpending: 680.0,
      lastOrderDate: '2026-11-15',
      status: 'Active',
      createdAt: '2026-03-14',
    },
  ];

  const orders: OrderItem[] = [
    {
      id: 'ord-3001',
      orderId: 'PP-3001',
      tenantId: 'tenant-2',
      customerName: 'Maya Lin',
      customerEmail: 'maya.lin@vancouverarts.ca',
      customerPhone: '+1 (604) 555-2201',
      serviceId: 'srv-202',
      serviceName: 'Executive Dry Cleaning',
      status: 'Washing',
      progressPercentage: 55,
      pickupDate: '2026-11-16',
      pickupTimeSlot: '10:00 AM - 12:00 PM',
      deliveryDate: '2026-11-18',
      deliveryTimeSlot: '04:00 PM - 06:00 PM',
      pickupAddress: '1155 W Pender St, Suite 800, Vancouver, BC',
      deliveryAddress: '1155 W Pender St, Suite 800, Vancouver, BC',
      itemCount: 6,
      basePrice: 45.0,
      deliveryFee: 5.0,
      tax: 4.0,
      total: 54.0,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      preferences: {
        detergent: 'Hypoallergenic',
        softener: false,
        coldWash: true,
        delicateHandling: true,
        separateColors: true,
      },
      driverName: 'Liam Chen',
      createdAt: '2026-11-16T09:00:00Z',
      updatedAt: '2026-11-16T11:00:00Z',
      timeline: [
        { status: 'Confirmed', timestamp: '09:00 AM', note: 'Order placed', completed: true },
        { status: 'Picked Up', timestamp: '10:30 AM', note: 'Picked up by Liam', completed: true },
        { status: 'Washing', timestamp: '11:00 AM', note: 'Hydrocarbon chamber in cycle', completed: true },
      ],
    },
  ];

  const team: TeamMember[] = [
    {
      id: 'team-201',
      tenantId: 'tenant-2',
      name: 'Marcus Vance',
      email: 'marcus@purepress.ca',
      role: 'Owner',
      status: 'Active',
      assignedZone: 'All Zones',
    },
    {
      id: 'team-202',
      tenantId: 'tenant-2',
      name: 'Liam Chen',
      email: 'liam.c@purepress.ca',
      role: 'Driver',
      status: 'Active',
      assignedZone: 'Downtown & Yaletown',
    },
  ];

  return { services, customers, orders, team };
};

const generateTenant3Data = () => {
  const services: ServiceOffering[] = [
    {
      id: 'srv-301',
      tenantId: 'tenant-3',
      name: 'Heritage Wash & Fold',
      description: 'Mountain-fresh natural detergent wash for activewear, down jackets, and denim.',
      pricingModel: 'per_lb',
      price: 2.25,
      unitLabel: 'per lb',
      turnaroundTime: '24 hours',
      isActive: true,
      popular: true,
      imageUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const customers: Customer[] = [
    {
      id: 'cust-301',
      tenantId: 'tenant-3',
      name: 'Aaron Brooks',
      email: 'aaron.brooks@calgaryenergy.ca',
      phone: '+1 (403) 555-9122',
      address: '800 6th Ave SW, Calgary, AB',
      totalOrders: 5,
      lifetimeSpending: 180.0,
      lastOrderDate: '2026-11-14',
      status: 'Active',
      createdAt: '2026-07-20',
    },
  ];

  const orders: OrderItem[] = [
    {
      id: 'ord-4001',
      orderId: 'LS-4001',
      tenantId: 'tenant-3',
      customerName: 'Aaron Brooks',
      customerEmail: 'aaron.brooks@calgaryenergy.ca',
      customerPhone: '+1 (403) 555-9122',
      serviceId: 'srv-301',
      serviceName: 'Heritage Wash & Fold',
      status: 'Out for Delivery',
      progressPercentage: 90,
      pickupDate: '2026-11-15',
      pickupTimeSlot: '11:00 AM - 01:00 PM',
      deliveryDate: '2026-11-16',
      deliveryTimeSlot: '05:00 PM - 07:00 PM',
      pickupAddress: '800 6th Ave SW, Calgary, AB',
      deliveryAddress: '800 6th Ave SW, Calgary, AB',
      weightLbs: 16,
      basePrice: 36.0,
      deliveryFee: 4.0,
      tax: 2.0,
      total: 42.0,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      preferences: {
        detergent: 'Original Linen Fresh',
        softener: true,
        coldWash: false,
        delicateHandling: false,
        separateColors: true,
      },
      driverName: 'Travis Scott',
      createdAt: '2026-11-15T10:00:00Z',
      updatedAt: '2026-11-16T16:00:00Z',
      timeline: [
        { status: 'Confirmed', timestamp: 'Nov 15', note: 'Order logged', completed: true },
        { status: 'Out for Delivery', timestamp: 'Today 04:30 PM', note: 'Courier out on 17th Ave SW route', completed: true },
      ],
    },
  ];

  const team: TeamMember[] = [
    {
      id: 'team-301',
      tenantId: 'tenant-3',
      name: 'Elena Rostova',
      email: 'elena@laundrystudio.ca',
      role: 'Owner',
      status: 'Active',
      assignedZone: 'All Zones',
    },
  ];

  return { services, customers, orders, team };
};

const t2 = generateTenant2Data();
const t3 = generateTenant3Data();

const ALL_INITIAL_SERVICES = [...INITIAL_SERVICES, ...t2.services, ...t3.services];
const ALL_INITIAL_CUSTOMERS = [...INITIAL_CUSTOMERS, ...t2.customers, ...t3.customers];
const ALL_INITIAL_ORDERS = [...INITIAL_ORDERS, ...t2.orders, ...t3.orders];
const ALL_INITIAL_TEAM = [...INITIAL_TEAM_MEMBERS, ...t2.team, ...t3.team];

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface LaundryContextType {
  // Multi-tenancy
  currentTenantId: string;
  currentTenant: Tenant;
  tenants: Tenant[];
  switchTenant: (tenantId: string) => void;
  updateTenantSubscription: (tenantId: string, plan: 'Starter' | 'Growth' | 'Enterprise', status?: 'Active' | 'Trial' | 'Past Due') => void;
  updateTenantSettings: (tenantId: string, updates: Partial<Tenant>) => void;
  toggleTenantStatus: (tenantId: string) => void;

  // Scoped Data
  orders: OrderItem[];
  allOrders: OrderItem[];
  customers: Customer[];
  services: ServiceOffering[];
  teamMembers: TeamMember[];
  transactions: Transaction[];
  notifications: NotificationItem[];
  customerNotifications: NotificationItem[];
  businessNotifications: NotificationItem[];

  // Order Actions
  addOrder: (newOrder: Omit<OrderItem, 'id' | 'orderId' | 'tenantId' | 'createdAt' | 'updatedAt' | 'timeline' | 'progressPercentage'>) => OrderItem;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  simulateNextOrderStep: (orderId: string) => OrderStatus | null;
  assignDriver: (orderId: string, driverId: string, driverName: string) => void;
  getOrderById: (orderId: string) => OrderItem | undefined;

  // Customer Actions
  addCustomer: (customer: Omit<Customer, 'id' | 'tenantId' | 'createdAt' | 'totalOrders' | 'lifetimeSpending'>) => Customer;
  updateCustomer: (customer: Customer) => void;

  // Service Actions
  addService: (service: Omit<ServiceOffering, 'id' | 'tenantId'>) => ServiceOffering;
  updateService: (service: ServiceOffering) => void;
  deleteService: (serviceId: string) => void;
  toggleServiceStatus: (serviceId: string) => void;

  // Team Actions
  addTeamMember: (member: Omit<TeamMember, 'id' | 'tenantId'>) => void;
  updateTeamMember: (member: TeamMember) => void;

  // Payments
  refundTransaction: (transactionId: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (recipient: 'customer' | 'business') => void;

  // Demo Controls
  resetDemoData: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const LaundryContext = createContext<LaundryContextType | undefined>(undefined);

const STORAGE_KEY = 'laundryos_demo_state_v1';

export const LaundryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state or use initial seed
  const [currentTenantId, setCurrentTenantId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.currentTenantId || 'tenant-1';
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return 'tenant-1';
  });

  const [tenants, setTenants] = useState<Tenant[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.tenants || INITIAL_TENANTS;
      } catch (e) {}
    }
    return INITIAL_TENANTS;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.orders || ALL_INITIAL_ORDERS;
      } catch (e) {}
    }
    return ALL_INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.customers || ALL_INITIAL_CUSTOMERS;
      } catch (e) {}
    }
    return ALL_INITIAL_CUSTOMERS;
  });

  const [services, setServices] = useState<ServiceOffering[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.services || ALL_INITIAL_SERVICES;
      } catch (e) {}
    }
    return ALL_INITIAL_SERVICES;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.teamMembers || ALL_INITIAL_TEAM;
      } catch (e) {}
    }
    return ALL_INITIAL_TEAM;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.transactions || INITIAL_TRANSACTIONS;
      } catch (e) {}
    }
    return INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.notifications || INITIAL_NOTIFICATIONS;
      } catch (e) {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    const stateToSave = {
      currentTenantId,
      tenants,
      orders,
      customers,
      services,
      teamMembers,
      transactions,
      notifications,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [currentTenantId, tenants, orders, customers, services, teamMembers, transactions, notifications]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentTenant = useMemo(() => {
    return tenants.find((t) => t.id === currentTenantId) || tenants[0];
  }, [tenants, currentTenantId]);

  // Scoped views for active tenant
  const tenantOrders = useMemo(() => {
    return orders.filter((o) => o.tenantId === currentTenantId);
  }, [orders, currentTenantId]);

  const tenantCustomers = useMemo(() => {
    return customers.filter((c) => c.tenantId === currentTenantId);
  }, [customers, currentTenantId]);

  const tenantServices = useMemo(() => {
    return services.filter((s) => s.tenantId === currentTenantId);
  }, [services, currentTenantId]);

  const tenantTeam = useMemo(() => {
    return teamMembers.filter((m) => m.tenantId === currentTenantId);
  }, [teamMembers, currentTenantId]);

  const tenantTransactions = useMemo(() => {
    return transactions.filter((tx) => tx.tenantId === currentTenantId);
  }, [transactions, currentTenantId]);

  const customerNotifications = useMemo(() => {
    return notifications.filter((n) => n.recipient === 'customer');
  }, [notifications]);

  const businessNotifications = useMemo(() => {
    return notifications.filter((n) => n.recipient === 'business' && n.tenantId === currentTenantId);
  }, [notifications, currentTenantId]);

  // Switch tenant
  const switchTenant = (tenantId: string) => {
    const found = tenants.find((t) => t.id === tenantId);
    if (found) {
      setCurrentTenantId(tenantId);
      addToast(`Switched business to ${found.name}`, `Now managing ${found.city}, ${found.province}`, 'info');
    }
  };

  // Status mapping for progression calculation
  const getProgressForStatus = (status: OrderStatus): number => {
    switch (status) {
      case 'Pending': return 5;
      case 'Confirmed': return 15;
      case 'Pickup Scheduled': return 25;
      case 'Picked Up': return 40;
      case 'Washing': return 55;
      case 'Drying': return 70;
      case 'Folding': return 80;
      case 'Ready for Delivery': return 88;
      case 'Out for Delivery': return 95;
      case 'Delivered': return 100;
      case 'Cancelled': return 0;
      default: return 10;
    }
  };

  const ORDER_STATUS_PROGRESSION: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Pickup Scheduled',
    'Picked Up',
    'Washing',
    'Drying',
    'Folding',
    'Ready for Delivery',
    'Out for Delivery',
    'Delivered',
  ];

  // WORKFLOW A: Add new customer order
  const addOrder = (newOrderData: Omit<OrderItem, 'id' | 'orderId' | 'tenantId' | 'createdAt' | 'updatedAt' | 'timeline' | 'progressPercentage'>): OrderItem => {
    const nextNum = 2050 + orders.length + 1;
    const orderCode = currentTenant.name.includes('Fresh') ? `LO-${nextNum}` : `ORD-${nextNum}`;
    const newId = `ord-${Date.now()}`;
    const now = new Date().toISOString();

    const createdOrder: OrderItem = {
      ...newOrderData,
      id: newId,
      orderId: orderCode,
      tenantId: currentTenantId,
      progressPercentage: 15,
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          status: 'Confirmed',
          timestamp: 'Just now',
          note: `Order booked via customer application. Total ${currentTenant.currencySymbol}${newOrderData.total.toFixed(2)}`,
          completed: true,
        },
        {
          status: 'Pickup Scheduled',
          timestamp: `Est. ${newOrderData.pickupDate} (${newOrderData.pickupTimeSlot})`,
          note: 'Driver assigned for pickup route',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [createdOrder, ...prev]);

    // Create matching transaction
    const newTx: Transaction = {
      id: `txn-${Date.now()}`,
      orderId: orderCode,
      tenantId: currentTenantId,
      customerName: newOrderData.customerName,
      amount: newOrderData.total,
      paymentMethod: newOrderData.paymentMethod,
      status: 'Completed',
      date: 'Just now',
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Update customer stats or add customer if new
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === newOrderData.customerEmail.toLowerCase() && c.tenantId === currentTenantId);
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                lifetimeSpending: c.lifetimeSpending + newOrderData.total,
                lastOrderDate: new Date().toISOString().split('T')[0],
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          tenantId: currentTenantId,
          name: newOrderData.customerName,
          email: newOrderData.customerEmail,
          phone: newOrderData.customerPhone,
          address: newOrderData.pickupAddress,
          totalOrders: 1,
          lifetimeSpending: newOrderData.total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          status: 'New',
          createdAt: new Date().toISOString().split('T')[0],
        };
        return [newCust, ...prev];
      }
    });

    // Notify Business
    const bNotif: NotificationItem = {
      id: `notif-${Date.now()}-biz`,
      tenantId: currentTenantId,
      recipient: 'business',
      title: 'New Order Received',
      message: `${newOrderData.customerName} submitted order #${orderCode} (${newOrderData.serviceName})`,
      orderId: orderCode,
      timestamp: 'Just now',
      read: false,
      type: 'order',
    };

    // Notify Customer
    const cNotif: NotificationItem = {
      id: `notif-${Date.now()}-cust`,
      tenantId: currentTenantId,
      recipient: 'customer',
      title: 'Order Confirmed',
      message: `Your laundry order #${orderCode} has been confirmed. Pickup scheduled for ${newOrderData.pickupDate}.`,
      orderId: orderCode,
      timestamp: 'Just now',
      read: false,
      type: 'order',
    };

    setNotifications((prev) => [bNotif, cNotif, ...prev]);

    // Update tenant live stats
    setTenants((prev) =>
      prev.map((t) =>
        t.id === currentTenantId
          ? {
              ...t,
              stats: {
                ...t.stats,
                todayRevenue: t.stats.todayRevenue + newOrderData.total,
                activeOrders: t.stats.activeOrders + 1,
              },
            }
          : t
      )
    );

    addToast(`Order #${orderCode} Placed!`, `Successfully booked ${newOrderData.serviceName}.`, 'success');

    return createdOrder;
  };

  // WORKFLOW B & C: Update status (bidirectional sync between business dashboard and customer tracking)
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId === orderId || order.id === orderId) {
          const progress = getProgressForStatus(newStatus);
          const isDone = newStatus === 'Delivered';

          // Update timeline
          const updatedTimeline = [
            ...order.timeline,
            {
              status: newStatus,
              timestamp: nowTime,
              note: note || `Status updated to ${newStatus}`,
              completed: true,
            },
          ];

          return {
            ...order,
            status: newStatus,
            progressPercentage: progress,
            updatedAt: new Date().toISOString(),
            timeline: updatedTimeline,
          };
        }
        return order;
      })
    );

    // Notify customer about the state progression
    const cNotif: NotificationItem = {
      id: `notif-${Date.now()}-c`,
      tenantId: currentTenantId,
      recipient: 'customer',
      title: `Order #${orderId} is ${newStatus}`,
      message: note || `Your order status changed to ${newStatus}. Track real-time progress in your app.`,
      orderId,
      timestamp: 'Just now',
      read: false,
      type: newStatus.includes('Delivery') ? 'delivery' : newStatus.includes('Pickup') ? 'pickup' : 'order',
    };
    setNotifications((prev) => [cNotif, ...prev]);

    addToast(`Order #${orderId} Updated`, `Status changed to ${newStatus}`, 'info');
  };

  // Simulate Next Step button in customer or dashboard view
  const simulateNextOrderStep = (orderId: string): OrderStatus | null => {
    const targetOrder = orders.find((o) => o.orderId === orderId || o.id === orderId);
    if (!targetOrder) return null;

    const currentIndex = ORDER_STATUS_PROGRESSION.indexOf(targetOrder.status);
    if (currentIndex >= 0 && currentIndex < ORDER_STATUS_PROGRESSION.length - 1) {
      const nextStatus = ORDER_STATUS_PROGRESSION[currentIndex + 1];
      const customNotes: Record<OrderStatus, string> = {
        'Pending': 'Awaiting confirmation',
        'Confirmed': 'Order verified by shop operations',
        'Pickup Scheduled': 'Driver scheduled for morning pickup run',
        'Picked Up': 'Linen bag collected by driver and scanned in',
        'Washing': 'Machine #06 loaded - Pure eco gentle sanitizing wash active',
        'Drying': 'Moisture sensors active - tumble dry low heat',
        'Folding': 'Carefully folded, packed in sealed protective breathable bag',
        'Ready for Delivery': 'Staged at dispatch shelf #B-12',
        'Out for Delivery': 'Courier out on local neighborhood delivery route',
        'Delivered': 'Safely delivered and signed for. Enjoy your fresh laundry!',
        'Cancelled': 'Order cancelled',
      };

      updateOrderStatus(targetOrder.orderId, nextStatus, customNotes[nextStatus]);
      return nextStatus;
    }
    return null;
  };

  const assignDriver = (orderId: string, driverId: string, driverName: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId || o.id === orderId ? { ...o, driverId, driverName } : o))
    );
    addToast('Driver Assigned', `${driverName} assigned to #${orderId}`, 'info');
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.orderId === orderId || o.id === orderId);
  };

  // Customer Management
  const addCustomer = (customerData: Omit<Customer, 'id' | 'tenantId' | 'createdAt' | 'totalOrders' | 'lifetimeSpending'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      tenantId: currentTenantId,
      totalOrders: 0,
      lifetimeSpending: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);
    addToast('Customer Added', `${customerData.name} profile created.`, 'success');
    return newCust;
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    addToast('Customer Updated', `Saved profile details for ${updated.name}.`, 'info');
  };

  // WORKFLOW D: Service and Pricing Management (Immediately updates customer booking prices!)
  const addService = (serviceData: Omit<ServiceOffering, 'id' | 'tenantId'>): ServiceOffering => {
    const newService: ServiceOffering = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      tenantId: currentTenantId,
    };
    setServices((prev) => [...prev, newService]);
    addToast('Service Added', `${newService.name} added to customer menu.`, 'success');
    return newService;
  };

  const updateService = (updated: ServiceOffering) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    addToast('Pricing Updated', `${updated.name} updated to ${currentTenant.currencySymbol}${updated.price.toFixed(2)} ${updated.unitLabel}.`, 'success');
  };

  const deleteService = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    addToast('Service Removed', 'Service removed from customer catalog.', 'info');
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // Team Management
  const addTeamMember = (memberData: Omit<TeamMember, 'id' | 'tenantId'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `team-${Date.now()}`,
      tenantId: currentTenantId,
    };
    setTeamMembers((prev) => [...prev, newMember]);
    addToast('Team Member Added', `${memberData.name} invited as ${memberData.role}.`, 'success');
  };

  const updateTeamMember = (updated: TeamMember) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    addToast('Team Member Updated', `Updated role & details for ${updated.name}.`, 'info');
  };

  // Payments & Refunds
  const refundTransaction = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === transactionId ? { ...tx, status: 'Refunded' } : tx))
    );
    // Find associated order
    const tx = transactions.find((t) => t.id === transactionId);
    if (tx) {
      setOrders((prev) =>
        prev.map((o) => (o.orderId === tx.orderId ? { ...o, paymentStatus: 'Refunded' } : o))
      );
    }
    addToast('Refund Processed', `Transaction ${transactionId} refunded successfully.`, 'warning');
  };

  // WORKFLOW E: Subscription & Tenant Updates
  const updateTenantSubscription = (tenantId: string, plan: 'Starter' | 'Growth' | 'Enterprise', status: 'Active' | 'Trial' | 'Past Due' = 'Active') => {
    const rates: Record<'Starter' | 'Growth' | 'Enterprise', number> = {
      'Starter': 49,
      'Growth': 99,
      'Enterprise': 199,
    };
    setTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? {
              ...t,
              subscriptionPlan: plan,
              subscriptionStatus: status,
              monthlyRate: rates[plan],
            }
          : t
      )
    );
    addToast('Subscription Updated', `Switched plan to ${plan} ($${rates[plan]}/mo CAD).`, 'success');
  };

  const updateTenantSettings = (tenantId: string, updates: Partial<Tenant>) => {
    setTenants((prev) => prev.map((t) => (t.id === tenantId ? { ...t, ...updates } : t)));
    addToast('Settings Saved', 'Business settings updated successfully.', 'success');
  };

  const toggleTenantStatus = (tenantId: string) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? {
              ...t,
              subscriptionStatus: t.subscriptionStatus === 'Active' ? 'Past Due' : 'Active',
            }
          : t
      )
    );
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = (recipient: 'customer' | 'business') => {
    setNotifications((prev) =>
      prev.map((n) => (n.recipient === recipient ? { ...n, read: true } : n))
    );
    addToast('Notifications Cleared', 'All marked as read.', 'info');
  };

  // Reset Demo State
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentTenantId('tenant-1');
    setTenants(INITIAL_TENANTS);
    setOrders(ALL_INITIAL_ORDERS);
    setCustomers(ALL_INITIAL_CUSTOMERS);
    setServices(ALL_INITIAL_SERVICES);
    setTeamMembers(ALL_INITIAL_TEAM);
    setTransactions(INITIAL_TRANSACTIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    addToast('Demo State Reset', 'FreshFold Laundry initial seed restored.', 'info');
  };

  return (
    <LaundryContext.Provider
      value={{
        currentTenantId,
        currentTenant,
        tenants,
        switchTenant,
        updateTenantSubscription,
        updateTenantSettings,
        toggleTenantStatus,
        orders: tenantOrders,
        allOrders: orders,
        customers: tenantCustomers,
        services: tenantServices,
        teamMembers: tenantTeam,
        transactions: tenantTransactions,
        notifications,
        customerNotifications,
        businessNotifications,
        addOrder,
        updateOrderStatus,
        simulateNextOrderStep,
        assignDriver,
        getOrderById,
        addCustomer,
        updateCustomer,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        addTeamMember,
        updateTeamMember,
        refundTransaction,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </LaundryContext.Provider>
  );
};

export const useLaundry = () => {
  const context = useContext(LaundryContext);
  if (!context) {
    throw new Error('useLaundry must be used within a LaundryProvider');
  }
  return context;
};
