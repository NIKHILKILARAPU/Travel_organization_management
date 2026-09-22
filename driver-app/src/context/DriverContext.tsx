import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  DriverStatus, 
  Trip, 
  Vehicle, 
  NotificationItem, 
  VehicleIssueReport 
} from '../types';
import { 
  INITIAL_DRIVER, 
  INITIAL_VEHICLE, 
  INITIAL_TRIPS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface DriverContextType {
  driver: typeof INITIAL_DRIVER;
  status: DriverStatus;
  setStatus: (status: DriverStatus) => void;
  toggleOnline: () => void;
  
  // Navigation
  activeTab: 'home' | 'trips' | 'earnings' | 'vehicle' | 'notifications' | 'profile';
  setActiveTab: (tab: 'home' | 'trips' | 'earnings' | 'vehicle' | 'notifications' | 'profile') => void;
  
  // Trips
  trips: Trip[];
  activeTrip: Trip | null;
  nextTrip: Trip | null;
  selectedTripForDetail: Trip | null;
  openTripDetails: (trip: Trip) => void;
  closeTripDetails: () => void;
  
  // Trip actions
  startEnRouteToPickup: (tripId: string) => void;
  markArrivedAtPickup: (tripId: string) => void;
  startTripRide: (tripId: string) => void;
  completeTripRide: (tripId: string) => void;
  acceptIncomingTrip: () => void;
  declineIncomingTrip: () => void;
  simulateIncomingTrip: () => void;
  
  // Vehicle
  vehicle: Vehicle;
  vehicleIssues: VehicleIssueReport[];
  reportVehicleIssue: (category: VehicleIssueReport['category'], description: string, photoUrl?: string) => void;
  
  // Earnings
  todayEarnings: number;
  thisWeekEarnings: number;
  thisMonthEarnings: number;
  todayCompletedCount: number;
  todayTotalCount: number;
  
  // Modals & Sheets
  showEmergencyModal: boolean;
  setShowEmergencyModal: (show: boolean) => void;
  callModal: { open: boolean; name: string; phone: string } | null;
  setCallModal: (val: { open: boolean; name: string; phone: string } | null) => void;
  messageModal: { open: boolean; name: string; tripId: string } | null;
  setMessageModal: (val: { open: boolean; name: string; tripId: string } | null) => void;
  showIncomingModal: boolean;
  showReportIssueModal: boolean;
  setShowReportIssueModal: (show: boolean) => void;
  showAiAssistant: boolean;
  setShowAiAssistant: (show: boolean) => void;
  
  // Notifications
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Audio chime
  playBeep: (type?: 'alert' | 'success' | 'tap') => void;
  
  // Frame toggle
  deviceFrame: boolean;
  setDeviceFrame: (val: boolean) => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

// Web Audio synthesizer for crisp in-cab chimes without external mp3s
const playAudioFeedback = (type: 'alert' | 'success' | 'tap' = 'tap') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch {
    // Ignore audio permission restrictions
  }
};

export const DriverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [driver] = useState(INITIAL_DRIVER);
  const [status, setStatus] = useState<DriverStatus>('ONLINE');
  const [activeTab, setActiveTab] = useState<'home' | 'trips' | 'earnings' | 'vehicle' | 'notifications' | 'profile'>('home');
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [selectedTripForDetail, setSelectedTripForDetail] = useState<Trip | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle>(INITIAL_VEHICLE);
  const [vehicleIssues, setVehicleIssues] = useState<VehicleIssueReport[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Financial figures
  const [todayEarnings, setTodayEarnings] = useState<number>(850);
  const [thisWeekEarnings, setThisWeekEarnings] = useState<number>(5420);
  const [thisMonthEarnings, setThisMonthEarnings] = useState<number>(21840);

  // Modals
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [callModal, setCallModal] = useState<{ open: boolean; name: string; phone: string } | null>(null);
  const [messageModal, setMessageModal] = useState<{ open: boolean; name: string; tripId: string } | null>(null);
  const [showIncomingModal, setShowIncomingModal] = useState<boolean>(false);
  const [showReportIssueModal, setShowReportIssueModal] = useState<boolean>(false);
  const [showAiAssistant, setShowAiAssistant] = useState<boolean>(false);
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);

  // Determine active trip: In Progress, En Route, Arrived
  const activeTrip = trips.find(t => 
    t.status === 'In Progress' || 
    t.status === 'En Route to Pickup' || 
    t.status === 'Arrived at Pickup'
  ) || null;

  // Next trip is assigned or upcoming
  const nextTrip = trips.find(t => t.status === 'Assigned') || null;

  // Sync driver status if active trip changes
  useEffect(() => {
    if (activeTrip) {
      if (status !== 'ON TRIP') {
        setStatus('ON TRIP');
      }
    } else if (status === 'ON TRIP') {
      setStatus('ONLINE');
    }
  }, [activeTrip, status]);

  const toggleOnline = () => {
    playAudioFeedback('tap');
    if (status === 'OFFLINE') {
      setStatus('ONLINE');
    } else {
      setStatus('OFFLINE');
    }
  };

  const openTripDetails = (trip: Trip) => {
    playAudioFeedback('tap');
    setSelectedTripForDetail(trip);
  };

  const closeTripDetails = () => {
    setSelectedTripForDetail(null);
  };

  // Trip progression actions
  const startEnRouteToPickup = (tripId: string) => {
    playAudioFeedback('tap');
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          status: 'En Route to Pickup',
          timeline: { ...t.timeline, driverAssigned: true }
        };
      }
      return t;
    }));
    setStatus('ON TRIP');
  };

  const markArrivedAtPickup = (tripId: string) => {
    playAudioFeedback('tap');
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          status: 'Arrived at Pickup',
          timeline: { ...t.timeline, driverArrived: true }
        };
      }
      return t;
    }));
  };

  const startTripRide = (tripId: string) => {
    playAudioFeedback('success');
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          status: 'In Progress',
          timeline: { ...t.timeline, driverArrived: true, tripStarted: true }
        };
      }
      return t;
    }));
    setStatus('ON TRIP');
  };

  const completeTripRide = (tripId: string) => {
    playAudioFeedback('success');
    // Celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    const tripObj = trips.find(t => t.id === tripId);
    const fare = tripObj ? tripObj.estimatedFare : 280;

    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          status: 'Completed',
          timeline: { 
            ...t.timeline, 
            driverArrived: true, 
            tripStarted: true, 
            tripCompleted: true 
          }
        };
      }
      return t;
    }));

    // Update earnings
    setTodayEarnings(prev => prev + fare);
    setThisWeekEarnings(prev => prev + fare);
    setThisMonthEarnings(prev => prev + fare);

    // Update vehicle km
    const dist = tripObj ? tripObj.distanceKm : 12.4;
    setVehicle(prev => ({
      ...prev,
      todayDistanceKm: Math.round((prev.todayDistanceKm + dist) * 10) / 10,
      totalDistanceKm: Math.round((prev.totalDistanceKm + dist) * 10) / 10,
      totalTrips: prev.totalTrips + 1,
      nextServiceKmRemaining: Math.max(0, Math.round(prev.nextServiceKmRemaining - dist)),
    }));

    // Add payment notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'payment',
      title: 'Payment collected',
      message: `₹${fare} payment recorded for Trip #${tripObj?.tripNumber || 'TR1023'}.`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Set status back to AVAILABLE / ONLINE
    setStatus('AVAILABLE');
  };

  const simulateIncomingTrip = () => {
    playAudioFeedback('alert');
    setShowIncomingModal(true);
  };

  const acceptIncomingTrip = () => {
    playAudioFeedback('success');
    setShowIncomingModal(false);
    setTrips(prev => prev.map(t => {
      if (t.tripNumber === 'TR1023') {
        return {
          ...t,
          status: 'En Route to Pickup',
          timeline: { ...t.timeline, driverAssigned: true }
        };
      }
      return t;
    }));
    setStatus('ON TRIP');
  };

  const declineIncomingTrip = () => {
    playAudioFeedback('tap');
    setShowIncomingModal(false);
  };

  const reportVehicleIssue = (
    category: VehicleIssueReport['category'], 
    description: string, 
    photoUrl?: string
  ) => {
    playAudioFeedback('tap');
    const newReport: VehicleIssueReport = {
      id: `rep-${Date.now()}`,
      category,
      description,
      photoUrl,
      reportedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending Review'
    };
    setVehicleIssues(prev => [newReport, ...prev]);
    setVehicle(prev => ({
      ...prev,
      status: 'Issue Reported'
    }));
    setStatus('VEHICLE ISSUE');
  };

  // Notifications
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    playAudioFeedback('tap');
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const todayCompletedCount = trips.filter(t => t.date === 'Today' && t.status === 'Completed').length;
  const todayTotalCount = trips.filter(t => t.date === 'Today').length;

  return (
    <DriverContext.Provider value={{
      driver,
      status,
      setStatus,
      toggleOnline,
      activeTab,
      setActiveTab,
      trips,
      activeTrip,
      nextTrip,
      selectedTripForDetail,
      openTripDetails,
      closeTripDetails,
      startEnRouteToPickup,
      markArrivedAtPickup,
      startTripRide,
      completeTripRide,
      acceptIncomingTrip,
      declineIncomingTrip,
      simulateIncomingTrip,
      vehicle,
      vehicleIssues,
      reportVehicleIssue,
      todayEarnings,
      thisWeekEarnings,
      thisMonthEarnings,
      todayCompletedCount,
      todayTotalCount,
      showEmergencyModal,
      setShowEmergencyModal,
      callModal,
      setCallModal,
      messageModal,
      setMessageModal,
      showIncomingModal,
      showReportIssueModal,
      setShowReportIssueModal,
      showAiAssistant,
      setShowAiAssistant,
      notifications,
      unreadNotifCount,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      playBeep: playAudioFeedback,
      deviceFrame,
      setDeviceFrame,
    }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error('useDriver must be used within a DriverProvider');
  }
  return context;
};
