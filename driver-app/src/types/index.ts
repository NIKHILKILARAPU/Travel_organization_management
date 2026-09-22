export type DriverStatus = 
  | 'OFFLINE'
  | 'ONLINE'
  | 'AVAILABLE'
  | 'ON TRIP'
  | 'BREAK'
  | 'VEHICLE ISSUE';

export type TripStatus = 
  | 'Assigned'
  | 'En Route to Pickup'
  | 'Arrived at Pickup'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Upcoming';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  rating: number;
  avatar?: string;
}

export interface Trip {
  id: string;
  tripNumber: string; // e.g. TR1023
  customer: Customer;
  pickupTime: string;
  date: string;
  pickupLocation: string;
  destinationLocation: string;
  distanceKm: number;
  pickupDistanceKm?: number;
  estimatedFare: number;
  paymentMode: 'Cash' | 'Online UPI' | 'Org Wallet';
  status: TripStatus;
  timeline: {
    bookingConfirmed: boolean;
    driverAssigned: boolean;
    driverArrived: boolean;
    tripStarted: boolean;
    tripCompleted: boolean;
  };
  notes?: string;
  otp?: string;
}

export interface Vehicle {
  id: string;
  type: string; // Auto
  model: string; // Bajaj RE
  registrationNumber: string; // AP 37 AB 1234
  status: 'Active' | 'Under Maintenance' | 'Issue Reported';
  todayDistanceKm: number;
  totalDistanceKm: number;
  totalTrips: number;
  insuranceExpiry: string;
  fitnessExpiry: string;
  lastServiceDate: string;
  nextServiceKmRemaining: number;
  fuelType: string;
  organization: string;
}

export interface VehicleIssueReport {
  id: string;
  category: 'Engine' | 'Tyres' | 'Brakes' | 'Lights' | 'Electrical' | 'Other';
  description: string;
  photoUrl?: string;
  reportedAt: string;
  status: 'Pending Review' | 'Scheduled for Inspection' | 'Resolved';
}

export interface NotificationItem {
  id: string;
  type: 'trip' | 'service' | 'payment' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionTripId?: string;
}

export interface DailyEarning {
  day: string;
  amount: number;
  trips: number;
  isToday?: boolean;
}
