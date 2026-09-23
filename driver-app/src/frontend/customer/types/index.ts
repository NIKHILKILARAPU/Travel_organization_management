export type CustomerTripStatus = 
  | 'IDLE'
  | 'SEARCHING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_ARRIVING'
  | 'DRIVER_ARRIVED'
  | 'TRIP_IN_PROGRESS'
  | 'TRIP_COMPLETED'
  | 'CANCELLED';

export type VehicleCategory = 'auto' | 'sedan' | 'suv' | 'premium';

export interface VehicleOption {
  id: VehicleCategory;
  name: string;
  category: VehicleCategory;
  icon: string;
  description: string;
  capacity: number;
  baseFare: number;
  perKmRate: number;
  minFare: number;
  maxFare: number;
  etaMinutes: number;
  availableCount: number;
  features: string[];
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalTrips: number;
  photo: string;
  vehicleModel: string;
  vehicleRegistration: string;
  vehicleColor: string;
  vehicleType: string;
  currentEtaMinutes: number;
  latitude: number;
  longitude: number;
}

export type PaymentMethodType = 'UPI' | 'Card' | 'Cash' | 'Wallet';

export interface CustomerPaymentMethod {
  id: string;
  type: PaymentMethodType;
  title: string;
  subtitle: string;
  isDefault: boolean;
  icon: string;
  details?: {
    upiId?: string;
    cardNumberMasked?: string;
    cardHolder?: string;
    expiryDate?: string;
  };
}

export interface TransactionRecord {
  id: string;
  tripId?: string;
  date: string;
  time: string;
  amount: number;
  method: PaymentMethodType;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  description: string;
}

export interface SavedPlace {
  id: string;
  name: string;
  category: 'Home' | 'Work' | 'College' | 'Other';
  address: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

export interface CustomerNotification {
  id: string;
  category: 'Booking' | 'Driver' | 'Payment' | 'Offers' | 'System';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  tripId?: string;
}

export interface SupportTicket {
  id: string;
  issueType: 
    | "Driver hasn't arrived"
    | 'Wrong fare'
    | 'Payment failed'
    | 'Lost item'
    | 'Cancel booking'
    | 'Report driver'
    | 'Vehicle issue'
    | 'Other';
  tripId?: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  updatedAt: string;
  responses?: {
    sender: 'customer' | 'support';
    message: string;
    time: string;
  }[];
}

export interface CustomerTrip {
  id: string;
  tripId: string; // e.g. TRP-10248
  date: string;
  time: string;
  driver: DriverInfo;
  vehicleType: VehicleCategory;
  pickupLocation: string;
  destinationLocation: string;
  distanceKm: number;
  durationMins: number;
  fare: number;
  fareBreakdown: {
    baseFare: number;
    distanceCharge: number;
    additionalCharges: number;
    discount: number;
    total: number;
  };
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Cancelled';
  status: 'Upcoming' | 'Active' | 'Completed' | 'Cancelled';
  customerStatus: CustomerTripStatus;
  otp: string;
  rating?: number;
  feedback?: string;
  feedbackTags?: string[];
  cancellationReason?: string;
  cancelledAt?: string;
  timeline: {
    bookingTime: string;
    driverAssignedTime?: string;
    driverArrivedTime?: string;
    tripStartedTime?: string;
    tripCompletedTime?: string;
  };
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  organization: string;
  city: string;
  memberSince: string;
  rating: number;
  totalTrips: number;
  walletBalance: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolCall?: {
    toolName: string;
    params: any;
    status: 'pending_confirmation' | 'executed' | 'cancelled';
    result?: any;
    requiresConfirmation?: boolean;
    confirmationPrompt?: string;
  };
}
