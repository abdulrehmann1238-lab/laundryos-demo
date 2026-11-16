export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Pickup Scheduled'
  | 'Picked Up'
  | 'Washing'
  | 'Drying'
  | 'Folding'
  | 'Ready for Delivery'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface LaundryPreferences {
  detergent: 'Fragrance-free' | 'Hypoallergenic' | 'Original Linen Fresh' | 'Eco-friendly';
  softener: boolean;
  coldWash: boolean;
  delicateHandling: boolean;
  separateColors: boolean;
  specialInstructions?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  tenantId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  status: OrderStatus;
  progressPercentage: number;
  pickupDate: string;
  pickupTimeSlot: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  pickupAddress: string;
  deliveryAddress: string;
  weightLbs?: number;
  itemCount?: number;
  basePrice: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Google Pay' | 'Interac';
  preferences: LaundryPreferences;
  driverId?: string;
  driverName?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    note: string;
    completed: boolean;
  }[];
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  lifetimeSpending: number;
  lastOrderDate: string;
  status: 'Active' | 'VIP' | 'New' | 'Inactive';
  notes?: string;
  createdAt: string;
}

export interface ServiceOffering {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  pricingModel: 'per_lb' | 'per_item' | 'flat_rate';
  price: number;
  unitLabel: string;
  turnaroundTime: string;
  isActive: boolean;
  imageUrl: string;
  popular?: boolean;
}

export interface DriverAssignment {
  id: string;
  orderId: string;
  driverId: string;
  driverName: string;
  type: 'Pickup' | 'Delivery';
  address: string;
  scheduledTime: string;
  status: 'Pending' | 'En Route' | 'Completed';
  zone: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  tenantId: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Refunded';
  date: string;
}

export interface TeamMember {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Laundry Operator' | 'Driver';
  status: 'Active' | 'Invited' | 'Inactive';
  assignedZone?: string;
  avatarUrl?: string;
}

export interface Tenant {
  id: string;
  name: string;
  city: string;
  province: string;
  country: string;
  currency: string;
  currencySymbol: string;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  address: string;
  subscriptionPlan: 'Starter' | 'Growth' | 'Enterprise';
  subscriptionStatus: 'Active' | 'Trial' | 'Past Due';
  monthlyRate: number;
  nextBillingDate: string;
  stats: {
    todayRevenue: number;
    activeOrders: number;
    completedOrders: number;
    totalCustomers: number;
    avgOrderValue: number;
  };
}

export interface NotificationItem {
  id: string;
  tenantId: string;
  recipient: 'customer' | 'business';
  title: string;
  message: string;
  orderId?: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'pickup' | 'delivery' | 'payment' | 'system';
}

export interface ArchitectureItem {
  id: string;
  title: string;
  role: string;
  technology: string;
  description: string;
  responsibilities: string[];
  auditFocus: string;
}

export interface AuditChecklistItem {
  id: number;
  category: string;
  title: string;
  scope: string;
  keyQuestions: string[];
  riskIfIgnored: string;
  recommendation: string;
}
