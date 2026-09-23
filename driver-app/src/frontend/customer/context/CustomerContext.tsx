import React, { createContext, useContext, useState, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  MOCK_CUSTOMER_PROFILE, 
  INITIAL_CUSTOMER_TRIPS, 
  INITIAL_PAYMENT_METHODS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_NOTIFICATIONS, 
  SAVED_PLACES_DATA, 
  INITIAL_SUPPORT_TICKETS,
  VEHICLE_OPTIONS
} from '../data/customerMockData';
import type { 
  CustomerProfile, 
  CustomerTrip, 
  CustomerTripStatus, 
  CustomerPaymentMethod, 
  TransactionRecord, 
  CustomerNotification, 
  SavedPlace, 
  SupportTicket, 
  VehicleCategory, 
  PaymentMethodType,
  AIMessage
} from '../types';
import { mockApiService } from '../services/mockApiService';

export type CustomerActiveTab = 
  | 'home' 
  | 'book' 
  | 'live' 
  | 'trips' 
  | 'payments' 
  | 'notifications' 
  | 'profile' 
  | 'support'
  | 'saved-places';

interface CustomerContextType {
  activeTab: CustomerActiveTab;
  setActiveTab: (tab: CustomerActiveTab) => void;
  profile: CustomerProfile;
  updateProfile: (updated: Partial<CustomerProfile>) => void;
  
  // Status System
  customerStatus: CustomerTripStatus;
  setCustomerStatus: (status: CustomerTripStatus) => void;
  activeTrip: CustomerTrip | null;
  setActiveTrip: (trip: CustomerTrip | null) => void;

  // Trips data
  trips: CustomerTrip[];
  selectedTripForDetails: CustomerTrip | null;
  setSelectedTripForDetails: (trip: CustomerTrip | null) => void;
  rateTrip: (tripId: string, rating: number, feedback: string, tags: string[]) => void;
  bookAgain: (trip: CustomerTrip) => void;

  // Booking form state
  pickupLocation: string;
  setPickupLocation: (loc: string) => void;
  destinationLocation: string;
  setDestinationLocation: (loc: string) => void;
  bookingDate: string;
  setBookingDate: (date: string) => void;
  bookingTime: string;
  setBookingTime: (time: string) => void;
  selectedVehicle: VehicleCategory;
  setSelectedVehicle: (veh: VehicleCategory) => void;
  selectedPaymentMethod: PaymentMethodType;
  setSelectedPaymentMethod: (pm: PaymentMethodType) => void;
  
  // Booking actions
  startBookingFlow: (pickup?: string, dest?: string) => void;
  confirmBooking: () => Promise<void>;
  cancelCurrentTrip: (reason?: string) => void;
  
  // Trip simulation controls
  simulateDriverArrived: () => void;
  simulateStartTrip: () => void;
  simulateCompleteTrip: () => void;
  resetTripToIdle: () => void;

  // Saved places
  savedPlaces: SavedPlace[];
  addSavedPlace: (place: Omit<SavedPlace, 'id'>) => void;
  editSavedPlace: (id: string, place: Partial<SavedPlace>) => void;
  deleteSavedPlace: (id: string) => void;

  // Payments & transactions
  paymentMethods: CustomerPaymentMethod[];
  addPaymentMethod: (method: Omit<CustomerPaymentMethod, 'id' | 'isDefault'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  transactions: TransactionRecord[];

  // Notifications
  notifications: CustomerNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // Support
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: { issueType: SupportTicket['issueType']; tripId?: string; description: string }) => Promise<void>;
  selectedTicket: SupportTicket | null;
  setSelectedTicket: (ticket: SupportTicket | null) => void;

