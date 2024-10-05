"use client";

import { useAuthContext } from "@/contexts/auth";

const Logout = () => {
  const { logout } = useAuthContext();

  const onLogout = async () => {
    await logout();
  };

  return (
    <button onClick={onLogout}>
      Logout
    </button>
  );
};

export default Logout;