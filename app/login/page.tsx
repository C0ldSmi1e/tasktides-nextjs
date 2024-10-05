"use client";
import { useState } from "react";
import { useAuthContext } from "@/contexts/auth";

const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({ password });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form
      className="w-64 flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <input
        className="p-2 outline-none border-2 border-black rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
    </form>
  );
};

export default Login;