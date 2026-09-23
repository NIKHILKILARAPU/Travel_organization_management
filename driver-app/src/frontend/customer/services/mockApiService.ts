import { 
  MOCK_DRIVERS, 
  VEHICLE_OPTIONS, 
  INITIAL_CUSTOMER_TRIPS 
} from '../data/customerMockData';
import type { 
  CustomerTrip, 
  VehicleCategory, 
  PaymentMethodType, 
  CustomerTripStatus,
  SupportTicket
} from '../types';

export interface FareEstimateResult {
  pickup: string;
  destination: string;
  distanceKm: number;
  durationMins: number;
  options: {
    category: VehicleCategory;
    name: string;
    estimatedFare: number;
    etaMinutes: number;
    capacity: number;
  }[];
}

class CustomerApiService {
  private simulateDelay<T>(data: T, ms: number = 350): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
  }

  // 1. Calculate fare estimates for pickup and destination
  async getFareEstimate(pickup: string, destination: string): Promise<FareEstimateResult> {
    const hash = Math.abs((pickup + destination).split('').reduce((a, b) => a + b.charCodeAt(0), 0));
    const distanceKm = Number(((hash % 15) + 3.2).toFixed(1));
    const durationMins = Math.round(distanceKm * 2.2 + 4);

    const options = VEHICLE_OPTIONS.map((v) => {
      const estimatedFare = Math.round(v.baseFare + distanceKm * v.perKmRate);
      return {
        category: v.category,
        name: v.name,
        estimatedFare,
        etaMinutes: v.etaMinutes,
        capacity: v.capacity,
      };
    });

    return this.simulateDelay({
      pickup,
      destination,
      distanceKm,
      durationMins,
      options,
    }, 250);
  }

  // 2. Query available drivers near location
  async getAvailableDrivers(category?: VehicleCategory) {
    let drivers = [...MOCK_DRIVERS];
    if (category) {
      const matched = drivers.filter(d => d.vehicleType.toLowerCase() === category.toLowerCase());
      if (matched.length > 0) drivers = matched;
    }
    return this.simulateDelay(drivers, 200);
  }

  // 3. Create a new booking
  async createBooking(params: {
    pickupLocation: string;
    destinationLocation: string;
    vehicleCategory: VehicleCategory;
    paymentMethod: PaymentMethodType;
    fare: number;
    distanceKm: number;
    durationMins: number;
  }): Promise<CustomerTrip> {
    const matchedDriver = MOCK_DRIVERS.find(
      (d) => d.vehicleType.toLowerCase() === params.vehicleCategory.toLowerCase()
    ) || MOCK_DRIVERS[0];

    const randomId = 'TRP-' + Math.floor(10000 + Math.random() * 90000);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newTrip: CustomerTrip = {
      id: 'trp-' + Date.now(),
      tripId: randomId,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      driver: matchedDriver,
      vehicleType: params.vehicleCategory,
      pickupLocation: params.pickupLocation,
      destinationLocation: params.destinationLocation,
      distanceKm: params.distanceKm,
      durationMins: params.durationMins,
      fare: params.fare,
      fareBreakdown: {
        baseFare: Math.round(params.fare * 0.3),
        distanceCharge: Math.round(params.fare * 0.5),
        additionalCharges: Math.round(params.fare * 0.2),
        discount: 0,
        total: params.fare,
      },
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'Cash' ? 'Pending' : 'Paid',
      status: 'Active',
      customerStatus: 'SEARCHING_DRIVER',
      otp,
      timeline: {
        bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };

    return this.simulateDelay(newTrip, 400);
  }

  // 4. Get status of current or specific trip
  async getTripStatus(tripId?: string): Promise<{
    tripId: string;
    status: CustomerTripStatus;
    driverName: string;
    etaMinutes: number;
    vehicleNumber: string;
    currentStage: string;
  }> {
    return this.simulateDelay({
      tripId: tripId || 'TRP-10248',
      status: 'DRIVER_ARRIVING',
      driverName: 'Rahul Kumar',
      etaMinutes: 3,
      vehicleNumber: 'AP 39 XX 1234',
      currentStage: 'Driver is 750 meters away heading towards your pickup location.',
    }, 200);
  }

  // 5. Get trip history
  async getTripHistory(limit = 5): Promise<CustomerTrip[]> {
    return this.simulateDelay(INITIAL_CUSTOMER_TRIPS.slice(0, limit), 250);
  }

  // 6. Cancel a booking
  async cancelBooking(tripId: string, reason: string): Promise<{ success: boolean; message: string; refundAmount: number }> {
    return this.simulateDelay({
      success: true,
      message: `Trip ${tripId} has been successfully cancelled (${reason}). Cancellation fee waived under standard 2-minute policy.`,
      refundAmount: 0,
    }, 350);
  }

  // 7. Get driver real-time telematics location
  async getDriverLocation(driverId: string) {
    const driver = MOCK_DRIVERS.find(d => d.id === driverId) || MOCK_DRIVERS[0];
    return this.simulateDelay({
      driverId: driver.id,
      name: driver.name,
      vehicle: driver.vehicleModel,
      registration: driver.vehicleRegistration,
      latitude: driver.latitude,
      longitude: driver.longitude,
      speedKmph: 28,
      heading: 'East',
      etaMinutes: driver.currentEtaMinutes,
    }, 180);
  }

  // 8. Check payment status
  async getPaymentStatus(tripId: string) {
    return this.simulateDelay({
      tripId,
      status: 'Paid',
      method: 'UPI',
      amount: 156,
      paidAt: '23 Sep 2026, 10:36 AM',
      transactionRef: 'TXN-UPI-' + Math.floor(100000 + Math.random() * 900000),
    }, 200);
  }

  // 9. Create customer support ticket
  async createSupportTicket(ticketData: {
    issueType: SupportTicket['issueType'];
    tripId?: string;
    description: string;
  }): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
      issueType: ticketData.issueType,
      tripId: ticketData.tripId,
      description: ticketData.description,
      status: 'Open',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      responses: [
        {
          sender: 'customer',
          message: ticketData.description,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          sender: 'support',
          message: `Your ticket has been received. Our mobility desk at ABC Travels has been alerted and will investigate promptly.`,
          time: 'Just now',
        },
      ],
    };
    return this.simulateDelay(newTicket, 350);
  }
}

export const mockApiService = new CustomerApiService();
