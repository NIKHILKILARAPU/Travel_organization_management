import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { 
  ORGANIZATIONS_LIST, 
  INITIAL_VEHICLES, 
  INITIAL_DRIVERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_TRIPS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_MAINTENANCE, 
  INITIAL_DOCUMENT_EXPIRIES, 
  INITIAL_ACTIVITY_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../data/managementMockData';
import type { 
  OrganizationInfo, 
  UserRole, 
  ManagementTab, 
  DriverRecord, 
  VehicleRecord, 
  VehicleAssignmentRecord, 
  ManagementTripRecord, 
  CustomerRecord, 
  PaymentTransactionRecord, 
  MaintenanceRecord, 
  DocumentExpiryAlert, 
  ActivityLogItem, 
  ManagementNotification, 
  AIToolCallPayload 
} from '../types';
import { ManagementApiService } from '../services/managementApiService';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  toolCall?: AIToolCallPayload;
  dataSummary?: any;
  needsConfirmation?: boolean;
}

interface ManagementContextType {
  // Navigation & Tabs
  activeTab: ManagementTab;
  setActiveTab: (tab: ManagementTab) => void;
  
  // Organization & User
  currentOrg: OrganizationInfo;
  setCurrentOrg: (org: OrganizationInfo) => void;
  organizations: OrganizationInfo[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  managerName: string;
  onLogout?: () => void;

  // Data Collections
  vehicles: VehicleRecord[];
  drivers: DriverRecord[];
  assignments: VehicleAssignmentRecord[];
  trips: ManagementTripRecord[];
  customers: CustomerRecord[];
  payments: PaymentTransactionRecord[];
  maintenance: MaintenanceRecord[];
  documentExpiries: DocumentExpiryAlert[];
  activityLogs: ActivityLogItem[];
  notifications: ManagementNotification[];
  unreadNotificationsCount: number;

  // Actions
  addDriver: (driver: Omit<DriverRecord, 'id' | 'driverId' | 'totalTrips' | 'tripsToday' | 'earningsToday' | 'totalEarnings' | 'totalDistanceKm' | 'lastActive'>) => void;
  updateDriver: (id: string, updated: Partial<DriverRecord>) => void;
  toggleDriverStatus: (id: string, status: DriverRecord['status']) => void;
  
  addVehicle: (vehicle: Omit<VehicleRecord, 'id' | 'vehicleId' | 'utilizationPercent' | 'hoursAvailable' | 'activeHours' | 'tripHours' | 'idleHours' | 'maintenanceHours' | 'documents'>) => void;
  updateVehicle: (id: string, updated: Partial<VehicleRecord>) => void;
  
  assignVehicle: (driverId: string, vehicleId: string, notes?: string) => { success: boolean; message: string };
  unassignVehicle: (assignmentId: string) => void;
  
  scheduleMaintenance: (record: Omit<MaintenanceRecord, 'id' | 'ticketId' | 'status'>) => void;
  updateMaintenanceStatus: (id: string, status: MaintenanceRecord['status']) => void;

  cancelTrip: (tripId: string, reason: string) => void;
  toggleBlockCustomer: (customerId: string) => void;
  markNotificationRead: (id: string) => void;

  // Selection & Modals
  selectedDriver: DriverRecord | null;
  setSelectedDriver: (driver: DriverRecord | null) => void;
  selectedVehicle: VehicleRecord | null;
  setSelectedVehicle: (vehicle: VehicleRecord | null) => void;
  selectedTrip: ManagementTripRecord | null;
  setSelectedTrip: (trip: ManagementTripRecord | null) => void;
  selectedCustomer: CustomerRecord | null;
  setSelectedCustomer: (customer: CustomerRecord | null) => void;

  isAddDriverOpen: boolean;
  setIsAddDriverOpen: (open: boolean) => void;
  isAddVehicleOpen: boolean;
  setIsAddVehicleOpen: (open: boolean) => void;
  isAssignModalOpen: boolean;
  setIsAssignModalOpen: (open: boolean) => void;
  isScheduleMaintenanceOpen: boolean;
  setIsScheduleMaintenanceOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAIFloatingOpen: boolean;
  setIsAIFloatingOpen: (open: boolean) => void;

  // AI Assistant Chat & Tool Execution
  aiMessages: AIMessage[];
  isAILoading: boolean;
  pendingMutation: {
    toolPayload: AIToolCallPayload;
    execute: () => void;
  } | null;
  setPendingMutation: (mutation: { toolPayload: AIToolCallPayload; execute: () => void } | null) => void;
  sendAIMessage: (prompt: string) => Promise<void>;
  confirmAIMutation: () => void;
  cancelAIMutation: () => void;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ 
  children: ReactNode;
  onLogout?: () => void;
}> = ({ children, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ManagementTab>('dashboard');
  const [currentOrg, setCurrentOrg] = useState<OrganizationInfo>(ORGANIZATIONS_LIST[0]);
  const [userRole, setUserRole] = useState<UserRole>('ORGANIZATION_ADMIN');
  const managerName = 'Vikram Sharma';

  // Data state
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_VEHICLES);
  const [drivers, setDrivers] = useState<DriverRecord[]>(INITIAL_DRIVERS);
  const [assignments, setAssignments] = useState<VehicleAssignmentRecord[]>(INITIAL_ASSIGNMENTS);
  const [trips, setTrips] = useState<ManagementTripRecord[]>(INITIAL_TRIPS);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [payments] = useState<PaymentTransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE);
  const [documentExpiries] = useState<DocumentExpiryAlert[]>(INITIAL_DOCUMENT_EXPIRIES);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);
  const [notifications, setNotifications] = useState<ManagementNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals & Selections
  const [selectedDriver, setSelectedDriver] = useState<DriverRecord | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<ManagementTripRecord | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isScheduleMaintenanceOpen, setIsScheduleMaintenanceOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIFloatingOpen, setIsAIFloatingOpen] = useState(false);

  // AI Assistant state
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Good day, Vikram. I am your Organization Manager AI. You can ask me operational statistics, driver statuses, vehicle availability, expiring documents, or request guarded fleet assignments.',
      timestamp: 'Just now'
    }
  ]);
  const [isAILoading, setIsAILoading] = useState(false);
  const [pendingMutation, setPendingMutation] = useState<{
    toolPayload: AIToolCallPayload;
    execute: () => void;
  } | null>(null);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const logActivity = (action: string, entity: string, entityId: string, description: string) => {
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      user: managerName,
      role: userRole,
      action,
      entity,
      entityId,
      description
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Driver actions
  const addDriver = (newD: Omit<DriverRecord, 'id' | 'driverId' | 'totalTrips' | 'tripsToday' | 'earningsToday' | 'totalEarnings' | 'totalDistanceKm' | 'lastActive'>) => {
    const count = drivers.length + 1;
    const formattedId = `DRV-${String(count).padStart(3, '0')}`;
    const fullRecord: DriverRecord = {
      ...newD,
      id: `drv-${Date.now()}`,
      driverId: formattedId,
      totalTrips: 0,
      tripsToday: 0,
      earningsToday: 0,
      totalEarnings: 0,
      totalDistanceKm: 0,
      lastActive: 'Just registered',
    };
    setDrivers(prev => [fullRecord, ...prev]);
    logActivity('Driver Added', 'Driver', formattedId, `Registered new driver ${newD.name} (${newD.phone})`);
  };

  const updateDriver = (id: string, updated: Partial<DriverRecord>) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, ...updated } : d));
    logActivity('Driver Updated', 'Driver', id, `Updated profile records for driver`);
  };

  const toggleDriverStatus = (id: string, status: DriverRecord['status']) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    logActivity('Driver Status Changed', 'Driver', id, `Changed driver status to ${status}`);
  };

  // Vehicle actions
  const addVehicle = (newV: Omit<VehicleRecord, 'id' | 'vehicleId' | 'utilizationPercent' | 'hoursAvailable' | 'activeHours' | 'tripHours' | 'idleHours' | 'maintenanceHours' | 'documents'>) => {
    const count = vehicles.length + 1;
    const formattedId = `VH-${String(count).padStart(3, '0')}`;
    const fullRecord: VehicleRecord = {
      ...newV,
      id: `vh-${Date.now()}`,
      vehicleId: formattedId,
      utilizationPercent: 0,
      hoursAvailable: 12,
      activeHours: 0,
      tripHours: 0,
      idleHours: 12,
      maintenanceHours: 0,
      documents: { rc: true, insurance: true, fitnessCertificate: true, pollutionCertificate: true }
    };
    setVehicles(prev => [fullRecord, ...prev]);
    logActivity('Vehicle Added', 'Vehicle', fullRecord.registrationNumber, `Added ${newV.brand} ${newV.model} (${newV.registrationNumber}) to fleet`);
  };

  const updateVehicle = (id: string, updated: Partial<VehicleRecord>) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updated } : v));
    logActivity('Vehicle Updated', 'Vehicle', id, `Updated vehicle details`);
  };

  // Assignment actions
  const assignVehicle = (driverId: string, vehicleId: string, notes?: string): { success: boolean; message: string } => {
    const driver = drivers.find(d => d.id === driverId);
    const vehicle = vehicles.find(v => v.id === vehicleId);

    if (!driver || !vehicle) {
      return { success: false, message: 'Invalid driver or vehicle selected.' };
    }

    if (driver.status === 'Inactive') {
      return { success: false, message: 'Cannot assign vehicle to an inactive driver.' };
    }

    if (vehicle.status === 'MAINTENANCE' || vehicle.status === 'INACTIVE') {
      return { success: false, message: `Vehicle is currently in ${vehicle.status} status.` };
    }

    // Check if vehicle already assigned to another active driver
    const existingVehicleAssignment = assignments.find(a => a.vehicleId === vehicleId && a.status === 'Active' && a.driverId !== driverId);
    if (existingVehicleAssignment) {
      return { success: false, message: `Vehicle ${vehicle.registrationNumber} is already actively assigned to ${existingVehicleAssignment.driverName}.` };
    }

    // End any existing assignment for this driver
    setAssignments(prev => prev.map(a => 
      a.driverId === driverId && a.status === 'Active' 
        ? { ...a, status: 'Ended', unassignedDate: '2026-09-23' } 
        : a
    ));

    // Create new assignment
    const newAssignment: VehicleAssignmentRecord = {
      id: `asg-${Date.now()}`,
      driverId,
      driverName: driver.name,
      driverPhone: driver.phone,
      vehicleId,
      vehicleRegistration: vehicle.registrationNumber,
      vehicleType: vehicle.type,
      assignmentDate: '2026-09-23',
      status: 'Active',
      assignedBy: `${managerName} (${userRole})`,
      notes: notes || 'Assigned via Fleet Console'
    };

    setAssignments(prev => [newAssignment, ...prev]);

    // Update driver & vehicle links
    setDrivers(prev => prev.map(d => d.id === driverId ? { 
      ...d, 
      assignedVehicleId: vehicleId, 
      assignedVehicleReg: vehicle.registrationNumber,
      assignedVehicleType: vehicle.type 
    } : d));

    setVehicles(prev => prev.map(v => v.id === vehicleId ? { 
      ...v, 
      assignedDriverId: driverId, 
      assignedDriverName: driver.name,
      status: v.status === 'OFFLINE' ? 'AVAILABLE' : v.status
    } : v));

    logActivity('Vehicle Assigned', 'Vehicle Assignment', vehicle.registrationNumber, `Assigned ${vehicle.registrationNumber} to ${driver.name}`);
    return { success: true, message: `Assigned ${vehicle.registrationNumber} to ${driver.name} successfully.` };
  };

  const unassignVehicle = (assignmentId: string) => {
    const asg = assignments.find(a => a.id === assignmentId);
    if (!asg) return;

    setAssignments(prev => prev.map(a => a.id === assignmentId ? { ...a, status: 'Ended', unassignedDate: '2026-09-23' } : a));
    
    // Clear vehicle from driver
    setDrivers(prev => prev.map(d => d.id === asg.driverId ? { 
      ...d, 
      assignedVehicleId: undefined, 
      assignedVehicleReg: undefined,
      assignedVehicleType: undefined 
    } : d));

    // Clear driver from vehicle
    setVehicles(prev => prev.map(v => v.id === asg.vehicleId ? { 
      ...v, 
      assignedDriverId: undefined, 
      assignedDriverName: undefined,
      status: 'AVAILABLE'
    } : v));

    logActivity('Vehicle Unassigned', 'Vehicle Assignment', asg.vehicleRegistration, `Unassigned ${asg.vehicleRegistration} from ${asg.driverName}`);
  };

  // Maintenance actions
  const scheduleMaintenance = (newM: Omit<MaintenanceRecord, 'id' | 'ticketId' | 'status'>) => {
    const ticketId = `MNT-${Math.floor(100 + Math.random() * 900)}`;
    const fullRecord: MaintenanceRecord = {
      ...newM,
      id: `mnt-${Date.now()}`,
      ticketId,
      status: 'REPORTED',
      reportedDate: '2026-09-23'
    };
    setMaintenance(prev => [fullRecord, ...prev]);

    // Set vehicle status to MAINTENANCE
    setVehicles(prev => prev.map(v => v.id === newM.vehicleId ? { ...v, status: 'MAINTENANCE' } : v));

    logActivity('Maintenance Created', 'Maintenance', ticketId, `Scheduled maintenance for ${newM.vehicleRegistration}: ${newM.issue}`);
  };

  const updateMaintenanceStatus = (id: string, status: MaintenanceRecord['status']) => {
    setMaintenance(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    if (status === 'COMPLETED') {
      const record = maintenance.find(m => m.id === id);
      if (record) {
        setVehicles(prev => prev.map(v => v.id === record.vehicleId ? { ...v, status: 'AVAILABLE' } : v));
      }
    }
    logActivity('Maintenance Updated', 'Maintenance', id, `Status changed to ${status}`);
  };

  // Trip actions
  const cancelTrip = (tripId: string, reason: string) => {
    setTrips(prev => prev.map(t => t.tripId === tripId ? { ...t, status: 'CANCELLED', cancellationReason: reason } : t));
    logActivity('Trip Cancelled', 'Trip', tripId, `Manager cancelled trip ${tripId}: ${reason}`);
  };

  // Customer actions
  const toggleBlockCustomer = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const nextStatus = c.status === 'Blocked' ? 'Active' : 'Blocked';
        logActivity(nextStatus === 'Blocked' ? 'Customer Blocked' : 'Customer Unblocked', 'Customer', c.customerId, `${nextStatus} customer ${c.name}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // AI Assistant natural-language processing with Tool Calling Architecture
  const sendAIMessage = async (prompt: string) => {
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: 'Just now'
    };
    setAiMessages(prev => [...prev, userMsg]);
    setIsAILoading(true);

    const q = prompt.toLowerCase();

    setTimeout(() => {
      // 1. Vehicles availability check
      if (q.includes('available') && q.includes('vehicle')) {
        const available = ManagementApiService.getAvailableVehicles(vehicles);
        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Currently, **${available.length} vehicles** are in AVAILABLE status and ready for dispatch.`,
          timestamp: 'Just now',
          dataSummary: available,
          toolCall: {
            toolName: 'getAvailableVehicles',
            params: { status: 'AVAILABLE' },
            description: 'Retrieved live available vehicles from fleet registry.'
          }
        };
        setAiMessages(prev => [...prev, reply]);
      }
      // 2. Vehicles in maintenance
      else if (q.includes('maintenance')) {
        const inMaint = ManagementApiService.getMaintenanceRecords(maintenance);
        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `There are **${inMaint.length} vehicles** currently undergoing service or scheduled maintenance.`,
          timestamp: 'Just now',
          dataSummary: inMaint.map(m => ({
            ticket: m.ticketId,
            vehicle: m.vehicleRegistration,
            model: m.vehicleModel,
            issue: m.issue,
            status: m.status,
            cost: `₹${m.estimatedCost}`
          })),
          toolCall: {
            toolName: 'getMaintenanceRecords',
            params: { status: ['REPORTED', 'IN_PROGRESS'] },
            description: 'Fetched active maintenance tickets.'
          }
        };
        setAiMessages(prev => [...prev, reply]);
      }
      // 3. Driver status check
      else if (q.includes('driver') && (q.includes('status') || q.includes('online') || q.includes('how many'))) {
        const summary = ManagementApiService.getDriverStatusSummary(drivers);
        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Here is the current driver status breakdown:\n\n• **Online & Ready**: ${summary.online + summary.available}\n• **On Active Trip**: ${summary.onTrip}\n• **Offline**: ${summary.offline}\n• **On Break / Issue**: ${summary.break + summary.vehicleIssue}\n• **Total Registered**: ${summary.total}`,
          timestamp: 'Just now',
          toolCall: {
            toolName: 'getDriverStatus',
            params: {},
            description: 'Analyzed driver roster telematics and connectivity.'
          }
        };
        setAiMessages(prev => [...prev, reply]);
      }
      // 4. Revenue check
      else if (q.includes('revenue') || q.includes('earnings') || q.includes('sales')) {
        const rev = ManagementApiService.getRevenueReport();
        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Today's gross fleet revenue stands at **₹${rev.today.toLocaleString('en-IN')}** across 127 trips. This week's total is **₹${rev.thisWeek.toLocaleString('en-IN')}**.`,
          timestamp: 'Just now',
          toolCall: {
            toolName: 'getRevenueReport',
            params: { period: 'today' },
            description: 'Calculated live gross and net revenue metrics.'
          }
        };
        setAiMessages(prev => [...prev, reply]);
      }
      // 5. Expiring documents
      else if (q.includes('document') || q.includes('insurance') || q.includes('fitness') || q.includes('expire')) {
        const exp = ManagementApiService.getExpiringDocuments(documentExpiries);
        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Found **${exp.length} documents** requiring management attention:\n\n` + 
            exp.map(e => `• **${e.documentType}** for *${e.entityName}* expires on ${e.expiryDate} (${e.daysRemaining} days left)`).join('\n'),
          timestamp: 'Just now',
          toolCall: {
            toolName: 'getExpiringDocuments',
            params: { daysThreshold: 30 },
            description: 'Scanned RTO compliance registry for upcoming deadlines.'
          }
        };
        setAiMessages(prev => [...prev, reply]);
      }
      // 6. Sensitive Assignment Mutation request (Guardrails with Confirmation)
      else if (q.includes('assign') && (q.includes('rahul') || q.includes('suresh') || q.includes('vamsi'))) {
        const targetDriver = drivers.find(d => q.includes(d.name.toLowerCase().split(' ')[0])) || drivers[0];
        const targetVehicle = vehicles.find(v => v.status === 'AVAILABLE') || vehicles[0];

        const payload: AIToolCallPayload = {
          toolName: 'assignVehicle',
          params: { driverId: targetDriver.id, vehicleId: targetVehicle.id },
          description: `Assign vehicle ${targetVehicle.registrationNumber} (${targetVehicle.brand} ${targetVehicle.model}) to driver ${targetDriver.name}.`,
          isDestructive: true
        };

        setPendingMutation({
          toolPayload: payload,
          execute: () => {
            assignVehicle(targetDriver.id, targetVehicle.id, 'Assigned via AI Manager prompt');
          }
        });

        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `I have prepared the assignment request. Because vehicle reassignments affect dispatch scheduling, please review and confirm:`,
          timestamp: 'Just now',
          needsConfirmation: true,
          toolCall: payload
        };
        setAiMessages(prev => [...prev, reply]);
      }
      // General fallback query
      else {
        const stats = ManagementApiService.getOrganizationStats(vehicles, drivers, trips);
        const reply: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `I can help manage your fleet of **${stats.totalVehicles} vehicles** and **${stats.totalDrivers} drivers** for **${currentOrg.name}**.\n\nTry asking:\n• *"How many vehicles are available right now?"*\n• *"Show vehicles in maintenance"*\n• *"Which documents expire this month?"*\n• *"What is today's revenue?"*`,
          timestamp: 'Just now',
          toolCall: {
            toolName: 'getOrganizationStats',
            params: {},
            description: 'Read overall organization overview.'
          }
        };
        setAiMessages(prev => [...prev, reply]);
      }

      setIsAILoading(false);
    }, 600);
  };

  const confirmAIMutation = () => {
    if (pendingMutation) {
      pendingMutation.execute();
      const confirmMsg: AIMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `✅ **Action Confirmed and Executed**: ${pendingMutation.toolPayload.description}`,
        timestamp: 'Just now'
      };
      setAiMessages(prev => [...prev, confirmMsg]);
      setPendingMutation(null);
    }
  };

  const cancelAIMutation = () => {
    if (pendingMutation) {
      const cancelMsg: AIMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `❌ **Action Cancelled by Manager**: No changes were made to the vehicle assignment.`,
        timestamp: 'Just now'
      };
      setAiMessages(prev => [...prev, cancelMsg]);
      setPendingMutation(null);
    }
  };

  return (
    <ManagementContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentOrg,
        setCurrentOrg,
        organizations: ORGANIZATIONS_LIST,
        userRole,
        setUserRole,
        managerName,
        onLogout,

        vehicles,
        drivers,
        assignments,
        trips,
        customers,
        payments,
        maintenance,
        documentExpiries,
        activityLogs,
        notifications,
        unreadNotificationsCount,

        addDriver,
        updateDriver,
        toggleDriverStatus,
        addVehicle,
        updateVehicle,
        assignVehicle,
        unassignVehicle,
        scheduleMaintenance,
        updateMaintenanceStatus,
        cancelTrip,
        toggleBlockCustomer,
        markNotificationRead,

        selectedDriver,
        setSelectedDriver,
        selectedVehicle,
        setSelectedVehicle,
        selectedTrip,
        setSelectedTrip,
        selectedCustomer,
        setSelectedCustomer,

        isAddDriverOpen,
        setIsAddDriverOpen,
        isAddVehicleOpen,
        setIsAddVehicleOpen,
        isAssignModalOpen,
        setIsAssignModalOpen,
        isScheduleMaintenanceOpen,
        setIsScheduleMaintenanceOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAIFloatingOpen,
        setIsAIFloatingOpen,

        aiMessages,
        isAILoading,
        pendingMutation,
        setPendingMutation,
        sendAIMessage,
        confirmAIMutation,
        cancelAIMutation
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagement = () => {
  const context = useContext(ManagementContext);
  if (!context) {
    throw new Error('useManagement must be used within a ManagementProvider');
  }
  return context;
};
