import { useState } from 'react';
import { CustomerApp } from './frontend/customer/CustomerApp';
import { DriverApp } from './frontend/driver/DriverApp';
import { ManagementApp } from './frontend/management/ManagementApp';
import { LoginPage, type UserRole } from './frontend/auth/LoginPage';
import { ThemeProvider } from './context/ThemeContext';

interface AuthenticatedUser {
  role: UserRole;
  name?: string;
  phone?: string;
  identifier?: string;
}

function MainAppContent() {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

  // If not logged in, show the comprehensive Login Page
  if (!currentUser) {
    return (
      <LoginPage
        onLoginSuccess={(role, details) => {
          setCurrentUser({
            role,
            ...details,
          });
        }}
      />
    );
  }

  // If logged in as driver, show Driver Interface
  if (currentUser.role === 'driver') {
    return (
      <DriverApp onLogout={() => setCurrentUser(null)} />
    );
  }

  // If logged in as organization management / admin, show Management Interface
  if (currentUser.role === 'management') {
    return (
      <ManagementApp onLogout={() => setCurrentUser(null)} />
    );
  }

  // If logged in as customer, show Customer Interface
  return (
    <CustomerApp onLogout={() => setCurrentUser(null)} />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
