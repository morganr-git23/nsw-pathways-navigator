
import React, { createContext, useContext, useState } from "react";
import { User, UserRole, AuthState } from "@/types/assessment";

// Sample admin users - in production, this would come from a secure backend
const ADMIN_USERS = [
  { id: "admin1", email: "admin@example.com", password: "admin123", role: UserRole.Admin, name: "Admin User" }
];

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to authenticate
    const adminUser = ADMIN_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (adminUser) {
      const { password, ...userWithoutPassword } = adminUser;
      setAuthState({
        user: userWithoutPassword as User,
        isAuthenticated: true,
        isAdmin: true,
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
