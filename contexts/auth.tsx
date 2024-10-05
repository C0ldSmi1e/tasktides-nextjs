"use client";

import { createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthProvider };

export default AuthProvider;