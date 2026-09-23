// Domain Types for Travel Organization Management Interface

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ORGANIZATION_ADMIN' 
  | 'MANAGER' 
  | 'DISPATCHER' 
  | 'FINANCE_MANAGER';

export type ManagementTab = 
  | 'dashboard' 
  | 'live' 
  | 'drivers' 
  | 'vehicles' 
  | 'assignments' 
  | 'trips' 
  | 'customers' 
  | 'payments' 
  | 'earnings' 
  | 'maintenance' 
  | 'documents' 
  | 'reports' 
  | 'utilization' 
  | 'performance' 
  | 'activity' 
  | 'notifications' 
  | 'ai' 
  | 'settings';

export interface OrganizationInfo {
  id: string;
  name: string;
  code: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  registrationNumber: string;
  fleetSize: number;
}

export type DriverStatus = 
  | 'Online' 
  | 'Available' 
  | 'On Trip' 
  | 'Offline' 
  | 'Break' 
  | 'Vehicle Issue' 
  | 'Inactive';

export interface DriverDocument {
  name: string;
  number?: string;
  expiryDate?: string;
  verified: boolean;
  fileUrl?: string;
}

export interface DriverRecord {
  id: string;
  driverId: string; // e.g. DRV-001
  name: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  emergencyContact: string;
  licenseNumber: string;
  licenseExpiry: string;
  joiningDate: string;
  status: DriverStatus;
  assignedVehicleId?: string;
  assignedVehicleReg?: string;
  assignedVehicleType?: string;
  rating: number;
  totalTrips: number;
  tripsToday: number;
  earningsToday: number;
  totalEarnings: number;
  totalDistanceKm: number;
  lastActive: string;
  photo: string;
  documents: {
    drivingLicense: DriverDocument;
    idProof: DriverDocument;
    addressProof: DriverDocument;
  };
  reportedIssues: string[];
}

export type VehicleStatus = 
  | 'AVAILABLE' 
  | 'ON_TRIP' 
  | 'OFFLINE' 
  | 'MAINTENANCE' 
  | 'INACTIVE';

export type VehicleCategory = 
  | 'Auto' 
  | 'Sedan' 
  | 'SUV' 
  | 'Van' 
  | 'Bus' 
  | 'Other';

export interface VehicleRecord {
  id: string;
  vehicleId: string; // e.g. VH-001
  registrationNumber: string; // e.g. AP 39 AB 1234
  brand: string;
  model: string;
  year: number;
  type: VehicleCategory;
  fuelType: 'CNG' | 'Petrol' | 'Diesel' | 'Electric';
  color: string;
  capacity: number;
  owner: string;
  purchaseDate: string;
  assignedDriverId?: string;
  assignedDriverName?: string;
  status: VehicleStatus;
  insuranceExpiry: string;
  fitnessExpiry: string;
  pollutionExpiry: string;
  rcNumber: string;
  lastServiceDate: string;
  nextServiceDate: string;
  odometerKm: number;
  serviceDueKm: number;
  utilizationPercent: number;
  hoursAvailable: number;
  activeHours: number;
  tripHours: number;
  idleHours: number;
  maintenanceHours: number;
  documents: {
    rc: boolean;
    insurance: boolean;
    fitnessCertificate: boolean;
    pollutionCertificate: boolean;
  };
}

export interface VehicleAssignmentRecord {
  id: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleId: string;
  vehicleRegistration: string;
  vehicleType: string;
  assignmentDate: string;
  unassignedDate?: string;
  status: 'Active' | 'Ended';
  assignedBy: string;
  notes?: string;
}

export type TripStatus = 
  | 'REQUESTED' 
  | 'ACCEPTED' 
  | 'DRIVER_ARRIVED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface ManagementTripRecord {
  id: string;
  tripId: string; // e.g. TRP-10248
  customerId: string;
  customerName: string;
  customerPhone: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleId?: string;
  vehicleRegistration?: string;
  vehicleType?: string;
  pickup: string;
  destination: string;
  distanceKm: number;
  durationMins: number;
  fare: number;
  status: TripStatus;
  date: string;
  time: string;
  etaMinutes?: number;
  paymentMethod: 'Cash' | 'UPI' | 'Card' | 'Wallet';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Cancelled';
  cancellationReason?: string;
}

export interface CustomerRecord {
  id: string;
  customerId: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  totalTrips: number;
  totalSpent: number;
  lastTripDate: string;
  status: 'Active' | 'Blocked' | 'Inactive';
  rating: number;
  savedPlacesCount: number;
  joinedDate: string;
  photo: string;
}

export interface PaymentTransactionRecord {
  id: string;
  transactionId: string; // e.g. TXN-89321
  tripId: string;
  customerName: string;
  driverName: string;
  amount: number;
  paymentMethod: 'Cash' | 'UPI' | 'Card' | 'Wallet';
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  date: string;
  time: string;
  feeDeduction: number;
}

export interface DriverEarningsReport {
  driverId: string;
  driverName: string;
  vehicleRegistration: string;
  totalTrips: number;
  completedTrips: number;
  grossEarnings: number;
  organizationCommission: number; // 20% standard
  driverEarnings: number; // 80%
  bonuses: number;
  penalties: number;
  netAmount: number;
}

export type MaintenancePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type MaintenanceStatus = 'REPORTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface MaintenanceRecord {
  id: string;
  ticketId: string; // e.g. MNT-402
  vehicleId: string;
  vehicleRegistration: string;
  vehicleModel: string;
  issue: string;
  description: string;
  reportedDate: string;
  priority: MaintenancePriority;
  assignedMechanic: string;
  status: MaintenanceStatus;
  estimatedCost: number;
  actualCost?: number;
  startDate?: string;
  expectedCompletionDate: string;
  completedDate?: string;
}

export interface DocumentExpiryAlert {
  id: string;
  entityType: 'vehicle' | 'driver';
  entityId: string;
  entityName: string; // e.g. AP 39 AB 1234 or Rahul Kumar
  documentType: 'Driving License' | 'Vehicle Insurance' | 'Fitness Certificate' | 'Pollution Certificate' | 'RC';
  expiryDate: string;
  daysRemaining: number;
  status: 'EXPIRED' | 'EXPIRING_7_DAYS' | 'EXPIRING_30_DAYS' | 'VALID';
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  entity: string;
  entityId: string;
  description: string;
}

export interface ManagementNotification {
  id: string;
  title: string;
  message: string;
  category: 'Vehicle' | 'Driver' | 'Trip' | 'Payment' | 'Maintenance' | 'System';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  linkTab?: ManagementTab;
}

export interface AIToolCallPayload {
  toolName: string;
  params: Record<string, any>;
  description: string;
  isDestructive?: boolean;
}
