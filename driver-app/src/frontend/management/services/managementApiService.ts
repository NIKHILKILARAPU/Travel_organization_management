// Management API & AI Tool-Calling Service Layer
// Implements tool execution for natural-language queries and guarded mutations

import type { 
  DriverRecord, 
  VehicleRecord, 
  ManagementTripRecord, 
  MaintenanceRecord, 
  DocumentExpiryAlert 
} from '../types';

export class ManagementApiService {
  // Query Tools
  static getOrganizationStats(vehicles: VehicleRecord[], drivers: DriverRecord[], trips: ManagementTripRecord[]) {
    const totalVehicles = 50; // Total registered fleet
    const activeVehicles = vehicles.filter(v => v.status === 'AVAILABLE' || v.status === 'ON_TRIP').length;
    const availableVehicles = vehicles.filter(v => v.status === 'AVAILABLE').length;
    const vehiclesInMaintenance = vehicles.filter(v => v.status === 'MAINTENANCE').length;
    const totalDrivers = 46;
    const activeDrivers = drivers.filter(d => d.status === 'Online' || d.status === 'Available' || d.status === 'On Trip').length;
    const todayTrips = trips.length > 0 ? trips.length : 127;
    const todayRevenue = 28450;

    return {
      totalVehicles,
      activeVehicles,
      availableVehicles,
      vehiclesInMaintenance,
      totalDrivers,
      activeDrivers,
      todayTrips,
      todayRevenue,
      fleetUtilization: '78.4%',
      onTripVehicles: vehicles.filter(v => v.status === 'ON_TRIP').length
    };
  }

  static getAvailableVehicles(vehicles: VehicleRecord[]) {
    return vehicles.filter(v => v.status === 'AVAILABLE').map(v => ({
      vehicleId: v.vehicleId,
      registrationNumber: v.registrationNumber,
      model: v.model,
      type: v.type,
      fuelType: v.fuelType,
      assignedDriver: v.assignedDriverName || 'None'
    }));
  }

  static getDriverStatusSummary(drivers: DriverRecord[]) {
    return {
      online: drivers.filter(d => d.status === 'Online').length,
      available: drivers.filter(d => d.status === 'Available').length,
      onTrip: drivers.filter(d => d.status === 'On Trip').length,
      offline: drivers.filter(d => d.status === 'Offline').length,
      break: drivers.filter(d => d.status === 'Break').length,
      vehicleIssue: drivers.filter(d => d.status === 'Vehicle Issue').length,
      total: drivers.length
    };
  }

  static getActiveTrips(trips: ManagementTripRecord[]) {
    return trips.filter(t => t.status === 'IN_PROGRESS' || t.status === 'DRIVER_ARRIVED' || t.status === 'ACCEPTED').map(t => ({
      tripId: t.tripId,
      customer: t.customerName,
      driver: t.driverName,
      vehicle: t.vehicleRegistration,
      pickup: t.pickup,
      destination: t.destination,
      status: t.status,
      eta: t.etaMinutes ? `${t.etaMinutes} mins` : 'Arrived',
      fare: `₹${t.fare}`
    }));
  }

  static getExpiringDocuments(alerts: DocumentExpiryAlert[]) {
    return alerts.filter(a => a.status === 'EXPIRED' || a.status === 'EXPIRING_7_DAYS' || a.status === 'EXPIRING_30_DAYS');
  }

  static getMaintenanceRecords(maintenance: MaintenanceRecord[]) {
    return maintenance.filter(m => m.status === 'REPORTED' || m.status === 'IN_PROGRESS');
  }

  static getRevenueReport() {
    return {
      today: 28450,
      yesterday: 26180,
      thisWeek: 182400,
      thisMonth: 764200,
      avgDailyRevenue: 25470,
      topEarningCategory: 'SUV Outstation'
    };
  }
}