  // Global Modals
  isCallModalOpen: boolean;
  setIsCallModalOpen: (open: boolean) => void;
  isMessageModalOpen: boolean;
  setIsMessageModalOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isCancelModalOpen: boolean;
  setIsCancelModalOpen: (open: boolean) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  receiptTrip: CustomerTrip | null;
  setReceiptTrip: (trip: CustomerTrip | null) => void;
  isAIModalOpen: boolean;
  setIsAIModalOpen: (open: boolean) => void;
  isAddPlaceModalOpen: boolean;
  setIsAddPlaceModalOpen: (open: boolean) => void;
  isAddPaymentModalOpen: boolean;
  setIsAddPaymentModalOpen: (open: boolean) => void;
  isCreateTicketModalOpen: boolean;
  setIsCreateTicketModalOpen: (open: boolean) => void;

  // AI Assistant Chat Messages
  aiMessages: AIMessage[];
  sendAIMessage: (text: string) => Promise<void>;
  executeAIToolConfirmation: (messageId: string, confirmed: boolean) => Promise<void>;
  clearAIChat: () => void;

  // Session Logout
  onLogout?: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode; onLogout?: () => void }> = ({ children, onLogout }) => {
  const [activeTab, setActiveTab] = useState<CustomerActiveTab>('home');
  const [profile, setProfile] = useState<CustomerProfile>(MOCK_CUSTOMER_PROFILE);
  const [trips, setTrips] = useState<CustomerTrip[]>(INITIAL_CUSTOMER_TRIPS);
  const [customerStatus, setCustomerStatus] = useState<CustomerTripStatus>('IDLE');
  const [activeTrip, setActiveTrip] = useState<CustomerTrip | null>(null);

  // Booking fields
  const [pickupLocation, setPickupLocation] = useState('SRKR Engineering College, Bhimavaram');
  const [destinationLocation, setDestinationLocation] = useState('Bhimavaram Town Railway Station');
  const [bookingDate, setBookingDate] = useState('Today');
  const [bookingTime, setBookingTime] = useState('Now');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('auto');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('UPI');

  // Modals & views
  const [selectedTripForDetails, setSelectedTripForDetails] = useState<CustomerTrip | null>(null);
  const [receiptTrip, setReceiptTrip] = useState<CustomerTrip | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

  // Saved Places & Payments & Notifications & Tickets
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(SAVED_PLACES_DATA);
  const [paymentMethods, setPaymentMethods] = useState<CustomerPaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<CustomerNotification[]>(INITIAL_NOTIFICATIONS);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);

  // AI Assistant Messages
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'ai-welcome',
      sender: 'assistant',
      content: `Hello ${profile.name}! I am your Travel Assistant for ABC Travels. How can I help you today?\n\nYou can ask me to book a ride, track your driver, explain fare estimates, or manage previous trips!`,
      timestamp: 'Just now',
    }
  ]);

  // Profile update
  const updateProfile = (updated: Partial<CustomerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Start booking flow from anywhere
  const startBookingFlow = (pickup?: string, dest?: string) => {
    if (pickup) setPickupLocation(pickup);
    if (dest) setDestinationLocation(dest);
    setActiveTab('book');
  };

  // Confirm booking
  const confirmBooking = async () => {
    setCustomerStatus('SEARCHING_DRIVER');
    setActiveTab('live');

    // Create booking via mock API
    const vehOpt = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];
    const estimatedFare = Math.round(vehOpt.baseFare + 6.2 * vehOpt.perKmRate);

    const newTrip = await mockApiService.createBooking({
      pickupLocation,
      destinationLocation,
      vehicleCategory: selectedVehicle,
      paymentMethod: selectedPaymentMethod,
      fare: estimatedFare,
      distanceKm: 6.2,
      durationMins: 15,
    });

    setActiveTrip(newTrip);

    // Simulate search driver timeout -> DRIVER_ASSIGNED -> DRIVER_ARRIVING
    setTimeout(() => {
      setCustomerStatus('DRIVER_ASSIGNED');
      
      // Add notification
      const newNotif: CustomerNotification = {
        id: 'notif-' + Date.now(),
        category: 'Driver',
        title: 'Driver Assigned!',
        message: `${newTrip.driver.name} (${newTrip.driver.vehicleRegistration}) is on the way in a ${newTrip.driver.vehicleModel}.`,
        timestamp: 'Just now',
        read: false,
        tripId: newTrip.tripId,
      };
      setNotifications(prev => [newNotif, ...prev]);

      setTimeout(() => {
        setCustomerStatus('DRIVER_ARRIVING');
      }, 2500);
    }, 3200);
  };

  // Simulate status progression
  const simulateDriverArrived = () => {
    setCustomerStatus('DRIVER_ARRIVED');
    const newNotif: CustomerNotification = {
      id: 'notif-' + Date.now(),
      category: 'Driver',
      title: 'Driver has arrived',
      message: `${activeTrip?.driver.name || 'Your driver'} is waiting at the pickup spot. Share OTP ${activeTrip?.otp || '4821'}.`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const simulateStartTrip = () => {
    setCustomerStatus('TRIP_IN_PROGRESS');
  };

  const simulateCompleteTrip = () => {
    setCustomerStatus('TRIP_COMPLETED');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    if (activeTrip) {
      const completedTrip: CustomerTrip = {
        ...activeTrip,
        status: 'Completed',
        customerStatus: 'TRIP_COMPLETED',
        timeline: {
          ...activeTrip.timeline,
          tripCompletedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
      setActiveTrip(completedTrip);
      setTrips(prev => [completedTrip, ...prev.filter(t => t.id !== completedTrip.id)]);

      // Add transaction record
      const newTxn: TransactionRecord = {
        id: 'TXN-' + Math.floor(1000 + Math.random() * 9000),
        tripId: completedTrip.tripId,
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        amount: completedTrip.fare,
        method: completedTrip.paymentMethod,
        status: 'Paid',
        description: `Ride fare for Trip ${completedTrip.tripId}`,
      };
      setTransactions(prev => [newTxn, ...prev]);
    }
  };

  const cancelCurrentTrip = (reason?: string) => {
    if (activeTrip) {
      const cancelledTrip: CustomerTrip = {
        ...activeTrip,
        status: 'Cancelled',
        customerStatus: 'CANCELLED',
        cancellationReason: reason || 'Cancelled by customer',
        cancelledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTrips(prev => [cancelledTrip, ...prev.filter(t => t.id !== cancelledTrip.id)]);
      setActiveTrip(cancelledTrip);
    }
    setCustomerStatus('CANCELLED');
    setIsCancelModalOpen(false);
  };

  const resetTripToIdle = () => {
    setCustomerStatus('IDLE');
    setActiveTrip(null);
    setActiveTab('home');
  };

  const rateTrip = (tripId: string, rating: number, feedback: string, tags: string[]) => {
    setTrips(prev => prev.map(t => {
      if (t.tripId === tripId || t.id === tripId) {
        return { ...t, rating, feedback, feedbackTags: tags };
      }
      return t;
    }));
    if (activeTrip && (activeTrip.tripId === tripId || activeTrip.id === tripId)) {
      setActiveTrip(prev => prev ? { ...prev, rating, feedback, feedbackTags: tags } : null);
    }
  };

  const bookAgain = (trip: CustomerTrip) => {
    setPickupLocation(trip.pickupLocation);
    setDestinationLocation(trip.destinationLocation);
    setSelectedVehicle(trip.vehicleType);
    setSelectedPaymentMethod(trip.paymentMethod);
    setActiveTab('book');
  };

  // Saved places
  const addSavedPlace = (place: Omit<SavedPlace, 'id'>) => {
    const newPlace: SavedPlace = {
      ...place,
      id: 'pl-' + Date.now(),
    };
    setSavedPlaces(prev => [...prev, newPlace]);
  };

  const editSavedPlace = (id: string, place: Partial<SavedPlace>) => {
    setSavedPlaces(prev => prev.map(p => p.id === id ? { ...p, ...place } : p));
  };

  const deleteSavedPlace = (id: string) => {
    setSavedPlaces(prev => prev.filter(p => p.id !== id));
  };

  // Payment methods
  const addPaymentMethod = (method: Omit<CustomerPaymentMethod, 'id' | 'isDefault'>) => {
    const newMethod: CustomerPaymentMethod = {
      ...method,
      id: 'pm-' + Date.now(),
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods(prev => [...prev, newMethod]);
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(p => ({
      ...p,
      isDefault: p.id === id,
    })));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Support
  const createSupportTicket = async (ticketData: {
    issueType: SupportTicket['issueType'];
    tripId?: string;
    description: string;
  }) => {
    const newTicket = await mockApiService.createSupportTicket(ticketData);
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  // AI Assistant tool execution & chat engine
  const sendAIMessage = async (text: string) => {
    const userMsg: AIMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages(prev => [...prev, userMsg]);

    const lower = text.toLowerCase();
    
    // Simulate AI tool routing & thinking
    setTimeout(async () => {
      let replyContent = '';
      let toolCall: AIMessage['toolCall'] | undefined = undefined;

      if (lower.includes('cancel') && (lower.includes('ride') || lower.includes('booking') || lower.includes('trip'))) {
        if (customerStatus !== 'IDLE' && customerStatus !== 'TRIP_COMPLETED' && customerStatus !== 'CANCELLED') {
          replyContent = `I can help cancel your active booking (${activeTrip?.tripId || 'TRP-10248'}). Under our policy, cancellation is free within 2 minutes. Would you like me to proceed?`;
          toolCall = {
            toolName: 'cancelBooking',
            params: { tripId: activeTrip?.tripId || 'TRP-10248', reason: 'Customer requested via AI Assistant' },
            status: 'pending_confirmation',
            requiresConfirmation: true,
            confirmationPrompt: `Cancel Trip ${activeTrip?.tripId || 'TRP-10248'} now?`,
          };
        } else {
          replyContent = "You do not currently have an active ongoing trip to cancel. You can view your completed or upcoming trips in the Trips tab.";
        }
      } else if (lower.includes('where is my driver') || lower.includes('track') || lower.includes('driver location')) {
        const telematics = await mockApiService.getDriverLocation(activeTrip?.driver.id || 'DRV-102');
        replyContent = `Driver ${telematics.name} (${telematics.registration}) is currently in a ${telematics.vehicle}, approx ${telematics.etaMinutes} minutes away heading at ${telematics.speedKmph} km/h.`;
      } else if (lower.includes('book') || lower.includes('auto') || lower.includes('cab') || lower.includes('railway station')) {
        replyContent = `I can initiate a booking for an Auto to the Bhimavaram Railway Station. The estimated fare is ₹120–₹150 (approx 4 min away). Would you like to confirm this booking?`;
        toolCall = {
          toolName: 'createBooking',
          params: {
            pickupLocation: 'SRKR Engineering College, Bhimavaram',
            destinationLocation: 'Bhimavaram Town Railway Station',
            vehicleCategory: 'auto',
            paymentMethod: 'UPI',
            fare: 135,
          },
          status: 'pending_confirmation',
          requiresConfirmation: true,
          confirmationPrompt: 'Confirm Auto booking to Railway Station (₹135)?',
        };
      } else if (lower.includes('last trip') || lower.includes('history') || lower.includes('trips from this week') || lower.includes('how much')) {
        const lastTrip = trips[0];
        replyContent = `Your last trip was ${lastTrip.tripId} on ${lastTrip.date} from ${lastTrip.pickupLocation} to ${lastTrip.destinationLocation}. Total fare was ₹${lastTrip.fare} paid via ${lastTrip.paymentMethod}.`;
      } else if (lower.includes('why was i charged') || lower.includes('fare') || lower.includes('charge')) {
        replyContent = `Fares on ABC Travels are computed transparently based on: Base fare + ₹14–₹18/km distance rate + 5% GST mobility cess. Night surcharge (10%) applies only between 11 PM and 5 AM.`;
      } else if (lower.includes('report') || lower.includes('problem') || lower.includes('lost')) {
        replyContent = `I'm sorry to hear about that. I can generate a Priority Support Ticket for your last trip immediately.`;
        toolCall = {
          toolName: 'createSupportTicket',
          params: {
            issueType: 'Lost item',
            tripId: trips[0]?.tripId || 'TRP-10248',
            description: 'Item reported through AI Assistant',
          },
          status: 'pending_confirmation',
          requiresConfirmation: true,
          confirmationPrompt: `Create a priority support ticket for Trip ${trips[0]?.tripId || 'TRP-10248'}?`,
        };
      } else {
        replyContent = `I can help you check booking status, calculate fare estimates, track drivers in real-time, explain invoices, or submit support tickets. What would you like to do?`;
      }

      const aiReply: AIMessage = {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall,
      };

      setAiMessages(prev => [...prev, aiReply]);
    }, 650);
  };

  const executeAIToolConfirmation = async (messageId: string, confirmed: boolean) => {
    setAiMessages(prev => prev.map(m => {
      if (m.id === messageId && m.toolCall) {
        return {
          ...m,
          toolCall: {
            ...m.toolCall,
            status: confirmed ? 'executed' : 'cancelled',
          }
        };
      }
      return m;
    }));

    if (!confirmed) {
      setAiMessages(prev => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          content: 'Action cancelled. Let me know if you need help with anything else.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    const targetMsg = aiMessages.find(m => m.id === messageId);
    if (!targetMsg || !targetMsg.toolCall) return;

    const { toolName, params } = targetMsg.toolCall;

    if (toolName === 'cancelBooking') {
      cancelCurrentTrip(params.reason);
      setAiMessages(prev => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          content: `✅ Done! Trip ${params.tripId} has been cancelled without charges.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } else if (toolName === 'createBooking') {
      setPickupLocation(params.pickupLocation);
      setDestinationLocation(params.destinationLocation);
      setSelectedVehicle(params.vehicleCategory);
      setSelectedPaymentMethod(params.paymentMethod);
      await confirmBooking();
      setAiMessages(prev => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          content: `✅ Your booking is confirmed! Searching and assigning the nearest driver now. Switch to Live Trip to watch progress.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } else if (toolName === 'createSupportTicket') {
      await createSupportTicket({
        issueType: params.issueType,
        tripId: params.tripId,
        description: params.description,
      });
      setAiMessages(prev => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          content: `✅ Priority Support Ticket created for Trip ${params.tripId}. Our Bhimavaram support supervisor has been alerted.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  };

  const clearAIChat = () => {
    setAiMessages([
      {
        id: 'ai-welcome-' + Date.now(),
        sender: 'assistant',
        content: `Chat history cleared. How can I help you today, ${profile.name}?`,
        timestamp: 'Just now',
      }
    ]);
  };

  return (
    <CustomerContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profile,
        updateProfile,
        customerStatus,
        setCustomerStatus,
        activeTrip,
        setActiveTrip,
        trips,
        selectedTripForDetails,
        setSelectedTripForDetails,
        rateTrip,
        bookAgain,
        pickupLocation,
        setPickupLocation,
        destinationLocation,
        setDestinationLocation,
        bookingDate,
        setBookingDate,
        bookingTime,
        setBookingTime,
        selectedVehicle,
        setSelectedVehicle,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        startBookingFlow,
        confirmBooking,
        cancelCurrentTrip,
        simulateDriverArrived,
        simulateStartTrip,
        simulateCompleteTrip,
        resetTripToIdle,
        savedPlaces,
        addSavedPlace,
        editSavedPlace,
        deleteSavedPlace,
        paymentMethods,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        transactions,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        supportTickets,
        createSupportTicket,
        selectedTicket,
        setSelectedTicket,
        isCallModalOpen,
        setIsCallModalOpen,
        isMessageModalOpen,
        setIsMessageModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isCancelModalOpen,
        setIsCancelModalOpen,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        receiptTrip,
        setReceiptTrip,
        isAIModalOpen,
        setIsAIModalOpen,
        isAddPlaceModalOpen,
        setIsAddPlaceModalOpen,
        isAddPaymentModalOpen,
        setIsAddPaymentModalOpen,
        isCreateTicketModalOpen,
        setIsCreateTicketModalOpen,
        aiMessages,
        sendAIMessage,
        executeAIToolConfirmation,
        clearAIChat,
        onLogout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
