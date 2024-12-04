"use client";

import { useState } from "react";
import { useAuthContext } from "@/contexts/auth";

const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();

  const onLogin = () => {
    login({ password });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  return (
    <div className="w-64 flex gap-2">
      <input
        className="p-2 outline-none border-2 border-black rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        onKeyDown={onKeyDown}
      />
      <button
        className="p-2 rounded border-2 border-black"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;